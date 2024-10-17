import type { IReqFilter } from "../../types/index";

export const useBlog = () => {
  const { $api } = useNuxtApp();

  const getBlogById = async (payload: {
    id: number | string;
    params: IReqFilter;
  }) => {
    const res = await $api(`/blogs/${payload.id}`, { params: payload.params });
    return res;
  };

  const getBlogs = async (payload: IReqFilter) => {
    const res = await $api("/blogs", { params: payload });
    return res;
  };

  return {
    getBlogById,
    getBlogs,
  };
};
