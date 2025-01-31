<script setup lang="ts">
defineProps<{ msg: string }>();
</script>

<template>
  <div>
    <h1 class="tw:text-center tw:block tw:text-emerald-600">{{ msg }}</h1>
    <div class="tw:grid tw:grid-cols-12 tw:gap-4">
      <p class="tw:col-span-6 tw:col-start-4 tw:p-4 tw:text-center">
        You’ve successfully created a project with
        <a
          class="tw:text-blue-600 tw:font-medium tw:hover:underline"
          href="https://vite.dev/"
          target="_blank"
          rel="noopener"
          >Vite</a
        >
        +
        <a
          class="tw:text-emerald-600 tw:font-medium tw:hover:underline"
          href="https://vuejs.org/"
          target="_blank"
          rel="noopener"
          >Vue 3</a
        >. What's next?
      </p>
    </div>
  </div>
</template>

<style scoped></style>
