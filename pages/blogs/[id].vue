<template>
  <div v-if="blogStore.blog">
    <Breadcrumb title="Blog" />
    <section class="blog-detail-page section-b-space ratio2_3">
      <div class="container mx-auto px-10">
        <div class="row">
          <div class="col-sm-12 blog-detail">
            <img
              :src="getImageUrl(blogStore.blog?.media.url)"
              class="img-fluid"
              alt="blog"
            />
            <h3>
              {{ blogStore.blog?.name[locale] }}
            </h3>
            <div>
              {{ blogStore.blog?.description[locale] }}
            </div>
            <div class="border-t-[0.5px] border-gray-300 my-4"></div>
            <div v-html="blogStore.blog?.content[locale]"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "nuxt/app";

import { useBlogStore } from "../../store/blog";
import { getImageUrl } from "../../utils/tools";

const route = useRoute();
const { locale } = useI18n();
const blogStore = useBlogStore();

onMounted(() => {
  blogStore.getBlogById(route.params.id?.toString());
});
</script>
