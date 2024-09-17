import type { IDistrict } from "./district";
import type { LanguageCode } from "./index";

export interface IRegion {
  id: number;
  name: {
    [key in LanguageCode]: string;
  };
  key: string;
  districts: IDistrict[];
}
