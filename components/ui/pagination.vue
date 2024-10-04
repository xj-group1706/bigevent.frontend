<template>
  <div class="product-pagination mb-0">
    <div class="theme-pagination-block">
      <div class="row">
        <div class="col-xl-6 col-md-6 col-sm-12">
          <nav aria-label="Page navigation">
            <ul v-if="data.pageCount <= 5" class="pagination">
              <li
                class="page-item"
                :class="{ disable: currentPage === 1 }"
                @click="previousPage"
              >
                <a class="page-link" href="javascript:void(0)">
                  <span aria-hidden="true">
                    <i class="fa fa-chevron-left" aria-hidden="true"></i>
                  </span>
                </a>
              </li>
              <li
                class="page-item"
                v-for="(p, index) in data.pageCount"
                :key="index"
                :class="{ active: p == currentPage }"
              >
                <a
                  class="page-link"
                  href="javascript:void(0)"
                  @click="emits('pageChange', p)"
                >
                  {{ p }}
                </a>
              </li>
              <li
                class="page-item"
                :class="{
                  disable: currentPage === data.pageCount,
                }"
              >
                <a
                  class="page-link"
                  href="javascript:void(0)"
                  @click="nextPage"
                >
                  <span aria-hidden="true">
                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div class="col-xl-6 col-md-6 col-sm-12">
          <div class="product-search-count-bottom">
            <h5>Showing Products 1-12 of 24 Result</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

import type { IPagination } from "../../types/index";

const props = defineProps<{
  data: IPagination;
}>();

const emits = defineEmits(["sizeChange", "pageChange"]);

const currentPage = ref(props.data.page);
const beginningPages = ref({
  first: 2,
  second: 3,
  third: 4,
});

function changePage(page: number) {
  if (page === props.data.pageCount) {
    beginningPages.value.first = page - 2;
    beginningPages.value.second = page - 1;
    beginningPages.value.third = page;
  } else if (page === 1) {
    beginningPages.value.first = page;
    beginningPages.value.second = page + 1;
    beginningPages.value.third = page + 2;
  } else {
    beginningPages.value.first = page - 1;
    beginningPages.value.second = page;
    beginningPages.value.third = page + 1;
  }
  emits("pageChange", page);
}

function previousPage() {
  if (props.data.page - 1 >= 1) {
    changePage(props.data.page - 1);
  }
}

function nextPage() {
  if (props.data.page + 1 <= props.data.pageCount) {
    changePage(props.data.page + 1);
  }
}
</script>
