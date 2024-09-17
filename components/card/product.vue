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
          :alt="selectedDetail.media[0].name"
        />
      </nuxt-link>
    </div>
    <!-- <div class="back" v-if="product.images.length > 1">
      <nuxt-link :to="{ path: '/product/sidebar/' + product.id }">
        <img
          :src="getImgUrl(imageSrc ? imageSrc : product.images[1].src)"
          :key="index"
          :id="product.id"
          alt=""
          class="img-fluid m-auto media"
        />
      </nuxt-link>
    </div> -->
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
        @click="addToCart(product)"
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
    <div class="rating">
      <i class="fa fa-star"></i>
      <i class="fa fa-star"></i>
      <i class="fa fa-star"></i>
      <i class="fa fa-star"></i>
      <i class="fa fa-star"></i>
    </div>
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
          @click="getProductDetailByColor(detail.color)"
          v-bind:style="{ 'background-color': `#${detail.color.code}` }"
        ></a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { getImageUrl } from "../../utils/tools";

import { useProductStore } from "../../store/products";
import { useCartStore } from "../../store/cart";
import type { IProduct, IProductDetail } from "../../types/product";
import type { IColor } from "../../types/color";
import type { IMedia } from "../../types/media";

const props = defineProps<{
  product: IProduct;
}>();

const emits = defineEmits([
  " opencartmodel",
  "openquickview",
  "alertseconds",
  "showCompareModal",
]);

const selectedDetail = ref(props.product.product_details[0]);
const symbol = ref("$");
const imageSrc = ref<IMedia>();
const quickviewProduct = ref({});
const compareProduct = ref({});
const cartProduct = ref({});
const showquickview = ref(false);
const showCompareModal = ref(false);
const cartval = ref(false);
const variants = ref({
  productId: "",
  image: "",
});
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
const productslist = computed(() => {
  return useProductStore().productslist;
});
const curr = computed(() => {
  return useProductStore().changeCurrency;
});

function getProductDetailByColor(color: IColor) {
  selectedDetail.value = props.product.product_details.find(
    (detail) => detail.color.id === color.id
  );
  imageSrc.value = selectedDetail.value.media[0];
}

const getImgUrl = (path) => {
  return "/images/" + path;
};

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
const Color = (variants) => {
  const uniqColor = [];
  for (let i = 0; i < Object.keys(variants).length; i++) {
    if (uniqColor.indexOf(variants[i].color) === -1) {
      uniqColor.push(variants[i].color);
    }
  }
  return uniqColor;
};
const productColorchange = (color, product) => {
  product.variants.map((item) => {
    if (item.color === color) {
      product.images.map((img) => {
        if (img.image_id === item.image_id) {
          imageSrc.value = img.src;
        }
      });
    }
  });
};
const productVariantChange = (img) => {
  imageSrc.value = img;
};
const countDownChanged = (dismissCountDown) => {
  dismissCountDown.value = dismissCountDown;
  emits("alertseconds", dismissCountDown.value);
};
const discountedPrice = (product) => {
  const price =
    (product.price - (product.price * product.discount) / 100) *
    curr.value.curr;
  return price;
};
</script>
