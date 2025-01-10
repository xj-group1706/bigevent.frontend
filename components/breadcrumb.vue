<template>
  <div class="breadcrumb-main">
    <div class="breadcrumb-section">
      <div class="container">
        <div class="row">
          <div class="col-sm-6">
            <div class="page-title">
              <h2>{{ title }}</h2>
            </div>
          </div>
          <div class="col-sm-6">
            <nav aria-label="breadcrumb" class="theme-breadcrumb">
              <ol class="breadcrumb">
                <li
                  v-for="(path, index) in routes"
                  :key="index"
                  class="breadcrumb-item"
                >
                  <nuxt-link :to="localePath(path ? `/${path}` : '/')">
                    {{ path.length > 0 ? t(path) : t("home") }}
                  </nuxt-link>
                </li>
                <li class="breadcrumb-item active" v-if="title">{{ title }}</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

defineProps<{
  title: string;
}>();

const route = useRoute();
const { t } = useI18n();
const localePath = useLocalePath();

const routes = route.path.split("/");
routes.splice(routes.length - 1, 1);
console.log(routes);
</script>
