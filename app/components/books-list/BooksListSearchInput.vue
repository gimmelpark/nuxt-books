<script setup lang="ts">
import type { IBooksSearchFilter } from "#shared/interfaces/IBooksSearchFilter";

interface IProps {
  searchFilters: IBooksSearchFilter;
}

const { searchFilters } = defineProps<IProps>();

const emit = defineEmits<{
  (e: "update-filters", value: IBooksSearchFilter): void;
  (e: "search"): void;
}>();

const searchInputRef = useTemplateRef<{
  inputRef: HTMLInputElement;
}>("searchInput");

defineShortcuts({
  enter: {
    usingInput: "searchInput",
    handler: () => onSearch(),
  },
});

function onSearch() {
  if (searchFilters.searchString) {
    searchInputRef.value?.inputRef.blur();
    emit("search");
  }
}
</script>

<template>
  <div class="align-center flex justify-center">
    <UInput
      :model-value="searchFilters.searchString"
      ref="searchInput"
      name="searchInput"
      icon="material-symbols-light:search-rounded"
      class="w-100"
      placeholder="Search..."
      @update:modelValue="
        emit('update-filters', { ...searchFilters, searchString: $event })
      "
    />

    <UButton class="ml-2 cursor-pointer" @click="onSearch">Search</UButton>
  </div>
</template>

<style scoped></style>
