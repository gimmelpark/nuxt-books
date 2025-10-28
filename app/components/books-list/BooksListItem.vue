<script setup lang="ts">
import type { IBooksVolume } from "#shared/interfaces/IBooksVolume";

const { bookVolume } = defineProps<{
  bookVolume: IBooksVolume;
}>();
</script>

<template>
  <UCard>
    <div>{{ bookVolume.volumeInfo.title ?? "—" }}</div>
    <div>{{ bookVolume.volumeInfo.authors?.join(", ") ?? "—" }}</div>
  </UCard>
</template>

<style scoped></style>
