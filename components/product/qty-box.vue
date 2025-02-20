<template>
  <div class="qty-box">
    <div class="input-group !justify-start">
      <span class="input-group-prepend">
        <button
          type="button"
          class="btn quantity-left-minus"
          data-type="minus"
          data-field
          :disabled="counter === min"
          @click="decrement()"
        >
          <i class="ti-angle-left"></i>
        </button>
      </span>
      <input
        type="text"
        name="quantity"
        class="form-control input-number"
        :disabled="counter >= max"
        v-model="counter"
      />
      <span class="input-group-prepend">
        <button
          type="button"
          class="btn quantity-right-plus"
          data-type="plus"
          data-field
          :disabled="counter === max"
          @click="increment()"
        >
          <i class="ti-angle-right"></i>
        </button>
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";

interface IProps {
  modelValue: number;
  min?: number;
  max: number;
}

const props = withDefaults(defineProps<IProps>(), {
  min: 1,
});
const emits = defineEmits(["update:modelValue"]);

const counter = ref(props.modelValue);

watch(
  () => counter.value,
  () => {
    emits("update:modelValue", counter.value);
  }
);

function decrement() {
  if (counter.value > props.min) {
    counter.value--;
  }
}

function increment() {
  if (counter.value < props.max) {
    counter.value++;
  }
}
</script>
