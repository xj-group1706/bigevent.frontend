import type { IMedia } from "./media";

export interface IProductFilter {
  brands: Number[];
  colors: Number[];
  sizes: Number[];
  price: Number;
  category: Number;
}

export interface IPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface IPersistStrategy {
  key?: string;
  storage?: Storage;
  pick?: string[];
}
export interface IMenu {
  title: string;
  type: string;
  badgeValue?: string;
  active: boolean;
  megaMenu?: boolean;
  path: string;
  children?: Array<{
    path: string;
    title: string;
    type: string;
    active?: boolean;
    children?: Array<{
      path: string;
      title: string;
      type: string;
      active?: boolean;
    }>;
  }>;
}

export type LanguageCode = "uz" | "ru" | "en";

export interface IResponse<T> {
  data: T;
  meta: IMeta;
}

export interface IMeta {
  pagination: {
    page: number;
    pageCount: number;
    pageSize: number;
    total: number;
  };
}

export interface IReqFilter {
  populate: string;
  sort?: Array<string>;
  "pagination[page]"?: number;
  "pagination[pageSize]"?: number;
}

export interface IFashionBanner {
  id: number;
  title: {
    [key in LanguageCode]: string;
  };
  subtitle: {
    [key in LanguageCode]: string;
  };
  text: {
    [key in LanguageCode]: string;
  };
  media: IMedia;
}
