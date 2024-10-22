// src/countries/countries.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountryInfo } from './countries.interface';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get('available')
  async getAvailableCountries(): Promise<any> {
    return this.countriesService.getAvailableCountries();
  }

  @Get(':countryCode')
  async getCountryInfo(@Param('countryCode') countryCode: string): Promise<CountryInfo> {
    return this.countriesService.getCountryInfo(countryCode);
  }
}
