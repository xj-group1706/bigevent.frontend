<template>
  <div>
    <div class="title1 title-gradient section-t-space">
      <h4>{{ subtitle }}</h4>
      <h2 class="title-inner1">{{ title }}</h2>
    </div>
    <section class="pt-0 section-b-space gym-product ratio_square">
      <div class="container">
        <div class="row partition-cls">
          <div
            class="col-xl-3 col-sm-6"
            v-for="(product, index) in products.slice(0, 8)"
            :key="index"
          >
            <div class="product-box">
              <ProductBoxProductBox9
                @opencartmodel="showCartModal"
                @showCompareModal="showcomparemodal"
                @openquickview="showquickview"
                @alertseconds="alert"
                :product="product"
                :index="index"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: ["products"],
  components: {},
  data() {
    return {
      title: "top collection",
      subtitle: "special offer",
      showCart: false,
      showquickviewmodel: false,
      showcomapreModal: false,
      quickviewproduct: {},
      comapreproduct: {},
      dismissSecs: 5,
      dismissCountDown: 0,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.",
    };
  },
  methods: {
    alert(item) {
      this.dismissCountDown = item;
    },
    showCartModal(item, productData) {
      this.showCart = item;
      this.$emit("openCart", this.showCart);
    },
    showquickview(item, productData) {
      this.showquickviewmodel = item;
      this.quickviewproduct = productData;
      this.$emit(
        "openQuickview",
        this.showquickviewmodel,
        this.quickviewproduct
      );
    },
    showcomparemodal(item, productData) {
      this.showcomapreModal = item;
      this.comapreproduct = productData;
      this.$emit("openCompare", this.showcomapreModal, this.comapreproduct);
    },
  },
};
</script>
