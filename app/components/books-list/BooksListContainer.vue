<script setup lang="ts">
import type { IBooksSearchFilter } from "#shared/interfaces/IBooksSearchFilter";
import type { IBooksVolumeList } from "#shared/interfaces/IBooksVolumeList";
import type { IBooksVolume } from "#shared/interfaces/IBooksVolume";

const route = useRoute();
const searchFilters = computed(() => ({ searchString: "", ...route.query }));
const page = ref<number>(0);

const { data, pending, refresh } = useAsyncData<IBooksVolumeList>(
  "books",
  () =>
    $fetch<IBooksVolumeList>("/api/volume/list", {
      params: {
        ...searchFilters.value,
        page: page.value,
      },
    }),
  {
    immediate: !!searchFilters.value.searchString,
  },
);

const books = ref<null | IBooksVolume[]>(null);
watch(data, (value) => {
  if (value) {
    books.value = [...(books.value ?? []), ...value.items];
  }
});
const isBooksLoaded = computed(() => books.value !== null);

const isLoadingNewSearch = computed(
  () => books.value === null && pending.value,
);
const isLoadingMore = computed(() => books.value !== null && pending.value);

async function onSearch(filters: IBooksSearchFilter) {
  books.value = null;
  page.value = 0;

  await navigateTo({
    path: route.path,
    query: { ...filters },
  });

  await refresh();
}

const listScrollRef = useTemplateRef("listScroll");
watch(listScrollRef, (value, oldValue) => {
  if (oldValue === null && value !== null) {
    useInfiniteScroll(
      value as HTMLElement,
      async () => {
        page.value++;
        await refresh();
      },
      { distance: 30 },
    );
  }
});
</script>

<template>
  <div
    class="box-border flex h-screen max-h-screen w-full flex-col overflow-y-hidden"
    :class="{ 'justify-center': !isLoadingNewSearch }"
  >
    <BooksListSearchInput
      :search-filters="searchFilters"
      :is-loading="isLoadingNewSearch"
      class="mt-3 mb-3"
      @search="onSearch"
    />

    <template v-if="isBooksLoaded || isLoadingNewSearch">
      <USeparator />

      <div ref="listScroll" class="flex justify-center overflow-y-auto pt-5">
        <Loader v-if="isLoadingNewSearch" />

        <div v-else class="h-fit w-150">
          <BooksListItem
            v-for="book in books"
            class="mb-5"
            :key="book.id"
            :book-volume="book"
          />

          <Loader v-if="isLoadingMore" />
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped></style>
