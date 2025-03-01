<template>
  <div ref="outerDivRef" class="product-box">
    <div class="img-wrapper">
      <div class="label-block">
        <span class="label3">
          {{ $t("new") }}
        </span>
        <span class="label4" v-if="isSale">{{ $t("onSale") }}</span>
      </div>
      <div class="front">
        <nuxt-link :to="localePath({ path: '/products/' + product.id })">
          <img
            :src="getImageUrl(selectedImage().value.url)"
            class="img-fluid bg-img media"
            :alt="selectedImage().value.name"
          />
        </nuxt-link>
      </div>
      <ul class="product-thumb-list">
        <li
          class="grid_thumb_img"
          :class="{ active: selectedImage().value.id === image.id }"
          v-for="(image, index) in selectedDetail().value.media"
          :key="index"
          @click="selectedImage(image)"
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
          :title="$t('addToCart')"
          @click="addToBasket()"
          variant="primary"
        >
          <i
            :class="
              isBasketAdded ? 'ti-shopping-cart-full' : 'ti-shopping-cart'
            "
          ></i>
        </button>
        <a
          href="javascript:void(0)"
          :title="$t('wishlist')"
          @click="addToWishlist(selectedDetail().value)"
        >
          <i class="ti-heart" aria-hidden="true" />
        </a>
        <a
          href="javascript:void(0)"
          :title="$t('quickView')"
          @click="showQuickView(selectedDetail().value)"
          variant="primary"
        >
          <i class="ti-search" aria-hidden="true"></i>
        </a>
        <a
          href="javascript:void(0)"
          :title="$t('compare')"
          @click.prevent="addToCompare(selectedDetail().value)"
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
          23, 2, 14, 17, 0, 19, 10, 34, 7, 50, 23, 43, 38, 50, 36, 34, 46, 19,
          31, 17,
        ]"
        :active-color="'#ffa200'"
        :inactive-color="'#eaeaea'"
      />
      {{ isBasketAdded }}
      <nuxt-link :to="{ path: '/products/' + product.id }">
        <h6 :class="`w-[${divWidth - 10}px] truncate`">
          {{ product.name[$i18n.locale] }}
        </h6>
      </nuxt-link>
      <p>{{ product.description[$i18n.locale] }}</p>
      <h4 v-if="selectedDetail().value.sale">
        {{ selectedDetail().value.price }}

        <del>{{ selectedDetail().value.price }}</del>
      </h4>
      <h4 v-else>
        {{ selectedDetail().value.price }}
      </h4>
      <ul class="color-variant" v-if="product.product_details.length > 0">
        <li v-for="(detail, ind) in product.product_details" :key="ind">
          <a
            class="border border-gray-700"
            @click="selectedDetail(detail.color)"
            v-bind:style="{ 'background-color': `#${detail.color.code}` }"
          ></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch, type ComputedRef } from "vue";

import { getImageUrl } from "../../utils/tools";

import { useBasketStore } from "../../store/basket";
import { useProductStore } from "../../store/products";

import type { IProduct, IProductDetail } from "../../types/product";
import type { IColor } from "../../types/color";
import type { IMedia } from "../../types/media";

const props = defineProps<{
  product: IProduct;
}>();

const emits = defineEmits(["openCart"]);

const localePath = useLocalePath();

const basketStore = useBasketStore();

const detail = ref<IProductDetail>();
const imageSrc = ref<IMedia>();
const quickviewProduct = ref({});
const compareProduct = ref({});
const showquickview = ref(false);
const showCompareModal = ref(false);
const dismissSecs = ref(5);
const dismissCountDown = ref(0);
const divWidth = ref(0);
const outerDivRef = ref<HTMLDivElement | null>(null);

onMounted(() => {
  if (outerDivRef.value) {
    divWidth.value = outerDivRef.value.offsetWidth;
  }
});

const isSale = computed(() => {
  return props.product.product_details.find((detail) => detail.sale > 0);
});

const isBasketAdded = computed(() => {
  const foundProductInd = basketStore.products.findIndex(
    (el) => el.id === props.product.id
  );
  return foundProductInd > -1 ? true : false;
});

const selectedDetail = (color?: IColor): ComputedRef<IProductDetail> => {
  if (color) {
    detail.value = props.product.product_details.find(
      (detail) => detail.color.id === color.id
    );
    return computed(() => detail.value || selectedDetail().value);
  }
  return computed(() => detail.value || props.product.product_details[0]);
};

const selectedImage = (img?: IMedia): ComputedRef<IMedia> => {
  if (img) {
    imageSrc.value = img;
    return computed(() => img);
  }
  return computed(() => imageSrc.value || selectedDetail().value.media[0]);
};

function addToBasket() {
  emits("openCart", props.product);
}

const addToWishlist = (product) => {
  dismissCountDown.value = dismissSecs.value;
  useNuxtApp().$showToast({
    msg: "Product Is successfully added to your wishlist.",
    type: "info",
  });
  useProductStore().addToWishlist(product);
};

const showQuickView = (productData) => {
  showquickview.value = true;
  quickviewProduct.value = productData;
};

const addToCompare = (product) => {
  showCompareModal.value = true;
  compareProduct.value = product;
  useProductStore().addToCompare(product);
};
</script>
