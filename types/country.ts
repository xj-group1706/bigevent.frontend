import type { LanguageCode } from "./index";
import type { IMedia } from "./media";

export interface ICountry {
  languageCode: string;
  name: {
    [key in LanguageCode]: string;
  };
  flag: IMedia;
}
