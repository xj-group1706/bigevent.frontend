<template>
  <div>
    <section class="blog ratio3_2">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="title2">
              <h4>{{ subtitle }}</h4>
              <h2 class="title-inner2">{{ title }}</h2>
            </div>
            <swiper
              :breakpoints="swiperOption.breakpoints"
              :slidesPerView="3"
              :spaceBetween="10"
              class="swiper-wrapper"
            >
              <swiper-slide
                class="swiper-slide"
                v-for="(blog, index) in blog"
                :key="index"
              >
                <a href="#">
                  <div class="classic-effect">
                    <div>
                      <img :src="getImgUrl(blog.img)" class="img-fluid" alt />
                    </div>
                    <span></span>
                  </div>
                </a>
                <div class="blog-details">
                  <h4>{{ blog.date }}</h4>
                  <a href="#">
                    <p>{{ blog.title }}</p>
                  </a>
                  <hr class="style1" />
                  <h6>by: {{ blog.author }} , 2 Comment</h6>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

export default {
  components: { Swiper, SwiperSlide },
  props: ["blog"],
  data() {
    return {
      title: "Latest blog",
      subtitle: "recent story",
      swiperOption: {
        breakpoints: {
          1199: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          991: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          420: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          0: {
            slidesPerView: 2,
          },
        },
      },
    };
  },

  methods: {
    getImgUrl(path) {
      return path;
    },
  },
};
</script>
