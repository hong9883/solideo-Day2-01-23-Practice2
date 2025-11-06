import axios from 'axios'
import { SearchParams, TravelPreferences, TripPlan } from '../types'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const searchRoutes = async (
  params: SearchParams,
  preferences: TravelPreferences
): Promise<TripPlan> => {
  const response = await api.post('/api/search', {
    ...params,
    preferences,
  })
  return response.data
}

export const getDestinationRecommendations = async (
  location: string,
  preferences: TravelPreferences
) => {
  const response = await api.post('/api/recommendations/destinations', {
    location,
    preferences,
  })
  return response.data
}

export const getRestaurantRecommendations = async (
  location: string,
  preferences: TravelPreferences
) => {
  const response = await api.post('/api/recommendations/restaurants', {
    location,
    preferences,
  })
  return response.data
}

export default api
