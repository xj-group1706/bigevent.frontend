import { ref } from "vue";
import { defineStore } from "pinia";

import { useBlog } from "./../composables/api/blog";

import type { IBlog } from "./../types/blog";
import type { IPagination, IReqFilter } from "../types/index";

const BLOG_STORE = "blogStore";

export const useBlogStore = defineStore(BLOG_STORE, () => {
  const blogs = ref<IBlog[]>([]);
  const pagination = ref<IPagination>({
    page: 1,
    pageSize: 10,
    pageCount: 0,
    total: 0,
  });
  const blog = ref<IBlog>();

  function getBlogById(id: string | number) {
    return new Promise((resolve, reject) => {
      const { getBlogById } = useBlog();
      getBlogById({ id, params: { populate: "*" } })
        .then((res) => {
          blog.value = res.data;
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  function getBlogs(payload: IReqFilter) {
    return new Promise((resolve, reject) => {
      const { getBlogs } = useBlog();
      getBlogs(payload)
        .then((res) => {
          blogs.value = res.data;
          pagination.value = res.meta.pagination;
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  return { blog, blogs, pagination, getBlogById, getBlogs };
});
