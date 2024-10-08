import { ref } from "vue";
import { defineStore } from "pinia";

import { useBlog } from "./../composables/api/blog";

import type { IBlog } from "./../types/blog";
import type { IReqFilter } from "../types/index";

const BLOG_STORE = "blogStore";

export const useBlogStore = defineStore(BLOG_STORE, () => {
  const blogs = ref<IBlog[]>([]);

  function getBlogs(payload: IReqFilter) {
    return new Promise((resolve, reject) => {
      const { getBlogs } = useBlog();
      getBlogs(payload)
        .then((res) => {
          blogs.value = res.data;
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  return { blogs, getBlogs };
});
