<template>
  <div>
    <!-- Sample menu definition -->
    <div class="main-navbar">
      <div id="mainnav">
        <div
          class="toggle-nav"
          :class="leftSidebarVal ? 'toggle-button' : ''"
          @click="openMobileNav = true"
        >
          <i class="fa fa-bars sidebar-bar"></i>
        </div>
        <ul class="nav-menu" :class="{ openNav: openMobileNav }">
          <li class="back-btn">
            <div class="mobile-back text-end">
              <span @click="openMobileNav = false">Back</span>
              <i class="fa fa-angle-right ps-2" aria-hidden="true"></i>
            </div>
          </li>
          <li
            v-for="(menuItem, index) in menu"
            :key="index"
            :class="menuItem.megaMenu ? 'mega-menu' : 'dropdown'"
          >
            <nuxt-link
              :to="localePath(menuItem.path)"
              class="nav-link"
              @click="setActive(menuItem.title)"
            >
              {{ $t(menuItem.title) }}
              <span
                class="sub-arrow"
                v-if="menuItem.children || menuItem.megaMenu"
              ></span>
            </nuxt-link>
            <ul
              class="nav-submenu"
              :class="{ openSubMenu: isActive(menuItem.title) }"
              v-if="menuItem.children"
            >
              <li
                v-for="(childrenItem, index) in menuItem.children"
                :key="index"
              >
                <a
                  href="javascript:void(0)"
                  @click="setActiveChild(childrenItem.title)"
                  v-if="childrenItem.children"
                >
                  {{ childrenItem.title }}
                  <span class="sub-arrow" v-if="childrenItem.children"></span>
                </a>
                <nuxt-link
                  v-else
                  :to="{ path: childrenItem.path }"
                  @click="setActiveChild(childrenItem.title)"
                >
                  {{ childrenItem.title }}
                </nuxt-link>
                <ul
                  class="nav-sub-childMenu"
                  :class="{ openSubChild: isActiveChild(childrenItem.title) }"
                  v-if="childrenItem.children"
                >
                  <li
                    v-for="(childrenSubItem, index) in childrenItem.children"
                    :key="index"
                  >
                    <nuxt-link :to="{ path: childrenSubItem.path }">
                      {{ childrenSubItem.title }}
                    </nuxt-link>
                  </li>
                </ul>
              </li>
            </ul>
            <div
              class="mega-menu-container"
              :class="{ openSubMenu: isActive('portfolio') }"
              v-if="menuItem.megaMenu"
            >
              <div class="container">
                <div class="row">
                  <div
                    class="col mega-box"
                    v-for="(childrenItem, index) in menuItem.children"
                    :key="index"
                  >
                    <div class="link-section">
                      <div
                        class="menu-title"
                        @click="setActivesubmega('portfolio')"
                      >
                        <h5>
                          {{ childrenItem.title }}
                          <span class="sub-arrow"></span>
                        </h5>
                      </div>
                      <div
                        class="menu-content"
                        :class="{
                          openSubMegaMenu: isActiveSubMega('portfolio'),
                        }"
                      >
                        <ul>
                          <li
                            v-for="(
                              childrenSubItem, index
                            ) in childrenItem.children"
                            :key="index"
                          >
                            <nuxt-link :to="{ path: childrenSubItem.path }">
                              {{ childrenSubItem.title }}
                            </nuxt-link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

import type { IMenu } from "../../types/index";

const props = defineProps<{
  leftSidebarVal: boolean;
}>();

const localePath = useLocalePath();

const menu = ref<IMenu[]>([
  {
    title: "home",
    type: "sub",
    active: false,
    path: "",
  },
  {
    title: "products",
    type: "sub",
    active: false,
    path: "/products",
  },
  {
    title: "companies",
    type: "sub",
    active: false,
    path: "/companies",
  },
  {
    title: "blogs",
    type: "sub",
    active: false,
    path: "/blogs",
  },
]);
const openMobileNav = ref(false);
const subnav = ref(false);
const activeItem = ref("home");
const activeChildItem = ref("fashion 1");
const activeMegaChild = ref("portfolio");

function mobileNav() {
  openMobileNav.value = !openMobileNav.value;
}
function isActive(menuItem: string) {
  return activeItem.value === menuItem;
}
function setActive(menuItem: string) {
  if (activeItem.value === menuItem) {
    activeItem.value = "";
  } else {
    activeItem.value = menuItem;
  }
}
function isActiveChild(menuChildItem: string) {
  return activeChildItem.value === menuChildItem;
}
function setActiveChild(menuChildItem: string) {
  if (activeChildItem.value === menuChildItem) {
    activeChildItem.value = "";
    return;
  }
  activeChildItem.value = menuChildItem;
}
function isActiveSubMega(megaChildItem: string) {
  return (activeMegaChild.value = megaChildItem);
}
function setActivesubmega(megaChildItem) {
  if (activeMegaChild.value === megaChildItem) {
    activeMegaChild.value = "";
    return;
  }
  this.activemegaChild = megaChildItem;
}
</script>

<style lang="scss" scoped>
.toggle-nav {
  &.toggle-button {
    z-index: 1;
  }
}
</style>
