import type { IAuth, IReqFilter } from "../../types/index";
import type { IRegisterUser, IUser } from "../../types/user";

export const useAuth = () => {
  const { $api } = useNuxtApp();
  const fetchAuth = (payload: {
    identifier: string;
    password: string;
  }): Promise<IAuth> => {
    return new Promise((resolve, reject) => {
      try {
        const res = $api.post("/auth/local", payload);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  };

  const getUserById = async (params: {
    id: string | number;
    payload: IReqFilter;
  }): Promise<IUser> => {
    return await $api.get(`/users/${params.id}`, params.payload);
  };

  const registerUser = async (payload: IRegisterUser): Promise<IAuth> => {
    return await $api.post("/auth/local/register", payload);
  };

  return {
    fetchAuth,
    getUserById,
    registerUser,
  };
};
