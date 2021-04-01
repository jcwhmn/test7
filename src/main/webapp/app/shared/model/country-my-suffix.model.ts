import { IRegionMySuffix } from '@/shared/model/region-my-suffix.model';

export interface ICountryMySuffix {
  id?: number;
  countryName?: string | null;
  region?: IRegionMySuffix | null;
}

export class CountryMySuffix implements ICountryMySuffix {
  constructor(public id?: number, public countryName?: string | null, public region?: IRegionMySuffix | null) {}
}
