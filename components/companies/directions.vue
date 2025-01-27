<template>
  <div>
    <div class="flex justify-center align-center gap-4">
      <button
        class="btn"
        :class="!route.query.direction ? 'btn-solid' : 'btn-outline'"
        @click="onChange(0)"
      >
        {{ $t("all") }}
      </button>
      <button
        v-for="(item, ind) in directions"
        :key="ind"
        class="btn"
        :class="
          route.query.direction && route.query.direction === item.id.toString()
            ? 'btn-solid'
            : 'btn-outline'
        "
        @click="onChange(item.id)"
      >
        {{ item.name[$i18n.locale] }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import type { IDirection } from "../../types/direction";

const props = defineProps<{
  directions: IDirection[];
}>();

const route = useRoute();
const router = useRouter();

function onChange(id: number) {
  if (id) {
    router.push({ query: { ...route.query, direction: id.toString() } });
  } else {
    router.push({ query: { ...route.query, direction: null } });
  }
}
</script>
