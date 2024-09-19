<template>
  <div>
    <div class="title1 section-t-space">
      <h4>{{ $t("exclusiveProducts") }}</h4>
      <h2 class="title-inner1">{{ $t("specialProducts") }}</h2>
    </div>

    <section class="section-b-space pt-0 ratio_asos">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="theme-tab">
              <div class="tabs">
                <div class>
                  <ul class="nav nav-tabs" id="top-tab" role="tablist">
                    <li
                      class="nav-items"
                      v-for="(direction, index) in homeStore.directions"
                      :key="index"
                    >
                      <div
                        class="nav-link active !border-none"
                        :class="direction.id === 1 ? 'text-color' : ''"
                        data-bs-toggle="tab"
                      >
                        {{ direction.name[locale] }}
                      </div>
                    </li>
                  </ul>
                </div>

                <div class="tab-content" id="top-tabContent">
                  <div id="new" class="tab-pane fade show active">
                    <div class="no-slider">
                      <div class="row g-sm-4 g-3">
                        <div
                          class="col-xxl-3 col-md-4 col-6"
                          v-for="(product, index) in products"
                          :key="index"
                        >
                          <div class="product-box">
                            <CardProduct :product="product" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

import { useHomeStore } from "../../store/home";
import type { IProduct } from "../../types/product";

const { locale } = useI18n();
const homeStore = useHomeStore();

const props = defineProps<{
  products: IProduct[];
}>();
</script>

<style scoped>
.text-color {
  @apply !text-[var(--theme-default)];
}
</style>
