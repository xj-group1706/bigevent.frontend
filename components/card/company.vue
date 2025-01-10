<template>
  <div>
    <div class="logo-block text-center">
      <nuxt-link :to="`/companies/${company.id}`">
        <nuxt-img
          :src="getImageUrl(company.logo.url)"
          :alt="company.logo.name"
          sizes="sm:50vw md:50vw lg:400px"
        />
      </nuxt-link>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getImageUrl } from "../../utils/tools";

import type { ICompany } from "../../types/company";

const props = defineProps<{
  company: ICompany;
}>();
</script>
