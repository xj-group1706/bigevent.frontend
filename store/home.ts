import { ref } from "vue";
import { defineStore } from "pinia";

import { useHome } from "./../composables/api/home";

import type { IFashionBanner } from "./../types/index";
import type { IDirection } from "../types/direction";

const HOME_STORE = "homeStore";

export const useHomeStore = defineStore(HOME_STORE, () => {
  const fashionBanner = ref<IFashionBanner>();
  const directions = ref<IDirection[]>([]);

  function getFashionBanner() {
    return new Promise((resolve, reject) => {
      const { getFashionBanner } = useHome();
      getFashionBanner({ populate: "*" })
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
      const { getDirections } = useHome();
      getDirections({ populate: "banner" })
        .then((res) => {
          directions.value = res.data as IDirection[];
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  return { fashionBanner, getFashionBanner, directions, getDirections };
});
