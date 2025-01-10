<template>
  <div>
    <section class="section-b-space">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="slide-6 no-arrow">
              <swiper
                :breakpoints="swiperOptions.breakpoints"
                :slidesPerView="3"
                :freeMode="true"
                :modules="modules"
                class="swiper-wrapper"
              >
                <swiper-slide
                  class="swiper-slide"
                  v-for="(item, index) in homeStore.companies"
                  :key="index"
                >
                  <company :company="item" />
                </swiper-slide>
              </swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper";

import { useHomeStore } from "../../store/home";

import company from "../card/company.vue";

const homeStore = useHomeStore();

const modules = [FreeMode];
const swiperOptions = ref({
  breakpoints: {
    1199: {
      slidesPerView: 6,
    },
    768: {
      slidesPerView: 4,
    },
    420: {
      slidesPerView: 3,
    },
    0: {
      slidesPerView: 2,
    },
  },
});
const items = ref([
  {
    imagepath: "/images/logos/1.png",
  },
  {
    imagepath: "/images/logos/2.png",
  },
  {
    imagepath: "/images/logos/3.png",
  },
  {
    imagepath: "/images/logos/4.png",
  },
  {
    imagepath: "/images/logos/5.png",
  },
  {
    imagepath: "/images/logos/6.png",
  },
  {
    imagepath: "/images/logos/7.png",
  },
  {
    imagepath: "/images/logos/8.png",
  },
]);
</script>
