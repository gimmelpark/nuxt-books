<script setup lang="ts">
import type { IBooksSearchFilter } from "#shared/interfaces/IBooksSearchFilter";

interface IProps {
  searchFilters: IBooksSearchFilter;
  withList?: boolean;
}

const emit = defineEmits<{
  (e: "update-filters", value: IBooksSearchFilter): void;
  (e: "search"): void;
}>();

const { searchFilters } = defineProps<IProps>();

function onSearch() {
  if (searchFilters.searchString) {
    emit("search");
  }
}
</script>

<template>
  <div
    class="flex w-full flex-col justify-center"
    :class="{
      'min-h-[calc(100vh-var(--ui-header-height))]': !withList,
      'pt-5': withList,
    }"
  >
    <div class="align-center flex justify-center">
      <UInput
        :model-value="searchFilters.searchString"
        icon="material-symbols-light:search-rounded"
        class="w-100"
        placeholder="Search..."
        @update:modelValue="
          emit('update-filters', { ...searchFilters, searchString: $event })
        "
      />

      <UButton class="ml-2 cursor-pointer" @click="onSearch">Search</UButton>
    </div>
  </div>
</template>

<style scoped></style>
