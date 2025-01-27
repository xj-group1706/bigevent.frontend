<template>
  <div>
    <div
      class="w-full h-96 bg-cover bg-center"
      v-bind:style="{
        'background-image': 'url(' + imageUrl + banner.url + ')',
      }"
    />
  </div>
</template>

<script lang="ts" setup>
import { useRuntimeConfig } from "nuxt/app";

import type { IMedia } from "../types/media";

const props = defineProps<{
  banner: IMedia;
}>();

const config = useRuntimeConfig();
const imageUrl = config.public.imageUrl;
</script>
