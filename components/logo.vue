<template>
  <div>
    <nuxt-img
      :src="getImageUrl(logo.formats.thumbnail.url)"
      :alt="logo.name"
      :sizes="sizes ? sizes : '80px'"
    />
  </div>
</template>

<script lang="ts" setup>
import type { IMedia } from "../types/media";
import { getImageUrl } from "../utils/tools";

const props = defineProps<{
  logo: IMedia;
  sizes?: string;
}>();
</script>
