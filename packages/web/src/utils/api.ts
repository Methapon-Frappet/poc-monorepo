import { apiClient } from 'lib'

export const client = apiClient(import.meta.env.VITE_API_URL, {
  onRequest: async (_path, _options) => {
    return {
      headers: {
        ['authorization']: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
      },
    }
  },
})
