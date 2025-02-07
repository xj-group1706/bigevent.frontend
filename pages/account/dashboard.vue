<template>
  <div>
    <breadcrumb :title="$t('account')" />
    <section class="dashboard-section section-b-space user-dashboard-section">
      <div class="container">
        <div class="row g-5">
          <div class="col-lg-3">
            <div class="dashboard-sidebar">
              <div class="faq-tab">
                <ul
                  class="nav nav-tabs flex-column"
                  id="top-tab"
                  role="tablist"
                >
                  <li class="nav-item">
                    <nuxt-link
                      :to="localePath('/account/dashboard')"
                      class="nav-link"
                      :class="{
                        active: route.path === localePath('/account/dashboard'),
                      }"
                    >
                      {{ $t("accountInfo") }}
                    </nuxt-link>
                  </li>
                  <li class="nav-item">
                    <nuxt-link
                      :to="localePath('/account/dashboard/orders')"
                      class="nav-link"
                      :class="{
                        active:
                          route.path ===
                          localePath('/account/dashboard/orders'),
                      }"
                    >
                      {{ $t("myOrders") }}
                    </nuxt-link>
                  </li>
                  <li class="nav-item">
                    <nuxt-link
                      :to="localePath('/account/dashboard/change-password')"
                      class="nav-link"
                      :class="{
                        active:
                          route.path ===
                          localePath('/account/dashboard/change-password'),
                      }"
                    >
                      {{ $t("changePassword") }}
                    </nuxt-link>
                  </li>
                  <li class="nav-item">
                    <nuxt-link
                      :to="localePath('/account/dashboard/logout')"
                      class="nav-link"
                      :class="{
                        active:
                          route.path ===
                          localePath('/account/dashboard/logout'),
                      }"
                    >
                      {{ $t("logout") }}
                    </nuxt-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-lg-9 border px-4 py-3">
            <router-view />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";

definePageMeta({
  middleware: "auth",
});

const route = useRoute();
const localePath = useLocalePath();
</script>
