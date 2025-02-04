import type { IMedia } from "./media";
import type { IUser } from "./user";

export interface IAuth {
  jwt: string;
  user: IUser;
}
export interface ITypeView {
  col2: boolean;
  col3: boolean;
  col4: boolean;
  col6: boolean;
  listView: boolean;
}

export interface IError<T> {
  data: T | null;
  success: boolean;
  code: number;
  message: string;
}
export interface IProductFilter {
  colors: number[];
  sizes: number[];
  price: number;
  direction: number;
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
  pagination?: {
    page: number;
    pageSize: number;
  };
  [key: string]: any;
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
