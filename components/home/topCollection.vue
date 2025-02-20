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
                  <product :product="product" @openCart="openCart" />
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

import product from "../card/product.vue";

import type { IProduct } from "../../types/product";

const props = defineProps<{
  products: IProduct[];
}>();
const emits = defineEmits(["openCart"]);

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

function openCart(e: IProduct) {
  emits("openCart", e);
}
</script>
