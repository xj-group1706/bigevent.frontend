<template>
  <div>
    <footer class="footer-light">
      <div class="light-layout">
        <div class="container">
          <section class="small-section border-section border-top-0">
            <div class="row">
              <div class="col-lg-6">
                <div class="subscribe">
                  <div>
                    <h4>KNOW IT ALL FIRST!</h4>
                    <p>
                      Never Miss Anything From bigEVENT By Signing Up To Our
                      Newsletter.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <form
                  class="form-inline subscribe-form auth-form needs-validation"
                  method="post"
                  id="mc-embedded-subscribe-form"
                  name="mc-embedded-subscribe-form"
                  target="_blank"
                >
                  <div class="form-group mx-sm-3">
                    <input
                      type="text"
                      class="form-control"
                      name="EMAIL"
                      id="mce-EMAIL"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <button type="submit" class="btn btn-solid" id="mc-submit">
                    subscribe
                  </button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
      <section class="section-b-space light-layout">
        <div class="container">
          <div class="row footer-theme partition-f">
            <div class="col-lg-4 col-md-6">
              <div class="footer-title footer-mobile-title">
                <h4>about</h4>
              </div>
              <div class="footer-content">
                <div class="footer-logo">
                  <img src="/images/logos/logo_line.png" alt="logo" />
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam,
                </p>
                <div class="footer-social">
                  <ul>
                    <li v-for="(social, index) in socials" :key="index">
                      <div
                        class="cursor-pointer"
                        @click="openInNewTab(social.url)"
                      >
                        <i :class="social.icon" aria-hidden="true"></i>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col offset-xl-1">
              <div class="sub-title">
                <div class="footer-title">
                  <h4>{{ t("myAccount") }}</h4>
                </div>
                <div class="footer-content">
                  <ul>
                    <li>
                      <nuxt-link :to="localePath('/products')">
                        {{ t("products") }}
                      </nuxt-link>
                    </li>
                    <li>
                      <nuxt-link :to="localePath('/companies')">
                        {{ t("companies") }}
                      </nuxt-link>
                    </li>
                    <li>
                      <nuxt-link :to="localePath('/blogs')">
                        {{ t("blogs") }}
                      </nuxt-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="sub-title">
                <div class="footer-title">
                  <h4>{{ $t("whyWeChoose") }}</h4>
                </div>
                <div class="footer-content">
                  <ul>
                    <li>
                      <a href="#">shipping & return</a>
                    </li>
                    <li>
                      <a href="#">secure shopping</a>
                    </li>
                    <li>
                      <a href="#">gallary</a>
                    </li>
                    <li>
                      <a href="#">affiliates</a>
                    </li>
                    <li>
                      <a href="#">contacts</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="sub-title">
                <div class="footer-title">
                  <h4>{{ t("storeInformation") }}</h4>
                </div>
                <div class="footer-content">
                  <ul class="contact-list">
                    <li>
                      <i class="fa fa-map-marker"></i>Tashkent, Uzbekistan
                    </li>
                    <li>
                      <i class="fa fa-phone"></i>Call Us: +998 93 949-98-96
                    </li>
                    <li>
                      <i class="fa fa-envelope-o"></i>Email Us:
                      bigeventuz@gmail.com
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div class="sub-footer">
        <div class="container">
          <div class="row">
            <div class="col-xl-6 col-md-6 col-sm-12">
              <div class="footer-end">
                <p>
                  <i class="fa fa-copyright" aria-hidden="true"></i> 2024
                  xjgroup.uz
                </p>
              </div>
            </div>
            <div class="col-xl-6 col-md-6 col-sm-12">
              <div class="payment-card-bottom">
                <ul>
                  <li>
                    <a href="#">
                      <img src="/images/icon/visa.png" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="/images/icon/mastercard.png" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="/images/icon/paypal.png" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="/images/icon/american-express.png" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="/images/icon/discover.png" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

import { openInNewTab } from "../utils/tools";

const { t } = useI18n();
const localePath = useLocalePath();
const socials = ref([
  {
    name: "Instagram",
    url: "https://www.instagram.com/bigeventuz",
    icon: "fa fa-instagram",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@bigeventuz",
    icon: "fa fa-youtube",
  },
  {
    name: "Telegram",
    url: "https://t.me/bigevent_uz",
    icon: "fa fa-telegram",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/bigeventuz",
    icon: "fa fa-facebook",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/86417995",
    icon: "fa fa-linkedin",
  },
]);
</script>
