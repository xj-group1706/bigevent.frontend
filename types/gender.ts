import type { LanguageCode } from "./index";

export interface IGender {
  id: number;
  name: {
    [key in LanguageCode]: string;
  };
}
