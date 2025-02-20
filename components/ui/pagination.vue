<template>
  <div class="product-pagination mb-0">
    <div class="theme-pagination-block">
      <div class="row">
        <div class="col-xl-6 col-md-6 col-sm-12">
          <nav aria-label="Page navigation">
            <ul v-if="data.pageCount <= 5" class="pagination">
              <li
                class="page-item"
                :class="{ disable: data.page === 1 }"
                @click="previousPage"
              >
                <a class="page-link cursor-pointer">
                  <span aria-hidden="true">
                    <i class="fa fa-chevron-left" aria-hidden="true"></i>
                  </span>
                </a>
              </li>
              <li
                class="page-item"
                v-for="(p, index) in data.pageCount"
                :key="index"
                :class="{ active: p == data.page }"
              >
                <a
                  class="page-link cursor-pointer"
                  @click="emits('pageChange', p)"
                >
                  {{ p }}
                </a>
              </li>
              <li
                class="page-item"
                :class="{
                  disable: data.page === data.pageCount,
                }"
              >
                <a class="page-link cursor-pointer" @click="nextPage">
                  <span aria-hidden="true">
                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                  </span>
                </a>
              </li>
            </ul>
            <ul v-else class="pagination">
              <li
                class="page-item"
                :class="{ disable: data.page === 1 }"
                @click="previousPage"
              >
                <a class="page-link cursor-pointer">
                  <span aria-hidden="true">
                    <i class="fa fa-chevron-left" aria-hidden="true"></i>
                  </span>
                </a>
              </li>
              <li
                v-if="beginningPages.first > 1"
                class="page-item"
                :class="{ active: 1 === data.page }"
              >
                <a class="page-link cursor-pointer" @click="changePage(1)">
                  {{ 1 }}
                </a>
              </li>
              <li v-if="beginningPages.first > 2" class="page-item">
                <a class="page-link cursor-pointer"> ... </a>
              </li>
              <li
                class="page-item"
                :class="{ active: beginningPages.first === data.page }"
              >
                <a
                  class="page-link cursor-pointer"
                  @click="changePage(beginningPages.first)"
                >
                  {{ beginningPages.first }}
                </a>
              </li>
              <li
                class="page-item"
                :class="{ active: beginningPages.second === data.page }"
              >
                <a
                  class="page-link cursor-pointer"
                  @click="changePage(beginningPages.second)"
                >
                  {{ beginningPages.second }}
                </a>
              </li>
              <li
                class="page-item"
                :class="{ active: beginningPages.third === data.page }"
              >
                <a
                  class="page-link cursor-pointer"
                  @click="changePage(beginningPages.third)"
                >
                  {{ beginningPages.third }}
                </a>
              </li>
              <li
                v-if="beginningPages.third < data.pageCount"
                class="page-item"
              >
                <a class="page-link cursor-pointer"> ... </a>
              </li>
              <li
                v-if="beginningPages.third < data.pageCount"
                class="page-item"
                :class="{ active: data.pageCount === data.page }"
              >
                <a
                  class="page-link cursor-pointer"
                  @click="changePage(data.pageCount)"
                >
                  {{ data.pageCount }}
                </a>
              </li>
              <li
                class="page-item"
                :class="{
                  disable: data.page === data.pageCount,
                }"
              >
                <a class="page-link cursor-pointer" @click="nextPage">
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
            <h5>
              {{
                $t("showingProductsResult", {
                  start: (data.page - 1) * data.pageSize + 1,
                  finish:
                    data.page * data.pageSize > data.total
                      ? data.total
                      : data.page * data.pageSize,
                  total: data.total,
                })
              }}
            </h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";

import type { IPagination } from "../../types/index";

const props = defineProps<{
  data: IPagination;
}>();

const emits = defineEmits(["sizeChange", "pageChange"]);

const beginningPages = ref({
  first: 2,
  second: 3,
  third: 4,
});

onMounted(() => {
  if (props.data.pageCount > 5 && props.data.page > 3) {
    if (props.data.page < props.data.pageCount) {
      beginningPages.value = {
        first: props.data.page - 1,
        second: props.data.page,
        third: props.data.page + 1,
      };
    }
    if (props.data.page === props.data.pageCount) {
      beginningPages.value = {
        first: props.data.page - 2,
        second: props.data.page - 1,
        third: props.data.page,
      };
    }
  }
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
