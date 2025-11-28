<script setup lang="ts">
definePageMeta({
  name: "books-list",
});

const route = useRoute();

const pageTitle = computed(() =>
  route.query.searchString
    ? `${route.query.searchString} — Nuxt Books Search`
    : "Nuxt Books Search",
);

watch(
  pageTitle,
  () => {
    useHead({
      title: pageTitle.value,
    });
  },
  { immediate: true },
);
</script>

<template>
  <BooksListContainer />
</template>
