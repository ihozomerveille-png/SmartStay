import axios from 'axios'

const apiKey = import.meta.env.VITE_RAPID_API_KEY
const apiHost = import.meta.env.VITE_RAPID_API_HOST

const api = axios.create({
  baseURL: 'https://airbnb19.p.rapidapi.com/api/v2',
  headers: {
    'x-rapidapi-key': apiKey,
    'x-rapidapi-host': apiHost,
    'Content-Type': 'application/json',
  },
})

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 429) {
      console.error('Rate limit reached. Please try again later.')
    }
    return Promise.reject(error)
  }
)

export default api
