<template>
  <div>
    <breadcrumb :title="t('companies')" />
    <div class="container">
      <div class="my-8 grid grid-cols-12 gap-4">
        <div
          v-for="(item, index) in companiesStore.companies"
          :key="index"
          class="2xl:col-span-2 xl:col-span-3 md:col-span-4 col-span-6"
        >
          <company :company="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";

import { useCompaniesStore } from "../../store/companies";

import company from "../../components/card/company.vue";

const { t } = useI18n();

const companiesStore = useCompaniesStore();

onMounted(() => {
  companiesStore.getCompanies({
    populate: "*",
  });
});
</script>
