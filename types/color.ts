import type { LanguageCode } from "./index";

export interface IColor {
  id: number;
  name: {
    [key in LanguageCode]: string;
  };
  code: string;
}
