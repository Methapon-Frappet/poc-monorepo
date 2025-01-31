<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { client } from '@/utils/api';

onMounted(async () => {
  response.value = await hello.index.get();
});

const hello = client.api.v1;
const response = ref<Awaited<ReturnType<typeof hello.index.get>> | null>(null);
</script>

<template>
  <div>
    <h1 class="tw:text-center tw:block tw:text-emerald-600">You did it!</h1>
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

  <hr class="tw:opacity-10 tw:my-4" />

  <h2 class="tw:text-center tw:mb-4 tw:text-gray-800">Elysia API Response</h2>
  <pre
    class="tw:bg-emerald-50/50 tw:text-gray-800 tw:rounded-md tw:transition tw:border tw:border-emerald-100 tw:hover:ring-4 tw:ring-emerald-600/50 tw:p-4 tw:text-left tw:shadow-lg"
    >{{ JSON.stringify(response, null, 4) }}</pre
  >
</template>

<style scoped></style>
