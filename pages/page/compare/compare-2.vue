<template>
  <Header />
  <div>
    <WidgetsBreadcrumbs title="Comapre" />
    <section class="compare-section section-b-space ratio_asos">
      <div class="container">
        <div class="row">
          <div class="col-12" v-if="compare.length">
            <swiper
              :breakpoints="swiperOption.breakpoints"
              :slidesPerView="4"
              class="swiper-wrapper"
            >
              <swiper-slide
                class="swiper-slide"
                v-for="(item, index) in compare"
                :key="index"
              >
                <div class="compare-part">
                  <button
                    type="button"
                    class="close-btn"
                    @click="removeCompareItem(item)"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                  <div class="img-secton">
                    <div>
                      <img
                        :src="getImgUrl(item.images[0].src)"
                        class="img-fluid"
                        alt="image"
                      />
                    </div>
                    <a href="#">
                      <h5>{{ item.title }}</h5>
                    </a>
                    <h5>
                      {{ item.price * curr.curr || currency(curr.symbol) }}
                    </h5>
                  </div>
                  <div class="detail-part">
                    <div class="title-detail">
                      <h5>description</h5>
                    </div>
                    <div class="inner-detail">
                      <p>{{ item.description }}</p>
                    </div>
                  </div>
                  <div class="detail-part">
                    <div class="title-detail">
                      <h5>Brand Name</h5>
                    </div>
                    <div class="inner-detail">
                      <p>{{ item.brand }}</p>
                    </div>
                  </div>
                  <div class="detail-part" v-if="item.variants[0].color">
                    <div class="title-detail">
                      <h5>color</h5>
                    </div>
                    <div class="inner-detail">
                      <p>
                        <span
                          v-for="(variant, variantIndex) in Color(
                            item.variants
                          )"
                          :key="variantIndex"
                          >{{ variant }}</span
                        >
                      </p>
                    </div>
                  </div>
                  <div class="detail-part">
                    <div class="title-detail">
                      <h5>availability</h5>
                    </div>
                    <div class="inner-detail">
                      <p>In stock</p>
                    </div>
                  </div>
                  <div class="btn-part">
                    <a
                      href="javascript:void(0)"
                      class="btn btn-solid"
                      @click="addToCart(item)"
                      >add to cart</a
                    >
                  </div>
                </div>
              </swiper-slide>
            </swiper>
          </div>
          <div class="col-12 empty-cart-cls text-center" v-if="!compare.length">
            <img
              src="/images/empty-compare.png"
              class="img-fluid"
              alt="empty cart"
            />
            <h3 class="mt-3">
              <strong>Your Compare List is Empty</strong>
            </h3>
            <div class="col-12">
              <nuxt-link :to="{ path: '/' }" class="btn btn-solid"
                >continue shopping</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <Footer />
</template>
<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { useCartStore } from "~~/store/cart";
import { useProductStore } from "~~/store/products";
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      swiperOption: {
        freeMode: false,
        breakpoints: {
          1199: {
            slidesPerView: 3,
          },
          991: {
            slidesPerView: 2,
          },
          420: {
            slidesPerView: 1,
          },
        },
      },
    };
  },
  computed: {
    compare() {
      return useProductStore().compareItems;
    },
    curr() {
      return useProductStore().changeCurrency;
    },
  },
  methods: {
    getImgUrl(path) {
      return "/images/" + path;
    },
    Color(variants) {
      const uniqColor = [];
      for (let i = 0; i < Object.keys(variants).length; i++) {
        if (uniqColor.indexOf(variants[i].color) === -1) {
          uniqColor.push(variants[i].color);
        }
      }
      return uniqColor;
    },
    removeCompareItem: function (product) {
      useProductStore().removeCompareItem(product);
    },
    addToCart: function (product) {
      useCartStore().addToCart(product);
    },
  },
};
</script>
