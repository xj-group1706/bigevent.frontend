<template>
  <div class="img-wrapper">
    <div class="label-block">
      <span class="label3" v-if="product.new">new</span>
      <span class="label4" v-if="product.sale">on sale</span>
    </div>
    <div class="front">
      <nuxt-link :to="{ path: '/product/sidebar/' + product.id }">
        <img
          :src="getImgUrl(imageSrc ? imageSrc : product.images[0].src)"
          :id="product.id"
          class="img-fluid bg-img media"
          :alt="product.title"
          :key="index"
        />
      </nuxt-link>
    </div>
    <div class="back" v-if="product.images.length > 1">
      <nuxt-link :to="{ path: '/product/sidebar/' + product.id }">
        <img
          :src="getImgUrl(imageSrc ? imageSrc : product.images[1].src)"
          :key="index"
          :id="product.id"
          alt=""
          class="img-fluid m-auto media"
        />
      </nuxt-link>
    </div>
    <ul class="product-thumb-list">
      <li
        class="grid_thumb_img"
        :class="{ active: imageSrc === image.src }"
        v-for="(image, index) in product.images"
        :key="index"
        @click="productVariantChange(image.src)"
      >
        <a href="javascript:void(0);">
          <img :src="getImgUrl(image.src)" />
        </a>
      </li>
    </ul>
    <div class="cart-info cart-wrap">
      <button
        data-toggle="modal"
        data-target="#modal-cart"
        title="Add to cart"
        @click="addToCart(product)"
        variant="primary"
      >
        <i class="ti-shopping-cart"></i>
      </button>
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
        @click.prevent="addToCompare(product)"
        variant="primary"
      >
        <i class="ti-reload" aria-hidden="true"></i>
      </a>
    </div>
  </div>
  <div class="product-detail">
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

      <del>{{ curr.symbol }}{{ (product.price * curr.curr).toFixed(2) }}</del>
    </h4>
    <h4 v-else>
      {{ curr.symbol }}{{ (product.price * curr.curr).toFixed(2) }}
    </h4>
    <ul class="color-variant" v-if="product.variants[0].color">
      <li
        v-for="(variant, variantIndex) in Color(product.variants)"
        :key="variantIndex"
      >
        <a
          @click="productColorchange(variant, product)"
          :class="[variant]"
          v-bind:style="{ 'background-color': variant }"
        ></a>
      </li>
    </ul>
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
      symbol: "$",
      imageSrc: "",
      quickviewProduct: {},
      compareProduct: {},
      cartProduct: {},
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
  emits: ["opencartmodel", "openquickview", "alertseconds", "showCompareModal"],
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
    Color(variants) {
      const uniqColor = [];
      for (let i = 0; i < Object.keys(variants).length; i++) {
        if (uniqColor.indexOf(variants[i].color) === -1) {
          uniqColor.push(variants[i].color);
        }
      }
      return uniqColor;
    },
    productColorchange(color, product) {
      product.variants.map((item) => {
        if (item.color === color) {
          product.images.map((img) => {
            if (img.image_id === item.image_id) {
              this.imageSrc = img.src;
            }
          });
        }
      });
    },
    productVariantChange(imgsrc) {
      this.imageSrc = imgsrc;
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
