<script setup lang="ts">
import type { IBooksSearchFilter } from "#shared/interfaces/IBooksSearchFilter";

const searchInputRef = useTemplateRef<{
  inputRef: HTMLInputElement;
}>("searchInput");

interface IProps {
  searchFilters: IBooksSearchFilter;
  isLoading?: boolean;
}

const { searchFilters, isLoading } = defineProps<IProps>();

const emit = defineEmits<{
  (e: "search", value: IBooksSearchFilter): void;
}>();

const localSearchString = ref<string>(searchFilters.searchString);

watch(
  () => searchFilters,
  (value) => {
    if (localSearchString.value !== value.searchString) {
      localSearchString.value = value.searchString;
    }
  },
);

function onSearch() {
  if (localSearchString.value && !isLoading) {
    searchInputRef.value?.inputRef.blur();
    emit("search", { searchString: localSearchString.value });
  }
}

defineShortcuts({
  enter: {
    usingInput: "searchInput",
    handler: () => onSearch(),
  },
});
</script>

<template>
  <div class="align-center flex justify-center">
    <UInput
      v-model="localSearchString"
      ref="searchInput"
      name="searchInput"
      icon="material-symbols-light:search-rounded"
      class="w-100"
      :placeholder="isLoading ? 'Loading...' : 'Search for books'"
      :loading="isLoading"
    />

    <UButton class="ml-2 cursor-pointer" @click="onSearch">Search</UButton>
  </div>
</template>

<style scoped></style>
