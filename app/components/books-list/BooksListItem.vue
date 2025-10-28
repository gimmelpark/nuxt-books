<script setup lang="ts">
import type { IBooksVolume } from "#shared/interfaces/IBooksVolume";

const { bookVolume } = defineProps<{
  bookVolume: IBooksVolume;
}>();
</script>

<template>
  <div>{{ bookVolume.volumeInfo.title }}</div>
</template>

<style scoped></style>
