import { ref } from "vue";
import { defineStore } from "pinia";

import { useCompany } from "../composables/api/company";

import type { ICompany } from "../types/company";
import type {
  IPagination,
  IPersistStrategy,
  IReqFilter,
} from "./../types/index";

const COMPANY_STORE = "companyStore";

export const useCompaniesStore = defineStore(
  COMPANY_STORE,
  () => {
    const companies = ref<ICompany[]>([]);
    const company = ref<ICompany>({} as ICompany);
    const pagination = ref<IPagination>({
      page: 1,
      pageSize: 12,
      pageCount: 0,
      total: 0,
    });

    function getCompanyById(id: string): Promise<ICompany> {
      return new Promise((resolve, reject) => {
        useCompany()
          .getCompanyById({
            id: id,
            payload: {
              populate: "directions, logo, region, district, owner, banner",
            },
          })
          .then((res) => {
            company.value = res.data;
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    }

    function getCompanies(payload: IReqFilter): Promise<ICompany[]> {
      return new Promise((resolve, reject) => {
        useCompany()
          .getCompanies(payload)
          .then((res) => {
            companies.value = res.data;
            pagination.value = res.meta.pagination;
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    }
    return {
      pagination,
      companies,
      company,
      getCompanies,
      getCompanyById,
    };
  },
  {
    persist: {
      key: COMPANY_STORE,
      storage: piniaPluginPersistedstate.sessionStorage(),
      pick: ["companies", "company"],
    } as IPersistStrategy,
  }
);
