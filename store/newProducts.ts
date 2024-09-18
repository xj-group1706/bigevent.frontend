import { ref } from "vue";
import { defineStore } from "pinia";

import { useProduct } from "./../composables/api/product";

import type { IProduct } from "./../types/product";
import type { IReqFilter } from "./../types/index";

const PRODUCT_STORE = "productStore";

export const useProductsStore = defineStore(PRODUCT_STORE, () => {
  const products = ref<IProduct[]>([]);

  function getProducts(payload: IReqFilter): Promise<IProduct[]> {
    return new Promise((resolve, reject) => {
      const { getProducts } = useProduct();
      getProducts(payload)
        .then((res) => {
          products.value = res.data;
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  return { products, getProducts };
});
