<script setup lang="ts">
import type { IBooksVolume } from "#shared/interfaces/IBooksVolume";

const { bookVolume } = defineProps<{
  bookVolume: IBooksVolume;
}>();

const bookInfo = computed(() => bookVolume.volumeInfo);
const publicationDate = computed(() =>
  bookInfo.value.publishedDate
    ? `${new Date(bookInfo.value.publishedDate).getFullYear()}`
    : "",
);

const { data: language } = useFetch(`/api/language/${bookInfo.value.language}`);

const toLink = computed(() => ({
  name: "book-info",
  params: {
    bookId: bookVolume.id,
  },
}));
</script>

<template>
  <NuxtLink :to="toLink" class="block">
    <UContainer
      class="ring-primary cursor-pointer rounded-lg py-4 ring hover:bg-gray-100"
    >
      <div class="flex justify-between">
        <div class="font-bold">{{ bookInfo.title ?? "—" }}</div>

        <div class="text-secondary-500 ml-2">{{ language }}</div>
      </div>

      <div class="flex justify-between">
        <div class="text-gray-500">
          {{ bookInfo.authors?.join(", ") ?? "—" }}
        </div>

        <div class="ml-2 text-gray-500">{{ publicationDate }}</div>
      </div>

      <template v-if="bookInfo.subtitle">
        <USeparator class="my-2 w-full" color="primary" />

        <div class="text-sm text-gray-500">{{ bookInfo.subtitle }}</div>
      </template>
    </UContainer>
  </NuxtLink>
</template>
