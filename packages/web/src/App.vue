<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { apiClient } from 'lib'

const client = apiClient(import.meta.env.VITE_API_URL, {
  onRequest: async (_path, _options) => {
    return {
      headers: {
        ['authorization']: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
      },
    }
  },
})
const greet = client.api.v1.greet

const response = ref<Awaited<ReturnType<typeof greet.index.get>>>()

onMounted(async () => {
  response.value = await greet.index.get()
})
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
    </nav>
  </header>

  <RouterView />

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
