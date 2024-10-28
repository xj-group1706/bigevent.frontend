<template>
  <div class="product-top-filter">
    <div class="row">
      <div class="col-12">
        <div class="product-filter-content">
          <div class="collection-view">
            <ul>
              <li
                @click="
                  type = {
                    col2: false,
                    col3: false,
                    col4: true,
                    col6: false,
                    listView: false,
                  }
                "
              >
                <i class="fa fa-th grid-layout-view"></i>
              </li>
              <li
                @click="
                  type = {
                    col2: false,
                    col3: false,
                    col4: false,
                    col6: false,
                    listView: true,
                  }
                "
              >
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
          <!-- <div class="product-page-filter">
            <select v-model="sorting" @change="onChangeSort">
              <option value="all">{{ t("sortingItems") }}</option>
              <option value="a-z">
                {{ t("alphabeticallyAZ") }}
              </option>
              <option value="z-a">
                {{ t("alphabeticallyZA") }}
              </option>
            </select>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { STORAGE } from "../../utils/constants";

import type { ITypeView } from "../../types/index";

const { t } = useI18n();

const emits = defineEmits(["onChangeType"]);

const type = ref<ITypeView>({
  col2: false,
  col3: false,
  col4: false,
  col6: false,
  listView: false,
});
// const sorting = ref<string>("all");

onMounted(() => {
  const storedTypeView = sessionStorage.getItem(STORAGE.TYPE_VIEW);
  if (storedTypeView) {
    type.value = JSON.parse(storedTypeView) as ITypeView;
  }
});

watch(
  () => type.value,
  () => {
    sessionStorage.setItem(STORAGE.TYPE_VIEW, JSON.stringify(type.value));
    emits("onChangeType", type.value);
  },
  { deep: true }
);

function changeGrid(grid: number) {
  if (grid === 2) {
    type.value = {
      col2: true,
      col3: false,
      col4: false,
      col6: false,
      listView: false,
    };
  }
  if (grid === 3) {
    type.value = {
      col2: false,
      col3: true,
      col4: false,
      col6: false,
      listView: false,
    };
  }
  if (grid === 4) {
    type.value = {
      col2: false,
      col3: false,
      col4: true,
      col6: false,
      listView: false,
    };
  }
  if (grid === 6) {
    type.value = {
      col2: false,
      col3: false,
      col4: false,
      col6: true,
      listView: false,
    };
  }
}
</script>
