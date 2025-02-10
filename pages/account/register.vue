<template>
  <div>
    <breadcrumb :title="$t('register')" />
    <section class="register-page section-b-space">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <h3>{{ t("createAccount") }}</h3>
            <div class="theme-card">
              <Form
                :validation-schema="validationSchema"
                class="theme-form"
                @submit="onSubmit"
              >
                <div class="row">
                  <Field name="firstName" v-slot="{ field, errorMessage }">
                    <div class="col-md-6">
                      <label for="fname">{{ t("firstName") }}</label>
                      <input
                        v-bind="field"
                        v-model="user.firstName"
                        type="text"
                        class="form-control"
                        id="fname"
                        :placeholder="t('firstName')"
                      />
                      <span class="validate-error" v-if="errorMessage">
                        {{ t(errorMessage) }}
                      </span>
                    </div>
                  </Field>
                  <Field name="lastName" v-slot="{ field, errorMessage }">
                    <div class="col-md-6">
                      <label for="lname">{{ t("lastName") }}</label>
                      <input
                        v-bind="field"
                        v-model="user.lastName"
                        type="text"
                        class="form-control"
                        id="lname"
                        :placeholder="t('lastName')"
                        name="lname"
                      />
                      <span class="validate-error" v-if="errorMessage">
                        {{ t(errorMessage) }}
                      </span>
                    </div>
                  </Field>
                </div>
                <div class="row">
                  <Field name="phone" v-slot="{ field, errorMessage }">
                    <div class="col-md-6">
                      <label for="phone">{{ t("phone") }}</label>
                      <input
                        v-bind="field"
                        v-model="user.phone"
                        class="form-control"
                        id="phone"
                        :placeholder="t('phone')"
                        name="phone"
                        v-mask="'(+998)##-###-##-##'"
                      />
                      <span class="validate-error" v-if="errorMessage">
                        {{ t(errorMessage) }}
                      </span>
                      <span
                        class="validate-error"
                        v-if="!errorMessage && authStore.error?.message"
                      >
                        {{ t(authStore.error?.message) }}
                      </span>
                    </div>
                  </Field>
                  <Field name="password" v-slot="{ field, errorMessage }">
                    <div class="col-md-6">
                      <label for="password">{{ t("password") }}</label>
                      <input
                        v-bind="field"
                        v-model="user.password"
                        type="password"
                        class="form-control"
                        id="password"
                        placeholder="Enter your password"
                        name="password"
                      />
                      <span class="validate-error" v-if="errorMessage">
                        {{ t(errorMessage) }}
                      </span>
                    </div>
                  </Field>
                  <div class="col-6">
                    <button type="submit" class="btn btn-solid mt-2">
                      {{ t("createAccount") }}
                    </button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { Form, Field } from "vee-validate";
import * as yup from "yup";

import { useAuthStore } from "../../store/auth";
import { joinWithCamelCase } from "../../utils/tools";
import { navigateTo } from "nuxt/app";

const { t } = useI18n();
const localePath = useLocalePath();

const authStore = useAuthStore();

const user = ref({
  firstName: "",
  lastName: "",
  phone: "",
  password: "",
});

const validationSchema = yup.object({
  firstName: yup.string().required("firstNameRequired"),
  lastName: yup.string().required("lastNameRequired"),
  phone: yup
    .string()
    .required("phoneRequired")
    .matches(/^\(\+998\)\d{2}-\d{3}-\d{2}-\d{2}$/, "phoneFormat"),
  password: yup
    .string()
    .required("passwordRequired")
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
      "passwordFormat"
    ),
});

async function onSubmit() {
  try {
    authStore
      .registerUser({
        fullName: user.value.firstName + " " + user.value.lastName,
        phone: user.value.phone.replace(/\D/g, ""),
        email: user.value.phone.replace(/\D/g, "") + "@gmail.com",
        password: user.value.password,
        username:
          joinWithCamelCase([user.value.firstName, user.value.lastName]) +
          user.value.phone.replace(/\D/g, ""),
      })
      .then((res) => {
        navigateTo(localePath("/"));
      })
      .catch((error) => {});
  } catch (error) {
    console.error(error);
  }
}
</script>
