<template>
  <div>
    <Header />
    <WidgetsBreadcrumbs title="Banner Element" />
    <section class="pt-0">
      <div
        class="full-banner parallax text-center p-left"
        v-bind:style="{ 'background-image': `url(${imagepath})` }"
      >
        <img :src="imagepath" alt class="bg-img d-none" />
        <div class="container">
          <div class="row">
            <div class="col">
              <div class="banner-contain">
                <h2>{{ title }}</h2>
                <h3>{{ subtitle }}</h3>
                <h4>{{ text }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section-b-space">
      <div class="container">
        <div
          class="row banner-timer"
          v-bind:style="{ 'background-image': 'url(' + imagepath2 + ')' }"
        >
          <div class="col-md-6">
            <div class="banner-text">
              <h2 v-html="offer_text"></h2>
            </div>
          </div>
          <div class="col-md-6">
            <div class="timer-box">
              <WidgetsTimer date="April 15, 2024"></WidgetsTimer>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <Footer />
</template>
<script type="text/javascript">
export default {
  components: {},
  data() {
    return {
      imagepath: "/images/parallax/1.jpg",
      title: "2019",
      subtitle: "fashion trends",
      text: "special offer",
      imagepath2: "/images/offer-banner.jpg",
      offer_text: "Save <span>30% off</span> Digital Watch",
    };
  },
};
</script>
