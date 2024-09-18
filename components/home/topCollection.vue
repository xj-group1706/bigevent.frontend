<template>
  <div>
    <div class="title1 section-t-space">
      <h4>{{ $t("specialOffer") }}</h4>
      <h2 class="title-inner1">{{ $t("topCollection") }}</h2>
    </div>
    <section class="section-b-space pt-0 ratio_asos">
      <div class="container">
        <div class="row">
          <div class="col">
            <swiper
              :breakpoints="swiperOption.breakpoints"
              :slidesPerView="4"
              :spaceBetween="20"
              class="swiper-wrapper"
            >
              <swiper-slide
                class="swiper-slide"
                v-for="(product, index) in products"
                :key="index"
              >
                <div class="product-box">
                  <CardProduct
                    @opencartmodel="showCartModal"
                    @showCompareModal="showcomparemodal"
                    @openquickview="showquickview"
                    @alertseconds="alert"
                    :product="product"
                    :index="index"
                  />
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/free-mode";

import type { IProduct } from "../../types/product";

const props = defineProps<{
  products: IProduct[];
}>();
const emits = defineEmits(["openCart", "openQuickview", "openCompare"]);

const swiperOption = {
  freeMode: false,
  breakpoints: {
    1200: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    991: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    0: {
      slidesPerView: 2,
    },
  },
};
const showCart = ref(false);
const showquickviewmodel = ref(false);
const showcomapreModal = ref(false);
const quickviewproduct = ref({});
const comapreproduct = ref({});
const cartproduct = ref({});
const dismissCountDown = ref(0);

const alert = (item) => {
  dismissCountDown.value = item;
};
const showCartModal = (item, productData) => {
  showCart.value = item;
  cartproduct.value = productData;
  emits("openCart", showCart, cartproduct.value);
};
const showquickview = (item, productData) => {
  showquickviewmodel.value = item;
  quickviewproduct.value = productData;
  emits("openQuickview", showquickviewmodel, quickviewproduct);
};
const showcomparemodal = (item, productData) => {
  showcomapreModal.value = item;
  comapreproduct.value = productData;
  emits("openCompare", showcomapreModal, comapreproduct);
};
</script>
