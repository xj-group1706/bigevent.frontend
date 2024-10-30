import { METHODS } from "http";

export const useAuth = () => {
  const { $api } = useNuxtApp();
  const fetchAuth = (payload: { identifier: string; password: string }) => {
    return new Promise((resolve, reject) => {
      try {
        const res = $api.post("/auth/local", payload);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    fetchAuth,
  };
};
