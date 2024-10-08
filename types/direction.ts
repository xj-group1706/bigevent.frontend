import type { LanguageCode } from "./index";
import type { IMedia } from "./media";

export interface IDirection {
  id: number;
  name: {
    [key in LanguageCode]: string;
  };
  description: {
    [key in LanguageCode]: string;
  };
  banner: IMedia;
}
