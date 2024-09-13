import { ref } from "vue";
import {
  useFetch,
  UseFetchOptions,
  useRuntimeConfig,
  useCookie,
} from "#imports";

interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
  pending: boolean;
}

function useApiRequest<T>(url: string, options?: UseFetchOptions<T>) {
  const data = ref<T | null>(null);
  const error = ref<Error | null>(null);
  const pending = ref(false);

  const token = useCookie("token");

  if (token.value) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token.value}`,
    };
  }

  const fetchData = async () => {
    pending.value = true;
    try {
      const response = await useFetch<T>(url, options);
      data.value = response.data.value;
      error.value = null;
    } catch (err) {
      error.value = err as Error;
      data.value = null;
    } finally {
      pending.value = false;
    }
  };

  fetchData();

  return { data, error, pending };
}

// CRUD functions
export function useGet<T>(endpoint: string, options?: UseFetchOptions<T>) {
  const config = useRuntimeConfig();
  const url = `${config.public.apiBaseUrl}${endpoint}`;
  return useApiRequest<T>(url, { ...options, method: "GET" });
}

export function usePost<T>(
  endpoint: string,
  body: any,
  options?: UseFetchOptions<T>
) {
  const config = useRuntimeConfig();
  const url = `${config.public.apiBaseUrl}${endpoint}`;
  return useApiRequest<T>(url, { ...options, method: "POST", body });
}

export function usePut<T>(
  endpoint: string,
  body: any,
  options?: UseFetchOptions<T>
) {
  const config = useRuntimeConfig();
  const url = `${config.public.apiBaseUrl}${endpoint}`;
  return useApiRequest<T>(url, { ...options, method: "PUT", body });
}

export function useDelete<T>(endpoint: string, options?: UseFetchOptions<T>) {
  const config = useRuntimeConfig();
  const url = `${config.public.apiBaseUrl}${endpoint}`;
  return useApiRequest<T>(url, { ...options, method: "DELETE" });
}

export function usePatch<T>(
  endpoint: string,
  body: any,
  options?: UseFetchOptions<T>
) {
  const config = useRuntimeConfig();
  const url = `${config.public.apiBaseUrl}${endpoint}`;
  return useApiRequest<T>(url, { ...options, method: "PATCH", body });
}

export function useGetById<T>(
  endpoint: string,
  id: string | number,
  options?: UseFetchOptions<T>
) {
  const config = useRuntimeConfig();
  const url = `${config.public.apiBaseUrl}${endpoint}/${id}`;
  return useApiRequest<T>(url, { ...options, method: "GET" });
}
