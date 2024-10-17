import { ref } from "vue";
import { defineStore } from "pinia";

import { useProduct } from "./../composables/api/product";

import { GENDER } from "../utils/constants";

import type { IProduct } from "./../types/product";
import type { IPersistStrategy, IReqFilter } from "./../types/index";
import type { IBrand } from "./../types/brand";
import type { IColor } from "../types/color";
import type { ISize } from "../types/size";

const PRODUCT_STORE = "productStore";

export const useProductsStore = defineStore(
  PRODUCT_STORE,
  () => {
    const products = ref<IProduct[]>([]);
    const product = ref<IProduct>({} as IProduct);
    const brands = ref<IBrand[]>([]);
    const colors = ref<IColor[]>([]);
    const sizes = ref<ISize[]>([]);
    const sizesForMen = ref<ISize[]>([]);
    const sizesForWomen = ref<ISize[]>([]);

    function getProductById(id: string): Promise<IProduct> {
      return new Promise((resolve, reject) => {
        useProduct()
          .getProductById({
            id: id,
            payload: {
              populate:
                "country.flag, direction, company, colors, product_details, product_details.color, product_details.media",
            },
          })
          .then((res) => {
            product.value = res.data;
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    }

    function getProducts(payload: IReqFilter): Promise<IProduct[]> {
      return new Promise((resolve, reject) => {
        useProduct()
          .getProducts(payload)
          .then((res) => {
            products.value = res.data;
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    }

    function getSizes(): Promise<ISize[]> {
      return new Promise((resolve, reject) => {
        useProduct()
          .getSizes({ populate: "*" })
          .then((res) => {
            sizes.value = res.data;
            sizesForMen.value = sizes.value.filter(
              (item) => item.gender.id === GENDER.MAN
            );
            sizesForWomen.value = sizes.value.filter(
              (item) => item.gender.id === GENDER.WOMAN
            );
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    }

    function getColors(): Promise<IColor[]> {
      return new Promise((resolve, reject) => {
        useProduct()
          .getColors({ populate: "*" })
          .then((res) => {
            colors.value = res.data;
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    }

    function getBrands(): Promise<IBrand[]> {
      return new Promise((resolve, reject) => {
        useProduct()
          .getBrands({ populate: "*" })
          .then((res) => {
            brands.value = res.data;
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    }

    return {
      products,
      product,
      getProducts,
      getProductById,
      brands,
      getBrands,
      colors,
      getColors,
      sizes,
      sizesForMen,
      sizesForWomen,
      getSizes,
    };
  },
  {
    persist: {
      key: PRODUCT_STORE,
      storage: piniaPluginPersistedstate.sessionStorage(),
      pick: [
        "products",
        "product",
        "brands",
        "colors",
        "sizes",
        "sizesForMen",
        "sizesForWomen",
      ],
    } as IPersistStrategy,
  }
);
