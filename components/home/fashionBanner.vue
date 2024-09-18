<template>
  <div>
    <section class="p-0">
      <div
        class="full-banner parallax text-center p-left"
        v-bind:style="{
          'background-image': `url(${getImageUrl(
            homeStore.fashionBanner?.media.url
          )})`,
        }"
      >
        <nuxt-img
          :src="getImageUrl(homeStore.fashionBanner?.media.url)"
          :alt="homeStore.fashionBanner?.media.name"
          class="d-none"
        />
        <div class="container">
          <div class="row">
            <div class="col">
              <div class="banner-contain">
                <h2>{{ homeStore.fashionBanner?.title[locale] }}</h2>
                <h3>{{ homeStore.fashionBanner?.subtitle[locale] }}</h3>
                <h4>{{ homeStore.fashionBanner?.text[locale] }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";

import { useHomeStore } from "../../store/home";
import { getImageUrl } from "../../utils/tools";

const { locale } = useI18n();
const homeStore = useHomeStore();
</script>
