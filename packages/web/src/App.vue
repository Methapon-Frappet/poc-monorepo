<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header class="tw:text-center tw:p-4">
    <nav>
      <RouterLink
        class="tw:inline-block tw:px-4 tw:py-2 tw:rounded tw:bg-emerald-600 tw:text-gray-50 tw:hover:bg-emerald-700 tw:transition tw:active:scale-[0.97] tw:font-medium"
        to="/"
      >
        Home
      </RouterLink>
    </nav>
  </header>
  <main class="tw:p-4"><RouterView /></main>
</template>

<style scoped></style>
