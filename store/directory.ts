import { ref } from "vue";
import { defineStore } from "pinia";

import { useDirection } from "./../composables/api/direction";

import type { IDirection } from "./../types/direction";

const DIRECTORY_STORE = "directoryStore";

export const useDirectoryStore = defineStore(DIRECTORY_STORE, () => {
  const directions = ref<IDirection[]>([]);

  function getDirections() {
    return new Promise((resolve, reject) => {
      const { getDirections } = useDirection();
      getDirections({ populate: "banner" }).then((res) => {
        directions.value = res.data;
        resolve(res);
      });
    });
  }

  return { directions, getDirections };
});
