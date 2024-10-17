<template>
  <div>
    <WidgetsBreadcrumbs :title="productsStore.product.name?.[locale]" />
    <section class="section-b-space">
      <div class="collection-wrapper">
        <div class="container">
          <div class="row">
            <div class="col-lg-3">
              <WidgetsProductSidebar />
            </div>
            <div class="col-lg-9 col-sm-12 col-xs-12 productDetail">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-lg-6">
                    <ProductImage :data="selectedDetail" />
                  </div>
                  <div class="col-lg-6 rtl-text">
                    <div v-if="selectedDetail" class="product-right">
                      <h2>{{ productsStore.product.name?.[locale] }}</h2>
                      <h4 v-if="selectedDetail?.sale">
                        <del>
                          {{ (selectedDetail?.price).toFixed(2) }}
                        </del>
                        <span>{{ selectedDetail.sale }}% off</span>
                      </h4>
                      <h3 v-if="selectedDetail?.sale">
                        {{
                          (selectedDetail?.price *
                            (100 - selectedDetail.sale)) /
                          100
                        }}
                      </h3>
                      <h3 v-else>
                        {{ (selectedDetail?.price).toFixed(2) }}
                      </h3>
                      <ul class="color-variant">
                        <li
                          v-for="(detail, index) in productsStore.product
                            .product_details"
                          :key="index"
                          v-bind:class="{
                            active: selectedDetail.color.id === detail.color.id,
                          }"
                          class="border border-gray-400"
                        >
                          <a
                            v-bind:style="{
                              'background-color': `#${detail.color.code}`,
                            }"
                            @click="changeProductDetail(detail)"
                          ></a>
                        </li>
                      </ul>
                      <div class="product-description border-product">
                        <h6 class="product-title size-text">
                          {{ t("selectSize") }}
                          <span>
                            <a
                              href="javascript:void(0)"
                              data-bs-toggle="modal"
                              data-bs-target="#modal-1"
                            >
                              {{ t("sizeChart") }}
                            </a>
                          </span>
                        </h6>
                        <div class="size-box">
                          <ul>
                            <li
                              v-bind:class="{
                                active: selectedSize?.size.id == size.size.id,
                              }"
                              class="product-title"
                              v-for="(size, index) in selectedDetail.sizes"
                              :key="index"
                            >
                              <a @click="changeSizeVariant(size)">
                                {{ size.size.name }}
                              </a>
                            </li>
                          </ul>
                        </div>
                        <h5
                          class="availability"
                          v-if="selectedSize && selectedSize.quantity > 0"
                        >
                          <span>
                            {{
                              t("inStock", { number: selectedSize.quantity })
                            }}
                          </span>
                        </h5>
                        <h5
                          class="availability"
                          v-if="selectedSize && selectedSize.quantity === 0"
                        >
                          <span>{{ t("outOfStock") }}</span>
                        </h5>
                        <div v-if="selectedSize" class="qty-box">
                          <h6 class="product-title">{{ t("quantity") }}</h6>
                          <div class="input-group ml-4">
                            <span class="input-group-prepend">
                              <button
                                type="button"
                                class="btn quantity-left-minus"
                                data-type="minus"
                                data-field
                                @click="decrement()"
                              >
                                <i class="ti-angle-left"></i>
                              </button>
                            </span>
                            <input
                              type="text"
                              name="quantity"
                              class="form-control input-number"
                              :disabled="counter > selectedSize?.quantity"
                              v-model="counter"
                            />
                            <span class="input-group-prepend">
                              <button
                                type="button"
                                class="btn quantity-right-plus"
                                data-type="plus"
                                data-field
                                @click="increment()"
                              >
                                <i class="ti-angle-right"></i>
                              </button>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="product-buttons">
                        <nuxt-link :to="{ path: '/page/account/cart' }">
                          <button class="btn btn-solid" title="Add to cart">
                            {{ t("addToCart") }}
                          </button>
                        </nuxt-link>
                        <button class="btn btn-solid ml-4" title="buy now">
                          {{ t("buyNow") }}
                        </button>
                      </div>
                      <div class="border-product">
                        <h6 class="product-title">
                          {{ t("productDetails") }}
                        </h6>
                        <p>
                          {{
                            productsStore.product.description?.[
                              locale
                            ].substring(0, 200) + "...."
                          }}
                        </p>
                      </div>
                      <div class="border-product">
                        <h6 class="product-title">{{ t("shareIt") }}</h6>
                        <div class="product-icon">
                          <ul class="product-social">
                            <li>
                              <a href="javascript:void(0)">
                                <i class="fa fa-facebook"></i>
                              </a>
                            </li>
                            <li>
                              <a href="javascript:void(0)">
                                <i class="fa fa-twitter"></i>
                              </a>
                            </li>
                            <li>
                              <a href="javascript:void(0)">
                                <i class="fa fa-instagram"></i>
                              </a>
                            </li>
                            <li>
                              <a href="javascript:void(0)">
                                <i class="fa fa-telegram"></i>
                              </a>
                            </li>
                          </ul>
                          <form class="d-inline-block">
                            <button
                              class="wishlist-btn"
                              @click="addToWishlist()"
                            >
                              <i class="fa fa-heart"></i>
                              <span class="title-font">{{
                                t("addToWishlist")
                              }}</span>
                            </button>
                          </form>
                        </div>
                      </div>
                      <!-- <div class="border-product">
                        <h6 class="product-title">{{ t("timeReminder") }}</h6>
                        <WidgetsTimer date="December 30, 2023" />
                      </div> -->
                    </div>
                  </div>
                </div>
              </div>
              <section class="tab-product m-0">
                <div class="row">
                  <div class="col-sm-12 col-lg-12">
                    <ul
                      class="nav nav-tabs nav-material"
                      id="top-tab"
                      role="tablist"
                    >
                      <li class="nav-item">
                        <a
                          class="nav-link active"
                          id="top-home-tab"
                          data-bs-toggle="tab"
                          href="#top-home"
                          role="tab"
                          aria-selected="true"
                          ><i class="icofont icofont-ui-home"></i>Details</a
                        >
                        <div class="material-border"></div>
                      </li>
                    </ul>
                    <div class="tab-content nav-material" id="top-tabContent">
                      <div
                        class="tab-pane fade show active"
                        id="top-home"
                        role="tabpanel"
                        aria-labelledby="top-home-tab"
                      >
                        <div class="product-tab-description">
                          <div
                            v-html="productsStore.product.content?.[locale]"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <!-- <WidgetsRelatedProducts
        :productTYpe="productTYpe"
        :productId="productId"
      /> -->
      <div
        class="modal fade"
        id="modal-1"
        aria-hidden="true"
        tabindex="-1"
        role="dialog"
        aria-labelledby="modal-cartLabel"
      >
        <div class="modal-dialog modal-md modal-dialog-centered">
          <div class="modal-content">
            <div class="row">
              <div>
                <img
                  src="/images/size-chart.jpg"
                  alt="size-chart"
                  class="img-fluid size-chart"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";

