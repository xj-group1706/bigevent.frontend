<template>
  <div>
    <breadcrumb :title="t('products')" />
    <section class="section-b-space ratio_asos">
      <div class="collection-wrapper">
        <div class="container">
          <div class="row">
            <div class="col-lg-3">
              <Sidebar v-model="filterParams" />
              <!-- @allFilters="allfilter"
              @priceVal="pricefilterArray"
              @categoryfilter="getCategoryFilter" -->
            </div>
            <div class="collection-content col">
              <div class="page-main-content">
                <div class="row">
                  <div class="col-12">
                    <div class="top-banner-wrapper">
                      <a href="#">
                        <img
                          src="/images/main/2.jpg"
                          class="img-fluid"
                          alt="product-banner"
                        />
                      </a>
                      <div class="top-banner-content small-section">
                        <h4>BIGGEST DEALS ON TOP BRANDS</h4>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book. It has
                          survived not only five centuries, but also the leap
                          into electronic typesetting, remaining essentially
                          unchanged. It was popularised in the 1960s with the
                          release of Letraset sheets containing Lorem Ipsum
                          passages, and more recently with desktop publishing
                          software like Aldus PageMaker including versions of
                          Lorem Ipsum.
                        </p>
                      </div>
                    </div>
                    <ul class="product-filter-tags">
                      <li class="me-1" v-if="filterParams.direction">
                        <a href="javascript:void(0)" class="filter_tag">
                          {{
                            homeStore.directions.find(
                              (e) => e.id === filterParams.direction
                            )?.name[locale]
                          }}
                          <i
                            class="ti-close"
                            @click="filterParams.direction = 0"
                          ></i>
                        </a>
                      </li>
                      <li
                        class="me-1"
                        v-for="(colorId, index) in filterParams.colors"
                        :key="index"
                      >
                        <a href="javascript:void(0)" class="filter_tag">
                          {{
                            productsStore.colors.find((e) => e.id === colorId)
                              ?.name[locale]
                          }}
                          <i
                            class="ti-close"
                            @click="filterParams.colors.splice(index, 1)"
                          ></i>
                        </a>
                      </li>
                      <li
                        class="me-1"
                        v-for="(sizeId, index) in filterParams.sizes"
                        :key="index"
                      >
                        <a href="javascript:void(0)" class="filter_tag">
                          {{
                            productsStore.sizes.find((e) => e.id === sizeId)
                              ?.name
                          }}
                          <i
                            class="ti-close"
                            @click="filterParams.sizes.splice(index, 1)"
                          ></i>
                        </a>
                      </li>
                      <li class="clear_filter" v-if="totalFilterTags > 0">
                        <a
                          href="javascript:void(0)"
                          class="clear_filter"
                          @click="removeFilter()"
                        >
                          {{ t("clearAll") }}
                        </a>
                      </li>
                    </ul>
                    <div class="collection-product-wrapper">
                      <TopFilter @onChangeType="onChangeType" />
                      <div
                        class="product-wrapper-grid"
                        :class="{ 'list-view': typeView.listView === true }"
                      >
                        <div class="grid grid-cols-12 gap-4">
                          <div class="col-span-12">
                            <div
                              class="text-center section-t-space section-b-space"
                              v-if="productsStore.products.length == 0"
                            >
                              <div class="flex justify-center items-center">
                                <img
                                  src="/images/empty-search.jpg"
                                  class="img-fluid"
                                />
                              </div>
                              <h3 class="mt-3">
                                {{
                                  t(
                                    "sorryCouldNotFindTheProductYouWereLookingFor"
                                  )
                                }}
                              </h3>
                              <div class="col-12 mt-3">
                                <nuxt-link
                                  :to="{ path: '/' }"
                                  class="btn btn-solid"
                                >
                                  {{ t("continueShopping") }}
                                </nuxt-link>
                              </div>
                            </div>
                          </div>
                          <div
                            v-for="(product, index) in productsStore.products"
                            :key="index"
                            :class="{
                              'xl:col-span-3 md:col-span-4 col-span-6':
                                typeView.col4 === true,
                              'md:col-span-4 col-span-6':
                                typeView.col3 === true,
                              'col-span-6': typeView.col2 === true,
                              '2xl:col-span-2 xl:col-span-3 md:col-span-4 col-span-6':
                                typeView.col6 === true,
                              'col-span-12': typeView.listView === true,
                            }"
                          >
                            <product :product="product" />
                          </div>
                        </div>
                      </div>
                      <pagination
                        v-if="productsStore.pagination.pageCount > 1"
                        :data="productsStore.pagination"
                        @pageChange="onPageChange"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed, watch } from "vue";
import { useI18n } from "vue-i18n";

import { useProductsStore } from "../../store/newProducts";
import { useHomeStore } from "../../store/home";

import Product from "../../components/card/product.vue";
import Pagination from "../../components/ui/pagination.vue";
import TopFilter from "../../components/widgets/topFilter.vue";
import Sidebar from "../../components/widgets/sidebar.vue";

import type { IProductFilter, ITypeView } from "../../types/index";
import { useRoute, useRouter } from "vue-router";
import { removeBlankAttributes } from "../../utils/tools";

const router = useRouter();
const route = useRoute();
const { t } = useI18n();
const { locale } = useI18n();

const productsStore = useProductsStore();
const homeStore = useHomeStore();

interface IPayload {
  page: number;
  direction: number | null;
  colors?: number[];
  sizes?: number[];
  price?: number;
}

const filterParams = ref<IProductFilter>({
  colors: [],
  sizes: [],
  price: 0,
  direction: 0,
});
const typeView = ref({
  col2: false,
  col3: false,
  col4: true,
  col6: false,
  listView: false,
});
const payload = ref<IPayload>({
  page: productsStore.pagination.page,
  direction: null,
});

onMounted(() => {
  if (route.query.page) payload.value.page = Number(route.query.page);
  if (route.query.direction)
    payload.value.direction = Number(route.query.direction);

  fetchProducts(payload.value);

  productsStore.getColors();
  productsStore.getSizes();
});

const totalFilterTags = computed(() => {
  let count = 0;
  if (filterParams.value.direction) count++;
  count += filterParams.value.sizes.length;
  count += filterParams.value.colors.length;
  return count;
});

watch(
  () => filterParams.value,
  async () => {
    payload.value = {
      ...payload.value,
      ...filterParams.value,
    };
    fetchProducts(payload.value);
  },
  { deep: true }
);

async function fetchProducts(el: IPayload) {
  await router.replace({
    query: {
      ...removeBlankAttributes({ ...route.query, ...el }),
    },
  });

  productsStore.getProducts({
    populate:
      "country.flag, direction, company, colors, product_details, product_details.color, product_details.media",
    sort: ["createdAt:desc"],
    pagination: {
      page: el.page,
      pageSize: productsStore.pagination.pageSize,
    },
    "filters[$and][0][direction][id][$eq]": el.direction,
  });
}

function onPageChange(page: number) {
  fetchProducts({
    ...payload.value,
    page: page,
  });
}

function removeFilter() {
  filterParams.value.direction = 0;
  filterParams.value.colors = [];
  filterParams.value.sizes = [];
}

function onChangeType(type: ITypeView) {
  typeView.value = type;
}
</script>
