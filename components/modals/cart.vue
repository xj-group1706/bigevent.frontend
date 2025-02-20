<template>
  <modal @onClose="onClose">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-5">
        <product-image :data="selectedDetail" />
        <nuxt-link :to="localePath(`/products/${product.id}`)">
          <button class="btn btn-sm w-full mt-4" :title="t('addToCart')">
            {{ t("fullProductInformation") }}
            <i class="ml-4 fa fa-long-arrow-right"></i>
          </button>
        </nuxt-link>
      </div>
      <div class="col-span-7">
        <h2 class="uppercase text-xl">{{ product.name?.[locale] }}</h2>
        <div class="border border-b-2 my-6" />
        <div class="my-2">
          <div>
            {{ t("color") }}: <b>{{ selectedDetail?.color.name?.[locale] }}</b>
          </div>
          <div class="flex items-center justify-start gap-2">
            <div
              v-for="(detail, index) in product.product_details"
              :key="index"
              class="border p-1"
              :class="
                selectedDetail?.color.id === detail.color.id
                  ? '!border-gray-800 border-2'
                  : 'cursor-pointer'
              "
              @click="changeProductDetail(detail)"
            >
              <div
                class="w-10 h-20"
                v-bind:style="{
                  'background-color': `#${detail.color.code}`,
                }"
              />
            </div>
          </div>
        </div>
        <div class="my-4">
          <div v-if="selectedSize">
            {{ t("size") }}: <b>{{ selectedSize?.size.name }}</b>
          </div>
          <div class="flex items-center justify-start gap-2">
            <div
              v-for="(size, index) in selectedDetail?.sizes"
              :key="index"
              class="border p-1 w-10 h-10 text-center content-center"
              :class="
                selectedSize?.size.id === size.size.id
                  ? '!border-gray-800 border-2'
                  : size.quantity === 0
                  ? '!border-dashed'
                  : 'cursor-pointer'
              "
              @click="changeSelectedSize(size)"
            >
              <span :class="size.quantity === 0 ? 'cross-line' : ''">
                {{ size.size.name }}
              </span>
            </div>
          </div>
        </div>
        <div class="my-4">
          <div>{{ t("quantity") }}:</div>
          <qty-box v-model="quantity" :max="selectedSize?.quantity || 1" />
        </div>
        <div class="my-4 flex items-start gap-2">
          <div class="text-lg font-bold">
            {{ priceFormatter(productPrice) }}
          </div>
          <div class="mt-1" v-if="selectedDetail?.sale">
            <del>
              {{ priceFormatter(selectedDetail.price) }}
            </del>
            <span class="ml-2 text-color">{{ selectedDetail.sale }}%</span>
          </div>
        </div>
        <div class="my-4">
          <button class="btn btn-solid w-full rounded" :title="t('addToCart')">
            {{ t("addToCart") }}
          </button>
        </div>
      </div>
    </div>
  </modal>
</template>
<script lang="ts" setup>
import { onMounted, ref, computed } from "vue";
import { useI18n } from "vue-i18n";

import modal from "../ui/modal.vue";
import ProductImage from "../product/image.vue";
import QtyBox from "../product/qty-box.vue";

import { STATUS } from "../../utils/constants";

import type { IProduct, IProductDetail } from "../../types/product";
import type { ISizeBody } from "../../types/size";
import { priceFormatter } from "../../utils/tools";

const props = defineProps<{
  modelValue: Boolean;
  product: IProduct;
}>();

const emits = defineEmits(["update:modelValue", "onClose"]);

const { t, locale } = useI18n();
const localePath = useLocalePath();

const selectedDetail = ref<IProductDetail>();
const selectedSize = ref<ISizeBody>();
const quantity = ref(1);

onMounted(() => {
  if (props.product.product_details.length > 0) {
    selectedDetail.value = props.product.product_details[0];
    const foundSize = props.product.product_details[0].sizes.find((el) => {
      if (el.quantity > 0) return el;
    });
    if (foundSize) {
      selectedSize.value = {
        quantity: foundSize.quantity,
        size: foundSize.size,
      };
    }
  }
});

const productPrice = computed(() => {
  if (selectedDetail.value && selectedDetail.value.sale) {
    return (
      (selectedDetail.value.price * (100 - selectedDetail.value.sale)) / 100
    );
  }
  return selectedDetail.value?.price;
});

function changeProductDetail(detail: IProductDetail) {
  selectedDetail.value = detail;
}

function changeSelectedSize(el: ISizeBody) {
  selectedSize.value = {
    quantity: el.quantity,
    size: el.size,
  };
}

function onClose(e: string) {
  emits("update:modelValue", false);
  emits("onClose", STATUS.CANCELLED);
}
</script>
<style lang="scss" scoped>
.cross-line {
  position: relative;

  &:after {
    content: "";
    position: absolute;
    height: 90%;
    width: 1px;
    background-color: red;
    transform: rotate(-20deg);
    top: 1px;
    left: 3px;
  }
}
</style>
