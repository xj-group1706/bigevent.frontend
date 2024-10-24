<template>
  <div>
    <WidgetsBreadcrumbs title="Blog" />
    <section class="section-b-space blog-page ratio2_3">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div
              class="row blog-media"
              v-for="(blog, index) in blogStore.blogs"
              :key="index"
            >
              <div class="col-xl-6">
                <div class="blog-left">
                  <nuxt-link :to="localePath({ path: `/blogs/${blog.id}` })">
                    <img
                      :src="getImageUrl(blog.media.url)"
                      class="img-fluid"
                      :alt="blog.media.name"
                    />
                  </nuxt-link>
                </div>
              </div>
              <div class="col-xl-6">
                <div class="blog-right">
                  <div>
                    <h6>{{ getDateTime(blog.createdAt) }}</h6>
                    <nuxt-link :to="localePath({ path: `/blogs/${blog.id}` })">
                      <h4>{{ blog.name[locale] }}</h4>
                    </nuxt-link>
                    <p>{{ blog.description[locale] }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <pagination
          v-if="blogStore.pagination.pageCount > 1"
          :data="blogStore.pagination"
          @pageChange="onPageChange"
        />
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";

import pagination from "../../components/ui/pagination.vue";

import { useBlogStore } from "../../store/blog";

import { getImageUrl, getDateTime } from "../../utils/tools";
import { useRouter, useRoute } from "vue-router";

interface IPayload {
  page: number;
}

const router = useRouter();
const route = useRoute();

const localePath = useLocalePath();
const { locale } = useI18n();

const blogStore = useBlogStore();

onMounted(() => {
  const payload: IPayload = {
    page: blogStore.pagination.page,
  };

  if (route.query.page && route.query.pageSize) {
    payload.page = Number(route.query.page);
  }
  fetchBlogs(payload);
});

async function fetchBlogs(payload: IPayload) {
  await router.replace({
    query: {
      page: payload.page,
    },
  });
  blogStore.getBlogs({
    populate: "*",
    sort: ["createdAt:desc"],
    "pagination[page]": payload.page,
    "pagination[pageSize]": blogStore.pagination.pageSize,
  });
}

function onPageChange(page: number) {
  fetchBlogs({
    page: page,
  });
}
</script>
