<script setup lang="ts">
import type { IBooksSearchFilter } from "#shared/interfaces/IBooksSearchFilter";
import type { IBooksVolume } from "#shared/interfaces/IBooksVolume";
import type { IBooksVolumeList } from "#shared/interfaces/IBooksVolumeList";

const searchFilters = ref<IBooksSearchFilter>({ searchString: "" });

const books = ref<IBooksVolume[] | null>(null);

const isBooksLoaded = computed(() => books.value !== null);

async function onSearch() {
  const response = await $fetch<IBooksVolumeList>("/api/volume/list", {
    params: searchFilters.value,
  });

  books.value = response.items;
}
</script>

<template>
  <div
    class="box-border flex h-screen max-h-screen w-full flex-col justify-center overflow-y-hidden"
  >
    <BooksListSearchInput
      :search-filters="searchFilters"
      class="mt-3 mb-3"
      @update-filters="searchFilters = $event"
      @search="onSearch"
    />

    <template v-if="isBooksLoaded">
      <USeparator />

      <div class="flex justify-center overflow-y-auto pt-5">
        <div class="h-fit w-150">
          <BooksListItem
            v-for="book in books"
            class="mb-5"
            :key="book.id"
            :book-volume="book"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped></style>
