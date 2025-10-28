<script setup lang="ts">
import type { IBooksSearchFilter } from "#shared/interfaces/IBooksSearchFilter";

const searchFilters = ref<IBooksSearchFilter>({ searchString: "" });

watch(searchFilters, (value) => {
  console.log(value);
});
</script>

<template>
  <BooksListSearchInput
    :search-filters="searchFilters"
    @update-filters="searchFilters = $event"
  />
</template>

<style scoped></style>
