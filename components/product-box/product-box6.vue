<template>
  <div>
    <div class="img-wrapper">
      <div class="label-block">
        <span class="label4" v-if="product.sale">on sale</span>
      </div>
      <div class="front text-center">
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
        <a href="javascript:void(0)" title="Wishlist">
          <i
            class="ti-heart"
            aria-hidden="true"
            @click="addToWishlist(product)"
          ></i>
        </a>
        <a
          href="javascript:void(0)"
          title="Quick View"
          @click="showQuickview(product)"
          variant="primary"
        >
          <i class="ti-search" aria-hidden="true"></i>
        </a>
        <a
          href="javascript:void(0)"
          title="Comapre"
          @click="addToCompare(product)"
          variant="primary"
        >
          <i class="ti-reload" aria-hidden="true"></i>
        </a>
      </div>
      <div class="addtocart_btn">
        <button
          data-toggle="modal"
          data-target="#addtocart"
          class="add-button add_cart"
          @click="addToCart(product)"
        >
          add to cart
        </button>
      </div>
    </div>
    <div class="product-detail text-center">
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
import { mapState } from "pinia";
import { useProductStore } from "~~/store/products";
import { useCartStore } from "~~/store/cart";

export default {
  props: ["product", "index"],
  data() {
    return {
      imageSrc: "",
      quickviewProduct: {},
      compareProduct: {},
      showquickview: false,
      showCompareModal: false,
      cartval: false,
      variants: {
        productId: "",
        image: "",
      },
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
      this.$emit("opencartmodel", this.cartval);
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
