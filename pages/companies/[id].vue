<template>
  <div v-if="companiesStore.company.id">
    <breadcrumb :title="companiesStore.company.name" />
    <banner :company="companiesStore.company" />
    <div class="my-4 container">
      <directions :directions="companiesStore.company.directions" />
      <div class="collection-product-wrapper mt-4">
        <top-filter @onChangeType="onChangeType" />
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
                  <img src="/images/empty-search.jpg" class="img-fluid" />
                </div>
                <h3 class="mt-3">
                  {{ $t("sorryCouldNotFindTheProductYouWereLookingFor") }}
                </h3>
                <div class="col-12 mt-3">
                  <nuxt-link :to="{ path: '/' }" class="btn btn-solid">
                    {{ $t("continueShopping") }}
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
                'md:col-span-4 col-span-6': typeView.col3 === true,
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
</template>
<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import Directions from "../../components/companies/directions.vue";
import Banner from "../../components/companies/banner.vue";
import TopFilter from "../../components/widgets/topFilter.vue";
import Product from "../../components/card/product.vue";
import Pagination from "../../components/ui/pagination.vue";

import { useCompaniesStore } from "../../store/companies";
import { useProductsStore } from "../../store/newProducts";

import type { ITypeView } from "../../types/index";

const route = useRoute();
const router = useRouter();

const companiesStore = useCompaniesStore();
const productsStore = useProductsStore();

const typeView = ref<ITypeView>({
  col2: false,
  col3: false,
  col4: true,
  col6: false,
  listView: false,
});

onMounted(async () => {
  await companiesStore.getCompanyById(route.params.id as string);
  fetchProducts({
    page: route.query.page ? parseInt(route.query.page as string) : 1,
  });
});

watch(
  () => route.query.direction,
  () => {
    fetchProducts({
      page: route.query.page ? parseInt(route.query.page as string) : 1,
    });
  }
);

function fetchProducts(params: { page: number }) {
  productsStore.getProducts({
    populate:
      "country.flag, direction, company, colors, product_details, product_details.color, product_details.media",
    sort: ["createdAt:desc"],
    pagination: {
      page: params.page,
      pageSize: productsStore.pagination.pageSize,
    },
    "filters[$and][0][company][id][$eq]": route.params.id,
    "filters[$and][0][direction][id][$eq]": route.query.direction,
  });
}

function onPageChange(page: number) {
  fetchProducts({
    page: page,
  });
}

function onChangeType(type: ITypeView) {
  typeView.value = type;
}
</script>
