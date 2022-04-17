<script setup lang="ts">
import type { ShuffleItem as ShuffleItemType } from "@/models/shuffleItem.interface";

defineProps<{
  item: ShuffleItemType;
}>();
</script>

<template>
  <div class="item text-center py-2">{{ item.value }}</div>
</template>

<style scoped lang="scss">
.item {
  background: #fff;
  border-radius: 15px;
  border: 1px solid #000;
}
</style>
