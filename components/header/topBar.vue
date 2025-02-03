<template>
  <div class="top-header">
    <div class="container">
      <div class="row">
        <div class="text-end">
          <ul class="header-dropdown">
            <li class="mobile-wishlist">
              <nuxt-link :to="localePath('/account/wishlist')">
                <i class="fa fa-heart" aria-hidden="true"></i>
              </nuxt-link>
            </li>
            <li v-if="authStore.isAuth" class="onhover-dropdown mobile-account">
              <i class="fa fa-user" aria-hidden="true"></i>
              {{ $t("myAccount") }}
              <ul class="onhover-show-div">
                <li>
                  <nuxt-link :to="localePath('/account/dashboard')">
                    {{ $t("dashboard") }}
                  </nuxt-link>
                </li>
              </ul>
            </li>
            <li v-else>
              <nuxt-link :to="localePath('/account/login')">
                {{ $t("login") }}
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "../../store/auth";

const authStore = useAuthStore();

const localePath = useLocalePath();
</script>
