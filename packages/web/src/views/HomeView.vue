<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { client } from '@/utils/api';
import HelloWorld from '@/components/HelloWorld.vue';

onMounted(async () => {
  response.value = await greet.index.get();
});

const greet = client.api.v1.greet;
const response = ref<Awaited<ReturnType<typeof greet.index.get>>>();
</script>

<template>
  <HelloWorld msg="You did it!" />

  <pre>{{ JSON.stringify(response, null, 4) }}</pre>
</template>

<style scoped>
pre {
  background-color: hsla(240 20% 96% / 1);
  padding: 1rem;
  border-radius: 7px;
  border: 1px solid hsla(240 20% 92% / 0.1);
  text-align: left;
}
</style>
