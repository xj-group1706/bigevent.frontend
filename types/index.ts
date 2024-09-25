import type { IMedia } from "./media";

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
  data: T | T[];
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
  pagination?: {
    page: number;
    pageSize: number;
  };
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
