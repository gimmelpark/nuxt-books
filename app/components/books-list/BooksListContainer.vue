<script setup lang="ts">
import type { IBooksSearchFilter } from "#shared/interfaces/IBooksSearchFilter";
import type { IBooksVolume } from "#shared/interfaces/IBooksVolume";
import type { IBooksVolumeList } from "#shared/interfaces/IBooksVolumeList";

const searchFilters = ref<IBooksSearchFilter>({ searchString: "" });

const books = ref<IBooksVolume[] | null>(null);

async function onSearch() {
  const response = await $fetch<IBooksVolumeList>("/api/volume/list", {
    params: searchFilters.value,
  });

  books.value = response.items;
}
</script>

<template>
  <BooksListSearchInput
    :search-filters="searchFilters"
    :with-list="books !== null"
    @update-filters="searchFilters = $event"
    @search="onSearch"
  />

  <div class="mt-5 flex w-full justify-center">
    <div v-if="books !== null" class="w-150">
      <BooksListItem v-for="book in books" :key="book.id" :book-volume="book" />
    </div>
  </div>
</template>

<style scoped></style>
