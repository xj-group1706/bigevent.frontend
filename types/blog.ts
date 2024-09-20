import type { LanguageCode } from "./index";
import type { IMedia } from "./media";

export interface IBlog {
  id: number;
  name: {
    [key in LanguageCode]: string;
  };
  description: {
    [key in LanguageCode]: string;
  };
  content: {
    [key in LanguageCode]: string;
  };
  media: IMedia;
  createdAt: string;
}
