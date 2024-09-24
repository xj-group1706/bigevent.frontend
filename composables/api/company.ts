import type { IReqFilter } from "../../types/index";

export const useCompany = () => {
  const { $api } = useNuxtApp();

  const getCompanies = async (payload: IReqFilter) => {
    const res = await $api(`/companies`, { params: payload });
    return res;
  };

  return {
    getCompanies,
  };
};
