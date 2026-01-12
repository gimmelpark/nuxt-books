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

  const link = imageLinks.thumbnail ?? imageLinks.small ?? "";
  return link.replace("http:", "https:");
});

const router = useRouter();
const goBack = () => {
  if (history.state.back) {
    router.back();
  } else {
    navigateTo("/");
  }
};
</script>

<template>
  <div class="flex w-full justify-center">
    <div class="mt-8 w-250">
      <div class="flex w-full">
        <div class="flex-shrink-0">
          <NuxtImg :src="imgSrc" width="200" class="h-auto" />
        </div>

        <div class="ml-5 w-full flex-grow-0 overflow-x-hidden">
          <div class="flex items-start justify-between">
            <div class="text-xl font-bold">{{ bookInfo.title }}</div>

            <button
              class="text-primary-500 hover:text-primary-600 gap-1 flex flex-shrink-0 cursor-pointer items-center text-sm font-medium transition-colors"
              @click="goBack"
            >
              <UIcon name="i-heroicons-arrow-left" class="h-4 w-4" />
              Back to search
            </button>
          </div>
          <div class="mt-2 text-gray-600">
            {{ (bookInfo.authors ?? []).join(", ") }}
          </div>
        </div>
      </div>

      <USeparator class="my-4" />

      <div v-if="bookInfo.description" class="text-justify" v-html="bookInfo.description" />
    </div>
  </div>
</template>
