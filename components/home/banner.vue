<template>
  <div>
    <!-- Home slider -->
    <section class="p-0">
      <div class="slide-1 home-slider">
        <swiper
          :loop="true"
          :navigation="true"
          :modules="modules"
          class="swiper-wrapper"
        >
          <swiper-slide
            class="swiper-slide"
            v-for="(item, index) in directoryStore.directions"
            :key="index"
          >
            <div
              class="home text-center"
              v-bind:style="{
                'background-image': 'url(' + imageUrl + item.banner.url + ')',
              }"
            >
              <div class="container">
                <div class="row">
                  <div class="col">
                    <div class="slider-contain justify-start">
                      <div>
                        <h2 class="sm:text-4xl text-2xl font-bold mb-6">
                          {{ item.name[locale] }}
                        </h2>
                        <p
                          class="sm:text-lg text-base text-center text-gray-200"
                        >
                          {{ item.description[locale] }}
                        </p>
                        <nuxt-link
                          :to="{ path: '/collection/leftsidebar/all' }"
                          class="btn btn-solid"
                          >shop now</nuxt-link
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { useI18n } from "vue-i18n";
import { useDirectoryStore } from "./../../store/directory";

const directoryStore = useDirectoryStore();
const { locale } = useI18n();

const config = useRuntimeConfig();
const imageUrl = config.public.imageUrl;

const modules = [Navigation];
</script>
