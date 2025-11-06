import { Router, Request, Response } from 'express';
import { SearchRequest, TripPlan } from '../types';
import { geocodeLocation } from '../services/geocoding';
import { generateTransportRoutes } from '../services/transportationService';
import {
  getDestinationRecommendations,
  getRestaurantRecommendations,
} from '../services/recommendationService';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const searchData: SearchRequest = req.body;

    // Validate request
    if (!searchData.departure || !searchData.arrival) {
      return res.status(400).json({
        error: 'Departure and arrival locations are required',
      });
    }

    // Geocode locations
    const departureLocation = geocodeLocation(searchData.departure);
    const arrivalLocation = geocodeLocation(searchData.arrival);

    // Generate transport routes
    const departureTime = new Date(searchData.departureTime);
    const routes = generateTransportRoutes(
      departureLocation,
      arrivalLocation,
      departureTime,
      searchData.preferences
    );

    // Get recommendations based on arrival location and preferences
    const destinations = getDestinationRecommendations(
      arrivalLocation,
      searchData.preferences
    );
    const restaurants = getRestaurantRecommendations(
      arrivalLocation,
      searchData.preferences
    );

    // Create trip plan
    const tripPlan: TripPlan = {
      id: `trip-${Date.now()}`,
      departure: departureLocation,
      arrival: arrivalLocation,
      departureTime: departureTime.toISOString(),
      duration: searchData.duration,
      routes,
      recommendations: {
        destinations,
        restaurants,
      },
      preferences: searchData.preferences,
    };

    res.json(tripPlan);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      error: 'Failed to process search request',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
