<script setup lang="ts">
import { debounce } from "lodash";

const emit = defineEmits<{
  (event: "on-search", value: string): void;
}>();

const onInput = debounce((e: Event) => {
  /* emit("on-search", (e.target as HTMLInputElement).value); */
  emit("on-search", (e.target as HTMLInputElement).value);
}, 250);
</script>

<template>
  <div>
    <input
      type="text"
      class="form-control"
      placeholder="Search Band"
      @input="onInput"
    />
  </div>
</template>

<style scoped lang="scss"></style>
