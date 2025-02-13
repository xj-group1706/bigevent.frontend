<template>
  <div>
    <div class="modal-backdrop fade show"></div>
    <div
      class="modal fade show d-block bd-example-modal-lg theme-modal"
      id="modal-compare"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modal-cartLabel"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal1">
            <div class="modal-body">
              <div class="bg-white p-3">
                <div class="row compare-modal">
                  <button
                    class="close btn-close"
                    type="button"
                    @click="onClose"
                  >
                    <span>×</span>
                  </button>
                  <div class="col-lg-12 py-2">
                    <slot></slot>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted } from "vue";
import { STATUS } from "../../utils/constants";

const emits = defineEmits(["onClose"]);

onMounted(() => {
  document.body.style.overflow = "hidden";
});

onUnmounted(() => {
  document.body.style.overflow = "";
});

function onClose() {
  emits("onClose", STATUS.CANCELLED);
}
</script>
