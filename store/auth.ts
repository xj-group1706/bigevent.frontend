import { defineStore } from "pinia";
import { useI18n } from "vue-i18n";
import { ref, computed } from "vue";
import { useAuth } from "../composables/api/auth";

import type { IAuth, IError } from "../types/index";
import type { IUser } from "../types/user";
import { useCookie } from "nuxt/app";

const authStore = "AUTH_STORE";

export const useAuthStore = defineStore(
  authStore,
  () => {
    const { t } = useI18n();
    const isAuth = ref(false);
    const error = ref<IError<null | IUser>>();

    const token = useCookie<string | null>("auth_token", {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    const user = useCookie<IUser | null>("auth_user", {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    function fetchAuth(item: {
      identifier: string;
      password: string;
    }): Promise<IAuth> {
      return new Promise((resolve, reject) => {
        useAuth()
          .fetchAuth(item)
          .then(async (res) => {
            error.value = {
              data: null,
              success: true,
              code: 0,
              message: "",
            };
            isAuth.value = true;
            token.value = res.jwt;
            const response = await fetchUserById(res.user.id);
            resolve({ ...res, user: response });
          })
          .catch((err) => {
            error.value = {
              data: null,
              code: 404,
              success: false,
              message: t("invalidPhoneOrPassword"),
            };
            reject(err);
          });
      });
    }

    function fetchUserById(id: string | number): Promise<IUser> {
      return new Promise((resolve, reject) => {
        useAuth()
          .getUserById({ id, payload: { populate: "*" } })
          .then((res) => {
            user.value = res;
            resolve(res);
          })
          .catch((err) => {
            reject(err);
            console.error(err);
          });
      });
    }

    return {
      error,
      user,
      isAuth,
      token,
      fetchAuth,
      fetchUserById,
    };
  }
  // {
  //   persist: {
  //     storage:
  //   },
  // }
);
