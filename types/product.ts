import type { IMedia } from "./media";
import type { LanguageCode } from "./index";
import type { IColor } from "./color";
import type { ISize } from "./size";
import type { IDirection } from "./direction";
import type { ICountry } from "./country";
import type { ICompany } from "./company";

export interface IProductDetail {
  id: number;
  color: IColor;
  media: IMedia[];
  quantity: number;
  price: number;
  sale: number;
  sizes: Array<{
    size: ISize;
    quantity: number;
  }>;
}

export interface IProduct {
  id: number;
  createdAt: Date;
  name: {
    [key in LanguageCode]: string;
  };
  description: {
    [key in LanguageCode]: string;
  };
  content: {
    [key in LanguageCode]: string;
  };
  company: ICompany;
  direction: IDirection;
  country: ICountry;
  colors: IColor[];
  product_details: IProductDetail[];
  rate: number;
  raters: number;
}
