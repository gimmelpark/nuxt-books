<script setup lang="ts">
import type { IBooksSearchFilter } from "#shared/interfaces/IBooksSearchFilter";

const route = useRoute();
const searchFilters = computed(() => ({ searchString: "", ...route.query }));

async function onSearch(filters: IBooksSearchFilter) {
  await navigateTo({
    path: route.path,
    query: { ...filters },
  });
}
</script>

<template>
  <div
    class="box-border flex h-screen max-h-screen w-full flex-col overflow-y-hidden"
    :class="{ 'justify-center': !searchFilters.searchString }"
  >
    <BooksListSearchInput
      :search-filters="searchFilters"
      class="mt-3 mb-3"
      @search="onSearch"
    />

    <template v-if="searchFilters.searchString">
      <USeparator />

      <BooksList :search-filters="searchFilters" />
    </template>
  </div>
</template>
