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

// const thumbnailUrl = computed(
//   () =>
//     bookVolume.volumeInfo?.imageLinks?.smallThumbnail ??
//     bookVolume.volumeInfo?.imageLinks?.thumbnail ??
//     "",
// );
</script>

<template>
  <UContainer
    class="ring-default hover:bg-secondary-50 cursor-pointer rounded-lg py-4 ring"
  >
    <div class="flex justify-between">
      <div class="font-bold">{{ bookInfo.title ?? "—" }}</div>

      <div>{{ publicationDate }}</div>
    </div>

    <div class="text-gray-500">
      {{ bookInfo.authors?.join(", ") ?? "—" }}
    </div>

    <template v-if="bookInfo.subtitle">
      <USeparator class="my-2 w-full" />

      <div class="text-sm text-gray-500">{{ bookInfo.subtitle }}</div>
    </template>
  </UContainer>
</template>

<style scoped></style>
