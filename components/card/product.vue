<template>
  <div class="img-wrapper">
    <div class="lable-block">
      <span class="lable3" v-if="isNew">
        {{ $t("new") }}
      </span>
      <span class="lable4" v-if="isSale">{{ $t("onSale") }}</span>
    </div>
    <div class="front">
      <nuxt-link :to="localePath({ path: '/product/' + product.id })">
        <img
          :src="
            imageSrc
              ? getImageUrl(imageSrc.url)
              : getImageUrl(selectedDetail.media[0].url)
          "
          class="img-fluid bg-img media"
          :alt="imageSrc ? imageSrc.name : selectedDetail.media[0].name"
        />
      </nuxt-link>
    </div>
    <div class="back" v-if="selectedDetail.media.length > 1">
      <nuxt-link :to="{ path: '/product/' + product.id }">
        <img
          :src="
            imageSrc
              ? getImageUrl(imageSrc.url)
              : getImageUrl(selectedDetail.media[1].url)
          "
          :alt="imageSrc ? imageSrc.name : selectedDetail.media[1].name"
          class="img-fluid m-auto media"
        />
      </nuxt-link>
    </div>
    <ul class="product-thumb-list">
      <li
        class="grid_thumb_img"
        :class="{ active: imageSrc && imageSrc.id === image.id }"
        v-for="(image, index) in selectedDetail.media"
        :key="index"
        @click="productVariantChange(image)"
      >
        <a href="javascript:void(0);">
          <img :src="getImageUrl(image.formats.small.url)" />
        </a>
      </li>
    </ul>
    <div class="cart-info cart-wrap">
      <button
        data-toggle="modal"
        data-target="#modal-cart"
        title="Add to cart"
        @click="addToBasket(selectedDetail)"
        variant="primary"
      >
        <i class="ti-shopping-cart"></i>
      </button>
      <a href="javascript:void(0)" title="Wishlist">
        <i
          class="ti-heart"
          aria-hidden="true"
          @click="addToWishlist(product)"
        ></i>
      </a>
      <a
        href="javascript:void(0)"
        title="Quick View"
        @click="showQuickview(product)"
        variant="primary"
      >
        <i class="ti-search" aria-hidden="true"></i>
      </a>
      <a
        href="javascript:void(0)"
        title="Comapre"
        @click.prevent="addToCompare(product)"
        variant="primary"
      >
        <i class="ti-reload" aria-hidden="true"></i>
      </a>
    </div>
  </div>
  <div class="product-detail">
    <StarRating
      :rating="product.rate"
      :increment="0.01"
      :read-only="true"
      :star-size="15"
      :rounded-corners="true"
      :show-rating="false"
      :star-points="[
        23, 2, 14, 17, 0, 19, 10, 34, 7, 50, 23, 43, 38, 50, 36, 34, 46, 19, 31,
        17,
      ]"
      :active-color="'#ffa200'"
      :inactive-color="'#eaeaea'"
    />
    <nuxt-link :to="{ path: '/product/sidebar/' + product.id }">
      <h6>{{ product.name[$i18n.locale] }}</h6>
    </nuxt-link>
    <p>{{ product.description[$i18n.locale] }}</p>
    <h4 v-if="selectedDetail.sale">
      {{ selectedDetail.price }}

      <del>{{ selectedDetail.price }}</del>
    </h4>
    <h4 v-else>
      {{ selectedDetail.price }}
    </h4>
    <ul class="color-variant" v-if="product.product_details.length > 0">
      <li v-for="(detail, ind) in product.product_details" :key="ind">
        <a
          class="border border-gray-700"
          @click="getProductDetailByColor(detail.color)"
          v-bind:style="{ 'background-color': `#${detail.color.code}` }"
        ></a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { getImageUrl } from "../../utils/tools";

import { useBasketStore } from "../../store/basket";
import { useProductStore } from "../../store/products";
import { useCartStore } from "../../store/cart";

import type { IProduct, IProductDetail } from "../../types/product";
import type { IColor } from "../../types/color";
import type { IMedia } from "../../types/media";

const props = defineProps<{
  product: IProduct;
}>();

const emits = defineEmits([
  "addToBasket",
  " opencartmodel",
  "openquickview",
  "alertseconds",
  "showCompareModal",
]);

const basketStore = useBasketStore();

const selectedDetail = ref<IProductDetail>(props.product.product_details[0]);
const imageSrc = ref<IMedia>();
const quickviewProduct = ref({});
const compareProduct = ref({});
const cartProduct = ref({});
const showquickview = ref(false);
const showCompareModal = ref(false);
const cartval = ref(false);
const dismissSecs = ref(5);
const dismissCountDown = ref(0);

const isNew = computed(() => {
  return true;
  //   console.log("isNew", props.product.createdAt);
  //   return (
  //     props.product.createdAt.getTime() >
  //     new Date().getTime() - 1000 * 60 * 60 * 24 * 30
  //   );
});
const isSale = computed(() => {
  return props.product.product_details.find((detail) => detail.sale > 0);
});

function getProductDetailByColor(color: IColor) {
  selectedDetail.value =
    props.product.product_details.find(
      (detail) => detail.color.id === color.id
    ) || selectedDetail.value;
  imageSrc.value = selectedDetail.value.media[0];
}

function addToBasket(detail: IProductDetail) {
  emits("addToBasket", detail);
  basketStore.addToBasket({ detail });
}

const addToCart = (product) => {
  cartval.value = true;
  cartProduct.value = product;
  emits("opencartmodel", cartval.value, cartProduct.value);

  useCartStore().addToCart(product);
};
const addToWishlist = (product) => {
  dismissCountDown.value = dismissSecs.value;
  useNuxtApp().$showToast({
    msg: "Product Is successfully added to your wishlist.",
    type: "info",
  });
  useProductStore().addToWishlist(product);
};
const showQuickview = (productData) => {
  showquickview.value = true;
  quickviewProduct.value = productData;
  emits("openquickview", showquickview.value, quickviewProduct.value);
};
const addToCompare = (product) => {
  showCompareModal.value = true;
  compareProduct.value = product;
  emits("showCompareModal", showCompareModal.value, compareProduct.value);

  useProductStore().addToCompare(product);
};

const productVariantChange = (img) => {
  imageSrc.value = img;
};
</script>
