import qs from "qs";
import { removeBlankAttributes } from "../utils/tools";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const token = useCookie("token");
  const api = $fetch.create({
    baseURL: config.public.apiBaseUrl,
    onRequest({ request, options, error }) {
      if (token.value) {
        const headers = (options.headers ||= {});
        if (Array.isArray(headers)) {
          headers.push(["Authorization", `Bearer ${token.value}`]);
        } else if (headers instanceof Headers) {
          headers.set("Authorization", `Bearer ${token.value}`);
        } else {
          headers.Authorization = `Bearer ${token.value}`;
        }
      }
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo("/login"));
      }
    },
  });

  const get = async (url: string, params?: Record<string, any>) => {
    if (params) {
      const queryString = qs.stringify(removeBlankAttributes(params), {
        encodeValuesOnly: true,
      });
      url += (url.includes("?") ? "&" : "?") + queryString; // Append query parameters
    }
    return await api(url); // Call the fetch instance directly
  };

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api: {
        get,
        ...api,
      },
    },
  };
});
