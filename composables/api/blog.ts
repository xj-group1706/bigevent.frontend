import { IBlog } from "../../types/blog";
import type { IReqFilter, IResponse } from "../../types/index";

export const useBlog = () => {
  const { $api } = useNuxtApp();

  const getBlogById = async (payload: {
    id: number | string;
    params: IReqFilter;
  }) => {
    const res = await $api.get(`/blogs/${payload.id}`, payload.params);
    return res;
  };

  const getBlogs = async (payload: IReqFilter): Promise<IResponse<IBlog[]>> => {
    const res = await $api.get("/blogs", payload);
    return res;
  };

  return {
    getBlogById,
    getBlogs,
  };
};