import ProductImage from "../../components/product/image.vue";

import { useRoute } from "vue-router";

import { useProductsStore } from "../../store/newProducts";

import type { IProductDetail } from "../../types/product";
import type { ISize } from "../../types/size";

interface ISizeBody {
  quantity: number;
  size: ISize;
}

const { t, locale } = useI18n();
const route = useRoute();

const productsStore = useProductsStore();

const selectedDetail = ref<IProductDetail>();
const selectedSize = ref<ISizeBody>();
const counter = ref(1);

onMounted(() => {
  productsStore.getProductById(route.params.id.toString()).then((res) => {
    selectedDetail.value = res.product_details[0];
  });
});

function changeProductDetail(el: IProductDetail) {
  selectedDetail.value = el;
}

function changeSizeVariant(el: ISizeBody) {
  selectedSize.value = el;
}

function decrement() {
  if (counter.value > 0) counter.value--;
}

function increment() {
  if (selectedSize.value && selectedSize.value?.quantity > counter.value)
    counter.value++;
}

function addToWishlist() {
  console.log("added to the wishlist");
}
</script>
<!-- <script>
import { mapState } from "pinia";
import { useProductStore } from "~~/store/products";
import { useCartStore } from "~~/store/cart";

export default {
  data() {
    return {
      slideId: 0,
      counter: 1,
      activeColor: "",
      selectedSize: "",
      qty: "",
      size: [],
      productTYpe: "",
      productId: "",
    };
  },
  computed: {
    ...mapState(useProductStore, {
      currency: "currency",
    }),

    curr() {
      return useProductStore().changeCurrency;
    },
    getDetail: function () {
      return useProductStore().getProductById(this.$route.params.id);
    },
  },

  methods: {
    onSwiper(swiper) {
      this.swiper = swiper;
    },
    priceCurrency: function () {
      useProductStore().changeCurrency();
    },
    addToWishlist: function (product) {
      useProductStore().addToWishlist(product);
    },
    discountedPrice(product) {
      const price =
        (product.price - (product.price * product.discount) / 100) *
        this.curr.curr;
      return price;
    },
    // Related Products display
    relatedProducts() {
      this.productTYpe = this.getDetail.type;
      this.productId = this.getDetail.id;
    },
    // Display Unique Color
    Color(variants) {
      const uniqColor = [];
      for (let i = 0; i < Object.keys(variants).length; i++) {
        if (uniqColor.indexOf(variants[i].color) === -1) {
          uniqColor.push(variants[i].color);
        }
      }
      return uniqColor;
    },
    // add to cart
    addToCart: function (product, qty) {
      product.quantity = qty || 1;
      useCartStore().addToCart(product);
    },
    buyNow: function (product, qty) {
      product.quantity = qty || 1;
      useCartStore().addToCart(product);
      this.$router.push("/page/account/checkout");
    },
    // Item Count
    increment() {
      this.counter++;
    },
    decrement() {
      if (this.counter > 1) this.counter--;
    },
    // Change size variant
    changeSizeVariant(variant) {
      this.selectedSize = variant;
    },
    getImgUrl(path) {
      return "/images/" + path;
    },
    slideTo(id) {
      this.swiper.slideTo(id);

      this.slideId = id;
    },

    sizeVariant(id, slideId, color) {
      this.swiper.slideTo(slideId);
      this.size = [];
      this.activeColor = color;
      this.getDetail.variants.filter((item) => {
        if (id === item.image_id) {
          this.size.push(item.size);
        }
      });
    },
  },
  mounted() {
    // For displaying default color and size on pageload
    this.uniqColor = this.getDetail.variants[0].color;
    this.sizeVariant(this.getDetail.variants[0].image_id);
    // Active default color
    this.activeColor = this.uniqColor;
    this.changeSizeVariant(this.getDetail.variants[0].size);
    // related product type
    this.relatedProducts();
  },
};
</script> -->
