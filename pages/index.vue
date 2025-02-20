<template>
  <div>
    <HomeBanner />
    <TopCollection
      v-if="topProducts.length > 0"
      :products="topProducts"
      @openCart="openCart"
    />
    <HomeFashionBanner v-if="homeStore.fashionBanner" />
    <HomeProductTab v-if="topProducts.length > 0" :products="topProducts" />
    <HomeBlog />
    <HomeCompany />
    <!-- @openQuickview="showQuickview"
      @openCompare="showCoampre"
      @openCart="showCart" -->
    <!-- <ShopFashionServices />
    <WidgetsQuickview
      :openModal="showquickviewmodel"
      :productData="quickviewproduct"
      @closeView="closeViewModal"
    />
    <WidgetsComparePopup
      :openCompare="showcomparemodal"
      :productData="comapreproduct"
      @closeCompare="closeCompareModal"
    />
    <cart-modal-popup
      :openCart="showcartmodal"
      :productData="cartproduct"
      @closeCart="closeCartModal"
      :products="products"
    />
    <WidgetsNewsletterPopup /> -->
    <cart
      v-if="isCartModal"
      v-model="isCartModal"
      :product="selectedProduct"
      @onClose="closedModalCart"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAsyncData, useFetch } from "nuxt/app";

import TopCollection from "../components/home/topCollection.vue";
import Cart from "../components/modals/cart.vue";

import { useProductsStore } from "./../store/newProducts";
import { useHomeStore } from "../store/home";
import { useBlogStore } from "../store/blog";

import type { IProduct } from "../types/product";

definePageMeta({
  auth: false,
});

const newProductStore = useProductsStore();
const homeStore = useHomeStore();
const blogStore = useBlogStore();

const selectedProduct = ref<IProduct>();
const topProducts = ref<IProduct[]>([]);
const isCartModal = ref(false);

useAsyncData("directions", () => homeStore.getDirections());
useAsyncData("fashionBanner", () => homeStore.getFashionBanner());

onMounted(async () => {
  homeStore.getCompanies();
  newProductStore
    .getProducts({
      populate:
        "country.flag, direction, company, colors, product_details, product_details.color, product_details.media",
    })
    .then((res) => {
      topProducts.value = res;
    });
  blogStore.getBlogs({ populate: "*" });
});

function openCart(e: IProduct) {
  selectedProduct.value = e;
  isCartModal.value = true;
}

function closedModalCart(e) {
  console.log("Closed Modal Cart", e);
}
</script>
