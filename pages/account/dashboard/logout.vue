<template>
  <div>
    <div class="font-bold text-3xl">{{ t("logout") }}</div>
    <div class="text-base">{{ t("areYouSureYouWantToLogout") }}</div>
    <div>
      <button @click="logout" class="btn btn-danger mt-4">
        {{ t("logout") }}
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";

import { useAuthStore } from "../../../store/auth";

const { t } = useI18n();
const authStore = useAuthStore();

async function logout() {
  authStore.logout();
}
</script>
