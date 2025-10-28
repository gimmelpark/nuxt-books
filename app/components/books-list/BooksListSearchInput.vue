<script setup lang="ts">
import type { IBooksSearchFilter } from "#shared/interfaces/IBooksSearchFilter";

interface IProps {
  searchFilters: IBooksSearchFilter;
}

const emit = defineEmits<{
  (e: "update-filters", value: IBooksSearchFilter): void;
}>();

const { searchFilters } = defineProps<IProps>();
</script>

<template>
  <div
    class="flex min-h-[calc(100vh-var(--ui-header-height))] w-full flex-col justify-center"
  >
    <div class="align-center flex justify-center">
      <UInput
        :model-value="searchFilters.searchString"
        class="w-100"
        placeholder="Search..."
        @update:modelValue="
          emit('update-filters', { ...searchFilters, searchString: $event })
        "
      />
    </div>
  </div>
</template>

<style scoped></style>
