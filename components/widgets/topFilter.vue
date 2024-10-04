<template>
  <div class="product-top-filter">
    <div class="row">
      <div class="col-12">
        <div class="product-filter-content">
          <div class="search-count">
            <h5>
              Showing Products 1-12 of
              {{ 30 }} Result
            </h5>
          </div>
          <div class="collection-view">
            <ul>
              <li @click="view.type = VIEW_TYPE.GRID">
                <i class="fa fa-th grid-layout-view"></i>
              </li>
              <li @click="view.type = VIEW_TYPE.LIST">
                <i class="fa fa-list-ul list-layout-view"></i>
              </li>
            </ul>
          </div>
          <div class="collection-grid-view">
            <ul>
              <li>
                <img
                  src="/images/icon/2.png"
                  @click="changeGrid(2)"
                  class="product-2-layout-view"
                />
              </li>
              <li>
                <img
                  src="/images/icon/3.png"
                  @click="changeGrid(3)"
                  class="product-3-layout-view"
                />
              </li>
              <li>
                <img
                  src="/images/icon/4.png"
                  @click="changeGrid(4)"
                  class="product-4-layout-view"
                />
              </li>
              <li>
                <img
                  src="/images/icon/6.png"
                  @click="changeGrid(6)"
                  class="product-6-layout-view"
                />
              </li>
            </ul>
          </div>
          <div class="product-page-filter">
            <select @change="onChangeSort()">
              <option value="all">{{ t("sortingItems") }}</option>
              <option value="a-z">
                {{ t("alphabeticallyAZ") }}
              </option>
              <option value="z-a">
                {{ t("alphabeticallyZA") }}
              </option>
              <option value="low">
                {{ t("priceLowToHigh") }}
              </option>
              <option value="high">
                {{ t("priceHighToLow") }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const VIEW_TYPE = {
  GRID: "grid",
  LIST: "list",
};

const { t } = useI18n();

const view = ref({
  type: VIEW_TYPE.GRID,
  grid: 1,
});

function onChangeSort() {}

function changeGrid(grid: number) {
  view.value.grid = grid;
}
</script>
