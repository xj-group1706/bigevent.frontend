import type { IMedia } from "./media";

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
