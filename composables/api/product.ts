import type { IReqFilter } from "../../types/index";

export const useProduct = () => {
  const { $api } = useNuxtApp();

  const getProducts = async (payload: IReqFilter) => {
    const res = await $api(`/products`, { params: payload });
    return res;
  };

  return {
    getProducts,
  };
};
