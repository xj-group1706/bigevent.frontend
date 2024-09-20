<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="title1 section-t-space">
            <h4>{{ subtitle }}</h4>
            <h2 class="title-inner1">{{ title }}</h2>
          </div>
        </div>
      </div>
    </div>
    <section class="blog pt-0 ratio2_3">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <swiper
              :breakpoints="swiperOption.breakpoints"
              :slidesPerView="3"
              :spaceBetween="10"
              class="swiper-wrapper"
            >
              <swiper-slide
                class="swiper-slide"
                v-for="(blog, index) in blogStore.blogs"
                :key="index"
              >
                <div class="classic-effect">
                  <div>
                    <img
                      :src="getImageUrl(blog.media.url)"
                      class="img-fluid"
                      :alt="blog.media.name"
                    />
                  </div>
                  <span></span>
                </div>
                <div class="blog-details">
                  <h4>{{ getDateTime(blog.createdAt) }}</h4>
                  <a href="#">
                    <p>{{ blog.name[locale] }}</p>
                  </a>
                  <hr class="style1" />
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { useI18n } from "vue-i18n";

import { getImageUrl, getDateTime } from "../../utils/tools.ts";

import { useBlogStore } from "../../store/blog.ts";

const { locale } = useI18n();
const blogStore = useBlogStore();

const title = "from the blog";
const subtitle = "recent story";
const swiperOption = {
  breakpoints: {
    1199: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    991: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    420: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    0: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
  },
};
</script>
