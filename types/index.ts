export type LanguageCode = "uz" | "ru" | "en";

export interface IResponse<T> {
  data: T[];
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
