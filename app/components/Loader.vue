<script setup lang="ts"></script>

<template>
  <div class="flex w-full justify-center">
    <div class="loader"></div>
  </div>
</template>

<style scoped>
@import "tailwindcss";

.loader {
  width: 32px;
  height: 16px;
  display: flex;
  animation: l9-0 1s infinite;
}
.loader:before,
.loader:after {
  content: "";
  flex: 1;
  background: var(--color-primary);
  transform-origin: top right;
  animation: l9-1 1s infinite;
}
.loader:after {
  background: var(--color-secondary);
  transform-origin: top left;
  --s: -1;
}
@keyframes l9-0 {
  100% {
    transform: translateY(100%);
  }
}
@keyframes l9-1 {
  100% {
    transform: rotate(calc(var(--s, 1) * 90deg));
  }
}
</style>
