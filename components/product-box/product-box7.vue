<template>
  <div>
    <div class="img-wrapper">
      <div class="ribbon" v-if="product.new"><span>new</span></div>
      <div class="front">
        <nuxt-link :to="{ path: '/product/sidebar/' + product.id }">
          <img
            :src="getImgUrl(product.images[0].src)"
            :id="product.id"
            class="img-fluid bg-img"
            :alt="product.title"
            :key="index"
          />
        </nuxt-link>
      </div>
      <div class="cart-info cart-wrap">
        <a href="javascript:void(0)" title="Add to Wishlist" tabindex="0">
          <i
            class="fa fa-heart"
            aria-hidden="true"
            @click="addToWishlist(product)"
          ></i>
        </a>
        <button
          data-toggle="modal"
          data-target="#addtocart"
          title="Add to cart"
          @click="addToCart(product)"
          variant="primary"
        >
          <i class="ti-shopping-cart"></i> Add to cart
        </button>
        <a
          href="javascript:void(0)"
          title="Comapre"
          @click="addToCompare(product)"
          variant="primary"
        >
          <i class="fa fa-refresh" aria-hidden="true"></i>
        </a>
        <a
          class="mobile-quick-view"
          title="Quick View"
          @click="showQuickview(product)"
          variant="primary"
        >
          <i class="ti-search" aria-hidden="true"></i>
        </a>
      </div>
      <div class="quick-view-part">
        <a
          href="javascript:void(0)"
          title="Quick View"
          @click="showQuickview(product)"
          variant="primary"
        >
          <i class="ti-search" aria-hidden="true"></i>
        </a>
      </div>
    </div>
    <div class="product-info">
      <div class="rating">
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
      </div>
      <nuxt-link :to="{ path: '/product/sidebar/' + product.id }">
        <h6>{{ product.title }}</h6>
      </nuxt-link>
      <p>{{ product.description }}</p>
      <h4 v-if="product.sale">
        {{ curr.symbol }}{{ discountedPrice(product) }}
        <del>{{ (product.price * curr.curr).toFixed(2) }}</del>
      </h4>
      <h4 v-else>
        {{ curr.symbol }}{{ (product.price * curr.curr).toFixed(2) }}
      </h4>
    </div>
  </div>
</template>
<script>
import { useCartStore } from "~~/store/cart";
import { useProductStore } from "~~/store/products";
import { mapState } from "pinia";
export default {
  props: ["product", "index"],
  data() {
    return {
      quickviewProduct: {},
      compareProduct: {},
      cartProduct: {},
      showquickview: false,
      showCompareModal: false,
      cartval: false,
      dismissSecs: 5,
      dismissCountDown: 0,
    };
  },
  computed: {
    ...mapState(useProductStore, {
      productslist: "productslist",
    }),
    curr() {
      return useProductStore().changeCurrency;
    },
  },
  methods: {
    getImgUrl(path) {
      return "/images/" + path;
    },
    addToCart: function (product) {
      this.cartval = true;
      this.cartProduct = product;
      this.$emit("opencartmodel", this.cartval, this.cartProduct);
      useCartStore().addToCart(product);
    },
    addToWishlist: function (product) {
      this.dismissCountDown = this.dismissSecs;
      useNuxtApp().$showToast({
        msg: "Product Is successfully added to your wishlist.",
        type: "info",
      });
      useProductStore().addToWishlist(product);
    },
    showQuickview: function (productData) {
      this.showquickview = true;
      this.quickviewProduct = productData;
      this.$emit("openquickview", this.showquickview, this.quickviewProduct);
    },
    addToCompare: function (product) {
      this.showCompareModal = true;
      this.compareProduct = product;
      this.$emit(
        "showCompareModal",
        this.showCompareModal,
        this.compareProduct
      );
      useProductStore().addToCompare(product);
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
      this.$emit("alertseconds", this.dismissCountDown);
    },
    discountedPrice(product) {
      const price =
        (product.price - (product.price * product.discount) / 100) *
        this.curr.curr;
      return price;
    },
  },
};
</script>
