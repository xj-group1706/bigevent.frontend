import { defineStore } from "pinia";
import { useI18n } from "vue-i18n";
import { ref, computed } from "vue";
import { useAuth } from "../composables/api/auth";
import type { IError } from "../types/index";
import { IUser } from "../types/user";

const authStore = "AUTH_STORE";

const error = ref<IError<null | IUser>>();

export const useAuthStore = defineStore(authStore, () => {
  const { t } = useI18n();
  function fetchAuth(item: { identifier: string; password: string }) {
    useAuth()
      .fetchAuth(item)
      .then((res) => {
        error.value = {
          data: null,
          success: true,
          code: 0,
          message: "",
        };
      })
      .catch((err) => {
        error.value = {
          data: null,
          code: 404,
          success: false,
          message: t("invalidPhoneOrPassword"),
        };
      });
  }

  return {
    error,
    fetchAuth,
  };
});
