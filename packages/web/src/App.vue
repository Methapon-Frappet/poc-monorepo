<script setup lang="ts">
import { onMounted, ref } from "vue";
import { apiClient } from "lib";

const client = apiClient(import.meta.env.VITE_API_URL, {
  onRequest: async (_path, _options) => {
    return {
      headers: {
        ["authorization"]: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
      },
    };
  },
});
const greet = client.api.v1.greet;

const response = ref<Awaited<ReturnType<typeof greet.index.get>>>();

onMounted(async () => {
  response.value = await greet.index.get();
});
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>

    <pre>{{ JSON.stringify(response, null, 4) }}</pre>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
pre {
  text-align: left;
}
</style>
