import type { IReqFilter } from "../../types/index";

export const useProduct = () => {
  const { $api } = useNuxtApp();

  const getProducts = async (payload: IReqFilter) => {
    const res = await $api(`/products`, { params: payload });
    return res;
  };

  const getProductById = async (payload: {
    id: string;
    payload: IReqFilter;
  }) => {
    return await $api(`/products/${payload.id}`, { params: payload.payload });
  };

  const getBrands = async (payload: IReqFilter) => {
    const res = await $api("/brands", { params: payload });
    return res;
  };

  const getColors = async (payload: IReqFilter) => {
    const res = await $api("/colors", { params: payload });
    return res;
  };

  const getSizes = async (payload: IReqFilter) => {
    const res = await $api("/sizes", { params: payload });
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
