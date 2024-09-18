import { useNuxtApp } from "#app";
import type { IDirection } from "../../types/direction";
import type { IResponse, IReqFilter, IFashionBanner } from "../../types/index";

export const useHome = () => {
  const { $api } = useNuxtApp();

  const getFashionBanner = async (
    filter: IReqFilter
  ): Promise<IResponse<IFashionBanner>> => {
    return await $api(`/fashion-banner`, { params: filter });
  };

  const getDirections = async (
    filter: IReqFilter
  ): Promise<IResponse<IDirection[]>> => {
    return await $api(`/directions`, { params: filter });
  };

  return {
    getFashionBanner,
    getDirections,
  };
};
