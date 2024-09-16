import { useNuxtApp } from "#app";

import type { IResponse, IReqFilter } from "@/types";
import type { IDirection } from "@/types/direction";

export const useDirection = () => {
  const { $api } = useNuxtApp();

  const getDirections = async (
    filter: IReqFilter
  ): Promise<IResponse<IDirection>> => {
    return await $api(`/directions`, { params: filter });
  };

  return {
    getDirections,
  };
};
