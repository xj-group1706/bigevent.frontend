<template>
  <div>
    <header>
      <div class="mobile-fix-option"></div>
      <top-bar />
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="main-menu">
              <div class="menu-left">
                <div class="navbar">
                  <a @click="left_sidebar">
                    <div class="bar-style">
                      <i class="fa fa-bars sidebar-bar" aria-hidden="true"></i>
                    </div>
                  </a>
                  <WidgetsLeftSidebar
                    :leftSidebarVal="leftSidebarVal"
                    @closeVal="closeBarValFromChild"
                  />
                </div>
                <div class="brand-logo">
                  <nuxt-link :to="localePath('index')">
                    <img
                      src="/images/logo_line.png"
                      class="img-fluid max-w-80"
                      alt="logo"
                    />
                  </nuxt-link>
                </div>
              </div>
              <div class="menu-right pull-right">
                <HeaderNavbar />
                <WidgetsHeaderWidgets />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

import topBar from "./topBar.vue";

const localePath = useLocalePath();
const leftSidebarVal = ref(false);

function left_sidebar() {
  leftSidebarVal.value = leftSidebarVal.value;
}

function closeBarValFromChild(val: boolean) {
  leftSidebarVal.value = val;
}
</script>
