<template>
  <div>
    <banner :banner="company.banner" />
    <div class="container flex justify-start align-center gap-4 mt-4">
      <logo :logo="company.logo" sizes="100px" />
      <div class="flex object-center font-extrabold text-4xl">
        {{ company.name }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Banner from "../banner.vue";
import Logo from "../logo.vue";

import type { ICompany } from "../../types/company";

const props = defineProps<{
  company: ICompany;
}>();
</script>
