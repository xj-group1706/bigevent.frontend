import type { IReqFilter } from "../../types/index";

export const useBlog = () => {
  const { $api } = useNuxtApp();

  const getBlogs = async (payload: IReqFilter) => {
    const res = await $api(`/blogs`, { params: payload });
    return res;
  };

  return {
    getBlogs,
  };
};
