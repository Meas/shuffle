<script setup lang="ts">
import type { Ref } from "vue";
import type { ShuffleItem as ShuffleItemType } from "@/models/shuffleItem.interface";
import { ref, onMounted, onUnmounted } from "vue";

import ShuffleItem from "@/components/shuffle/ShuffleItem.vue";
import ShuffleSearch from "@/components/shuffle/ShuffleSearch.vue";

import useApi from "@/composables/useApi";
import { getData } from "@/services/itunesService";
import type { ItunesItem } from "@/services/itunesService";

import {
  getDefaultValues,
  handleCollectionSort,
} from "@/utils/shuffleItemsUtils";

// Composables
const { apiState, fetchData } = useApi<ItunesItem[]>();

// Data
const list: Ref<ShuffleItemType[]> = ref(getDefaultValues());

let interval: ReturnType<typeof setInterval>;
let collectionList: ShuffleItemType[] = [];
let collectionIndex = 0;
let shouldUpdateFromCollection = true;

// Methods
const helloWorld = () => {
  console.log("hello world");
  clearInterval(interval);
};
const init = () => {
  interval = setInterval(() => {
    handleItemShift();
  }, 1000);
};
const onSearch = async (e: string) => {
  await fetchData(getData(e));

  if (apiState.data === null || apiState.data?.length === 0 || apiState.error)
    return;

  collectionIndex = 0;
  shouldUpdateFromCollection = true;

  collectionList = handleCollectionSort(apiState.data);
  console.log(collectionList);
};
const handleItemShift = () => {
  const item = list.value.shift();
  // Opted out to not update the list the item is already there (per tick)
  // since this case was not covered in the assignment
  if (shouldUpdateList()) return handleAddCollectionToList();
  else if (item) list.value.push(item);
};
const handleAddCollectionToList = () => {
  list.value[4] = collectionList[collectionIndex];
  collectionIndex++;
  if (collectionIndex == collectionList.length)
    shouldUpdateFromCollection = false;
};
const shouldUpdateList = () => {
  return (
    shouldUpdateFromCollection &&
    collectionList.length &&
    !list.value.some((item) => item.id === collectionList[collectionIndex].id)
  );
};

// Lifecycle
onMounted(init);
onUnmounted(() => clearInterval(interval));
</script>

<template>
  <div>
    <h1 class="text-center" @click="helloWorld">Itunes Shuffle</h1>
    <div class="col-12 col-md-8 col-lg-6 mx-auto mt-5">
      <ShuffleSearch @on-search="onSearch" />
    </div>
    <div class="list col-12 col-md-8 col-lg-6 mx-auto p-3 mt-3">
      <TransitionGroup name="list" tag="div">
        <div v-for="item in list" :key="item.id" class="mt-2">
          <ShuffleItem :item="item" />
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped lang="scss">
.list {
  background: #eee;
  border-radius: 15px;
  border: 1px solid #000;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-active {
  position: absolute;
}
</style>
