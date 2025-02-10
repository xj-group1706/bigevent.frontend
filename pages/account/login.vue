<template>
  <div>
    <breadcrumb :title="t('login')" />
    <section class="login-page section-b-space">
      <div class="container">
        <div class="row g-4">
          <div class="col-lg-6">
            <h3>{{ t("login") }}</h3>
            <div class="theme-card !h-[340px]">
              <form class="theme-form" @submit.prevent="onSubmit">
                <Field
                  name="phone"
                  :rules="validationSchema.identifier"
                  v-slot="{ field, errorMessage }"
                >
                  <div class="form-group">
                    <label for="identifier">{{ t("phone") }}</label>
                    <input
                      v-bind="field"
                      type="identifier"
                      class="form-control"
                      :class="errorMessage ? '!mb-1' : ''"
                      id="identifier"
                      v-model="login.identifier"
                      :placeholder="t('enterYourPhone')"
                      name="identifier"
                      v-mask="'(+998)##-###-##-##'"
                    />
                    <span class="validate-error" v-if="errorMessage">
                      {{ errorMessage }}
                    </span>
                  </div>
                </Field>
                <Field
                  name="password"
                  :rules="validationSchema.password"
                  v-slot="{ field, errorMessage }"
                  class="form-group"
                >
                  <div class="form-group">
                    <label for="password">{{ t("password") }}</label>
                    <input
                      v-bind="field"
                      type="password"
                      class="form-control"
                      :class="errorMessage || errorText ? '!mb-1' : ''"
                      id="password"
                      v-model="login.password"
                      :placeholder="t('enterYourPassword')"
                    />
                    <span
                      class="validate-error"
                      v-if="errorMessage || authStore.error?.message"
                    >
                      {{ errorMessage || authStore.error?.message }}
                    </span>
                  </div>
                </Field>

                <button type="submit" class="btn btn-solid mt-4">
                  {{ t("login") }}
                </button>
              </form>
            </div>
          </div>
          <div class="col-lg-6">
            <h3>{{ t("newCustomer") }}</h3>
            <div
              class="theme-right authentication-right px-4 py-5 border !h-[340px]"
            >
              <h6 class="title-font">{{ t("createAnAccount") }}</h6>
              <p>
                {{ t("signUpDescription") }}
              </p>
              <nuxt-link
                :to="localePath({ path: '/account/register' })"
                class="btn btn-solid"
              >
                {{ t("createAnAccount") }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { Field } from "vee-validate";
import * as yup from "yup";

import { useAuthStore } from "../../store/auth";

const { t } = useI18n();

const localePath = useLocalePath();
const authStore = useAuthStore();

const login = ref({
  identifier: "",
  password: "",
});
const errorText = ref("");

const validationSchema = {
  identifier: yup
    .string()
    .required("Phone is required")
    .matches(
      /^\(\+998\)\d{2}-\d{3}-\d{2}-\d{2}$/,
      "Phone number must be in the format (+998)XX-XXX-XX-XX"
    ),
  password: yup.string().required("Password is required"),
};

async function onSubmit(event: Event) {
  event.preventDefault();
  try {
    await validationSchema.identifier.validate(login.value.identifier);
    await validationSchema.password.validate(login.value.password);
    errorText.value = "";
    authStore
      .fetchAuth({
        identifier: `${login.value.identifier.replace(/\D/g, "")}@gmail.com`,
        password: login.value.password,
      })
      .then((res) => {
        navigateTo(localePath("/"));
      })
      .catch(() => {
        errorText.value = t("phoneOrPasswordIsIncorrect");
      });
  } catch (error) {
    console.log("Error", error);
  }
}
</script>
