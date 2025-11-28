<script setup lang="ts">
import type { IBooksVolume } from "#shared/interfaces/IBooksVolume";

const route = useRoute();

const { data: bookVolume } = useFetch<IBooksVolume>(
  `/api/books/${route.params.bookId}`,
);
const bookInfo = computed(() => bookVolume.value?.volumeInfo ?? {});

const imgSrc = computed(() => {
  const imageLinks = bookInfo.value.imageLinks;

  if (!imageLinks) return "";

  return imageLinks.medium ?? imageLinks.small ?? "";
});

const parsedData = computed(() => {
  return Object.entries(bookInfo.value)
    .map(([key, value]) => ({
      key,
      value: typeof value === "object" ? value : null,
    }))
    .filter(({ value }) => !!value);
});
</script>

<template>
  <div class="flex w-full justify-center">
    <div class="mt-8 flex w-250">
      <div class="flex-shrink-0">
        <NuxtImg :src="imgSrc" width="200" height="400" />
      </div>

      <div class="ml-5 w-full flex-grow-0 overflow-x-hidden">
        <div class="text-xl font-bold">{{ bookInfo.title }}</div>
        <div>{{ (bookInfo.authors ?? []).join(", ") }}</div>

        <USeparator class="my-2" />

        <div v-for="field in parsedData" :key="field.key">
          <span class="font-bold">{{ field.key }}</span>
          :
          <span>{{ field.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
