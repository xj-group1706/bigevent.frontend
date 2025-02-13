<template>
  <modal @onClose="onClose">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, rem.
  </modal>
</template>
<script lang="ts" setup>
import modal from "../ui/modal.vue";

const props = defineProps({
  modelValue: Boolean,
});

const emits = defineEmits(["update:modelValue"]);

function onClose(e: string) {
  emits("update:modelValue", false);
}
</script>
