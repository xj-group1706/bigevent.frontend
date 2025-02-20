import type { IDirection } from "./direction";
import type { LanguageCode } from "./index";
import type { IGender } from "./gender";

export interface ISize {
  id: number;
  name: string;
  description: {
    [key in LanguageCode]: string;
  };
  direction: IDirection;
  gender: IGender;
}

export interface ISizeBody {
  quantity: number;
  size: ISize;
}
