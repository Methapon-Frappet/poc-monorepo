<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { client } from '@/utils/api';
import HelloWorld from '@/components/HelloWorld.vue';

onMounted(async () => {
  response.value = await hello.index.get();
});

const hello = client.api.v1;
const response = ref<Awaited<ReturnType<typeof hello.index.get>> | null>(null);
</script>

<template>
  <HelloWorld msg="You did it!" />
  <hr class="tw:opacity-10 tw:my-4" />

  <h2 class="tw:text-center tw:mb-4 tw:text-gray-800">Elysia API Response</h2>
  <pre
    class="tw:bg-emerald-50/50 tw:text-gray-800 tw:rounded-md tw:transition tw:border tw:border-emerald-100 tw:hover:ring-4 tw:ring-emerald-600/50 tw:p-4 tw:text-left tw:shadow-lg"
    >{{ JSON.stringify(response, null, 4) }}</pre
  >
</template>

<style scoped></style>
