<template>
  <div>
    <div id="body-content" />
    <Header />
    <slot />
    <ClientOnly>
      <div
        class="tap-top top-cls"
        :class="top ? 'd-block' : 'd-none'"
        @click="toTop"
      >
        <div>
          <i class="fa fa-angle-double-up"></i>
        </div>
      </div>
    </ClientOnly>
    <Footer />
  </div>
</template>
<script setup type="ts">
import { onMounted, ref } from "vue";
const top = ref(false);

onMounted(() => {
  window.addEventListener("scroll", handelScroll());
});

function toTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function handelScroll() {
  if (window.scrollY > 600) top.value = true;
  else top.value = false;
}
</script>
