<template>
  <div>
    <div class="row">
      <div class="col-xl-12">
        <div class="filter-main-btn" @click="filter = !filter">
          <button class="filter-btn btn btn-theme">
            <i class="fa fa-filter" aria-hidden="true"></i> {{ t("filter") }}
          </button>
        </div>
      </div>
    </div>
    <div class="collection-filter" :class="filter ? 'openFilterbar' : ''">
      <div class="collection-filter-block">
        <!-- brand filter start -->
        <div class="collection-mobile-back">
          <span class="filter-back" @click="filter = !filter">
            <i class="fa fa-angle-left" aria-hidden="true"></i> {{ t("back") }}
          </span>
        </div>
        <div class="collection-collapse-block open">
          <h3
            class="collapse-block-title"
            @click="isCategoryList = !isCategoryList"
          >
            {{ t("category") }}
          </h3>

          <div
            class="collection-collapse-block-content"
            :style="{ display: isCategoryList ? 'block' : 'none' }"
          >
            <div class="collection-brand-filter">
              <ul class="category-list">
                <li class="cursor-pointer" @click="getCategoryFilter()">
                  <div :class="filterParams.category === 0 ? 'text-color' : ''">
                    {{ t("allProducts") }}
                  </div>
                </li>
                <li
                  v-for="(direction, index) in homeStore.directions"
                  :key="index"
                  class="cursor-pointer"
                  @click="getCategoryFilter(direction.id)"
                >
                  <div
                    :class="
                      filterParams.category === direction.id ? 'text-color' : ''
                    "
                  >
                    {{ direction.name[locale] }}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- side-bar colleps block stat -->
      <div class="collection-filter-block">
        <!-- brand filter start -->
        <div class="collection-collapse-block open">
          <h3 class="collapse-block-title" @click="isBrandList = !isBrandList">
            {{ t("brand") }}
          </h3>
          <div
            class="collection-collapse-block-content"
            :style="{ display: isBrandList ? 'block' : 'none' }"
          >
            <div class="collection-brand-filter">
              <div
                class="form-check collection-filter-checkbox"
                v-for="(brand, index) in productsStore.brands"
                :key="index"
              >
                <input
                  type="checkbox"
                  class="form-check-input"
                  :value="brand.id"
                  :id="`${brand.id}`"
                  v-model="filterParams.brands"
                  @change="onChange()"
                />
                <label class="form-check-label" v-bind:for="`${brand.id}`">{{
                  brand.name
                }}</label>
              </div>
            </div>
          </div>
        </div>

        <!-- color filter start here -->
        <div class="collection-collapse-block open">
          <h3 class="collapse-block-title" @click="isColorList = !isColorList">
            {{ t("colors") }}
          </h3>
          <div
            class="collection-collapse-block-content"
            :style="{ display: isColorList ? 'block' : 'none' }"
          >
            <div class="collection-brand-filter color-filter">
              <div
                class="custom-control custom-checkbox collection-filter-checkbox p-0"
                v-for="(color, index) in productsStore.colors"
                :key="index"
              >
                <input
                  type="checkbox"
                  class="custom-control-input form-check-input"
                  :value="color.id"
                  :id="`${color.id}`"
                  v-model="filterParams.colors"
                  @change="onChange()"
                />
                <span
                  v-bind:style="{ 'background-color': `#${color.code}` }"
                ></span>
                <label
                  class="custom-control-label p-0"
                  :class="{ selected: isActiveColor(color.id) }"
                  v-bind:for="`${color.id}`"
                  >{{ color.name[locale] }}</label
                >
              </div>
            </div>
          </div>
        </div>

        <!-- size filter start here -->
        <div class="collection-collapse-block border-0 open">
          <h3 class="collapse-block-title" @click="isSizeList = !isSizeList">
            {{ t("size") }}
          </h3>
          <div
            class="collection-collapse-block-content"
            :style="{ display: isSizeList ? 'block' : 'none' }"
          >
            <div class="color-selector">
              <div class="collection-brand-filter">
                <!-- <div>{{ t("womanSizes") }}</div> -->
                <div
                  class="custom-control p-0 custom-checkbox collection-filter-checkbox"
                  v-for="(size, index) in productsStore.sizesForWomen"
                  :key="index"
                >
                  <input
                    type="checkbox"
                    class="custom-control-input form-check-input"
                    :value="size.id"
                    :id="`${size.id}`"
                    v-model="filterParams.sizes"
                    @change="onChange()"
                  />
                  <label class="custom-control-label" v-bind:for="`${size.id}`">
                    {{ size.name }}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";

import { useHomeStore } from "../../store/home";
import { useProductsStore } from "../../store/newProducts";

import type { IProductFilter } from "../../types/index";

const props = defineProps<{
  modelValue: IProductFilter;
}>();
const emits = defineEmits(["update:modelValue"]);

const { t, locale } = useI18n();
const homeStore = useHomeStore();
const productsStore = useProductsStore();

const filter = ref(false);
const isCategoryList = ref(false);
const isColorList = ref(false);
const isBrandList = ref(false);
const isSizeList = ref(false);
const isPriceList = ref(false);
const filterParams = ref<IProductFilter>(props.modelValue);

function getCategoryFilter(item?: number) {
  filterParams.value.category = item ? item : 0;
  onChange();
}

function isActiveColor(id: number) {
  return filterParams.value.colors.indexOf(id) > -1;
}
function onChange() {
  emits("update:modelValue", filterParams.value);
}
</script>
<style scoped></style>
