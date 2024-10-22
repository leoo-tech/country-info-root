import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CountryInfo, PopulationEntry } from './countries.interface';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class CountriesService {
  private readonly logger = new Logger(CountriesService.name);

  // mapping names to try when fetching data
  private readonly countryNameMapping = {
    'United States': 'United States of America',
    'Russian Federation': 'Russia',
    'Korea (Republic of)': 'South Korea',
    'Czech Republic': 'Czechia',
    'Macedonia': 'North Macedonia',
    // add more mappings here
  };

  // alternative names to try when fetching data
  private getAlternativeNames(countryName: string): string[] {
    const alternatives = [
      countryName,
      this.countryNameMapping[countryName] || countryName,
      countryName.replace(/\s*\([^)]*\)/g, ''), 
      countryName.split(',')[0], 
      countryName.split('(')[0].trim(),
    ];
    return [...new Set(alternatives)]; // Remove duplicates
  }

  constructor(private readonly httpService: HttpService) {}

  async getAvailableCountries(): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get('https://date.nager.at/api/v3/AvailableCountries'),
      );
      return response.data;
    } catch (error) {
      this.logger.error('Error fetching available countries:', error);
      throw new InternalServerErrorException(
        'fetching available countries failed',
      );
    }
  }

  private async tryGetPopulationData(countryName: string): Promise<any> {
    const alternativeNames = this.getAlternativeNames(countryName);

    for (const name of alternativeNames) {
      try {
        const response = await firstValueFrom(
          this.httpService.post(
            'https://countriesnow.space/api/v0.1/countries/population',
            {
              country: name,
            },
          ),
        );
        return response.data.data.populationCounts;
      } catch (error) {
        this.logger.warn(`Failed to get population data for name: ${name}`);
        continue; // try next name
      }
    }

    // if we reach here, no attempt was successful
    this.logger.warn(
      `Could not get population data for country: ${countryName}`,
    );
    return []; // return empty array
  }

  private async tryGetFlagUrl(countryName: string): Promise<string> {
    const alternativeNames = this.getAlternativeNames(countryName);

    for (const name of alternativeNames) {
      try {
        const response = await firstValueFrom(
          this.httpService.post(
            'https://countriesnow.space/api/v0.1/countries/flag/images',
            {
              country: name,
            },
          ),
        );
        return response.data.data.flag;
      } catch (error) {
        this.logger.warn(`Failed to get flag for name: ${name}`);
        continue; // try next name
      }
    }

    // if we reach here, no attempt was successful
    this.logger.warn(`Could not get flag for country: ${countryName}`);
    return '/default-flag.svg'; // return default flag
  }

  async getCountryInfo(countryCode: string): Promise<any> {
    try {
      // 1. first fetch country info
      const countryInfoResponse = await firstValueFrom(
        this.httpService
          .get(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`)
          .pipe(
            catchError((error: AxiosError) => {
              if (error.response?.status === 404) {
                throw new NotFoundException('Country not found');
              }
              throw new InternalServerErrorException(
                'fetching country info failed',
              );
            }),
          ),
      );

      const countryData = countryInfoResponse.data;

      // 2. second fetch population data and flag url
      const [populationData, flagUrl] = await Promise.all([
        this.tryGetPopulationData(countryData.commonName),
        this.tryGetFlagUrl(countryData.commonName),
      ]);

      // 3. third return combined data
      return {
        ...countryData,
        populationData: populationData,
        flagUrl: flagUrl,
      };
    } catch (error) {
      // if error is a known exception, rethrow it directly to the caller method
      if (
        error instanceof NotFoundException ||
        error instanceof InternalServerErrorException
      ) {
        throw error;
      }

      // otherwise log the error and throw a generic exception
      this.logger.error('Error in getCountryInfo:', error);
      throw new InternalServerErrorException(
        'Failed to get country information',
      );
    }
  }
}

// simplified version of getCountryInfo
// async getCountryInfo(countryCode: string): Promise<any> {
//   try {
//     const response = await firstValueFrom(
//       this.httpService.get(
//         `https://date.nager.at/api/v3/CountryInfo/${countryCode}`,
//       ),
//     );
//     return response.data; // Return raw data without modifications
//   } catch (error) {
//     // ... error handling ...
//     if (error instanceof AxiosError) {
//       const axiosError = error as AxiosError;
//       if (axiosError.response?.status === 404) {
//         throw new NotFoundException('Country not found');
//       }
//     }
//     this.logger.error('Error fetching country info:', error);
//     throw new InternalServerErrorException('fetching country info failed');
//   }
// }
