import { ref } from "vue";
import { defineStore } from "pinia";

import { useCompany } from "../composables/api/company";
import { useHome } from "../composables/api/home";

import type { IFashionBanner } from "./../types/index";
import type { IDirection } from "../types/direction";
import type { ICompany } from "../types/company";

const HOME_STORE = "homeStore";

export const useHomeStore = defineStore(HOME_STORE, () => {
  const fashionBanner = ref<IFashionBanner>();
  const directions = ref<IDirection[]>([]);
  const companies = ref<ICompany[]>([]);

  function getCompanies() {
    return new Promise((resolve, reject) => {
      useCompany()
        .getCompanies({ populate: "*" })
        .then((res) => {
          companies.value = res.data;
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  function getFashionBanner() {
    return new Promise((resolve, reject) => {
      useHome()
        .getFashionBanner({ populate: "*" })
        .then((res) => {
          fashionBanner.value = res.data as IFashionBanner;
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  function getDirections() {
    return new Promise((resolve, reject) => {
      useHome()
        .getDirections({ populate: "banner" })
        .then((res) => {
          directions.value = res.data as IDirection[];
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  return {
    fashionBanner,
    getFashionBanner,
    directions,
    getDirections,
    companies,
    getCompanies,
  };
});
