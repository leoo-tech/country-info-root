// src/countries/countries.interface.ts

export interface PopulationEntry {
  year: number;
  value: number;
}

export interface CountryInfo {
  countryCode: string; // countryCode as id
  name: string;
  borders: string[];
  population: {
    current: number | null;
    historical: PopulationEntry[];
  };
  flag: string | null;
}
