<script setup lang="ts">
import type { IBooksSearchFilter } from "#shared/interfaces/IBooksSearchFilter";
import type { IBooksVolumeList } from "#shared/interfaces/IBooksVolumeList";
import type { IBooksVolume } from "#shared/interfaces/IBooksVolume";

interface IProps {
  searchFilters: IBooksSearchFilter;
}

const { searchFilters } = defineProps<IProps>();

const page = ref<number>(0);

const queryParams = computed(() => ({
  ...searchFilters,
  page: page.value,
}));

const books = useState<null | IBooksVolume[]>("books", () => null);
const totalItems = useState<null | number>("total-items", () => null);

const { status } = useFetch<IBooksVolumeList>("/api/books", {
  query: queryParams,
  onResponse({ response: { _data: data } }) {
    if (!data) throw new Error("No data");

    totalItems.value = data.totalItems;
    books.value = [...(books.value ?? []), ...(data.items ?? [])];
  },
});

watch(
  () => searchFilters,
  () => {
    page.value = 0;
    books.value = null;
  },
);

const isLoadingNewSearch = computed(
  () => books.value === null && status.value === "pending",
);
const isLoadingMore = computed(
  () => books.value !== null && status.value === "pending",
);

const config = useRuntimeConfig();
const size = config.public.apiPageSize as number;
const canLoadMore = computed(
  () =>
    status.value !== "pending" &&
    !!totalItems.value &&
    size * page.value <= (totalItems.value ?? 0),
);

const listScrollRef = useTemplateRef("listScroll");
onMounted(() => {
  useInfiniteScroll(
    listScrollRef.value as HTMLElement,
    async () => {
      page.value++;
    },
    { distance: 30, canLoadMore: () => canLoadMore.value },
  );
});
</script>

<template>
  <div ref="listScroll" class="flex justify-center overflow-y-auto pt-5">
    <Loader v-if="isLoadingNewSearch" />

    <BooksListNothingFound v-else-if="totalItems === 0" />

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
