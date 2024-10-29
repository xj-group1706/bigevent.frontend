import type { IBrand } from "../../types/brand";
import type { IReqFilter, IResponse } from "../../types/index";
import type { IProduct } from "../../types/product";

export const useProduct = () => {
  const { $api } = useNuxtApp();

  const getProducts = async (
    payload: IReqFilter
  ): Promise<IResponse<IProduct[]>> => {
    const res = await $api.get(`/products`, payload);
    return res;
  };

  const getProductById = async (payload: {
    id: string;
    payload: IReqFilter;
  }) => {
    return await $api.get(`/products/${payload.id}`, payload.payload);
  };

  const getBrands = async (
    payload: IReqFilter
  ): Promise<IResponse<IBrand[]>> => {
    const res = await $api.get("/brands", payload);
    return res;
  };

  const getColors = async (payload: IReqFilter) => {
    const res = await $api.get("/colors", payload);
    return res;
  };

  const getSizes = async (payload: IReqFilter) => {
    const res = await $api.get("/sizes", payload);
    return res;
  };
  return {
    getProducts,
    getProductById,
    getBrands,
    getColors,
    getSizes,
  };
};
