import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'https://ai-travel-planner-1clk.onrender.com/api'

const instance = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {'Content-Type': 'application/json'}
})

export default {
  chat(payload){
    return instance.post('/chat', payload)
  },
  planTrip(payload){
    return instance.post('/plan-trip', payload)
  },
  searchDestination(q){
    return instance.get('/search-destination', {params:{q}})
  }
}
