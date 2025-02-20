<template>
  <div>
    <swiper
      :slidesPerView="1"
      :spaceBetween="20"
      class="swiper-wrapper h-auto mb-4"
      @swiper="onSwiper"
    >
      <swiper-slide
        class="swiper-slide"
        v-for="(img, index) in data?.media"
        :key="index"
      >
        <img
          :src="getImageUrl(img.url)"
          class="img-fluid bg-img"
          :alt="img.name"
        />
      </swiper-slide>
    </swiper>
    <div class="row">
      <div class="col-12 slider-nav-images">
        <swiper
          :slidesPerView="3"
          slide-active-class="true"
          :spaceBetween="20"
          class="swiper-wrapper"
        >
          <swiper-slide
            class="swiper-slide"
            v-for="(img, index) in data?.media"
            :key="index"
            :class="imgIndex === index ? 'product-slider-active' : ''"
          >
            <img
              :src="getImageUrl(img.formats.small.url)"
              class="img-fluid bg-img"
              :alt="img.name"
              @click="slideTo(index)"
            />
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import SwiperCore, { Navigation } from "swiper";

import { getImageUrl } from "../../utils/tools";

import type { IProductDetail } from "../../types/product";

SwiperCore.use([Navigation]);

defineProps<{
  data?: IProductDetail;
}>();

const swiperInstance = ref<SwiperCore | null>(null);
const imgIndex = ref(0);

function onSwiper(el: SwiperCore) {
  swiperInstance.value = el;
}

function slideTo(ind: number) {
  imgIndex.value = ind;
  if (swiperInstance.value) swiperInstance.value?.slideTo(ind);
}
</script>
