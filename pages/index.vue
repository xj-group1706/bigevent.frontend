<template>
  <div>
    <HomeBanner />
    <TopCollection v-if="topProducts.length > 0" :products="topProducts" />
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
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAsyncData, useFetch } from "nuxt/app";

import TopCollection from "../components/home/topCollection.vue";

import { useProductsStore } from "./../store/newProducts";
import { useHomeStore } from "../store/home";
import { useProductStore } from "../store/products";
import { useBlogStore } from "../store/blog.ts";

import type { IProduct } from "../types/product";

const newProductStore = useProductsStore();
const homeStore = useHomeStore();
const blogStore = useBlogStore();
const productStore = useProductStore();

const topProducts = ref<IProduct[]>([]);

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

// export default {
//   data() {
//     return {
//       blog: [],
//       products: [],
//       category: [],
//       showquickviewmodel: false,
//       showcomparemodal: false,
//       showcartmodal: false,
//       quickviewproduct: {},
//       comapreproduct: {},
//       cartproduct: {},
//     };
//   },
//   computed: {
//     ...mapState(useProductStore, {
//       productslist: "productslist",
//     }),
//     ...mapState(useBlogStore, {
//       bloglist: "bloglist",
//     }),
//   },

//   methods: {
//     productsArray: function () {
//       this.productslist.map((item) => {
//         if (item.type === "fashion") {
//           this.products.push(item);
//           item.collection.map((i) => {
//             const index = this.category.indexOf(i);
//             if (index === -1) this.category.push(i);
//           });
//         }
//       });
//     },
//     blogArray: function () {
//       this.bloglist.map((item) => {
//         if (item.type === "fashion") {
//           this.blog.push(item);
//         }
//       });
//     },
//     showQuickview(item, productData) {
//       this.showquickviewmodel = item;
//       this.quickviewproduct = productData;
//     },
//     showCoampre(item, productData) {
//       this.showcomparemodal = item;
//       this.comapreproduct = productData;
//     },
//     closeCompareModal(item) {
//       this.showcomparemodal = item;
//     },
//     showCart(item, productData) {
//       this.showcartmodal = item;
//       this.cartproduct = productData;
//     },
//     closeCartModal(item) {
//       this.showcartmodal = item;
//     },
//     closeViewModal(item) {
//       this.showquickviewmodel = item;
//     },
//   },
//   mounted() {
//     this.productsArray();
//     this.blogArray();
//   },
// };
</script>
