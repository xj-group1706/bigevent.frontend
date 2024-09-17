import type { LanguageCode } from "./index";

export interface IDistrict {
  id: number;
  name: {
    [key in LanguageCode]: string;
  };
  key: string;
}
