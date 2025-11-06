import { Router, Request, Response } from 'express';
import { TravelPreferences } from '../types';
import { geocodeLocation } from '../services/geocoding';
import {
  getDestinationRecommendations,
  getRestaurantRecommendations,
} from '../services/recommendationService';

const router = Router();

router.post('/destinations', async (req: Request, res: Response) => {
  try {
    const { location, preferences } = req.body as {
      location: string;
      preferences: TravelPreferences;
    };

    if (!location) {
      return res.status(400).json({ error: 'Location is required' });
    }

    const geoLocation = geocodeLocation(location);
    const destinations = getDestinationRecommendations(geoLocation, preferences);

    res.json(destinations);
  } catch (error) {
    console.error('Destination recommendations error:', error);
    res.status(500).json({
      error: 'Failed to get destination recommendations',
    });
  }
});

router.post('/restaurants', async (req: Request, res: Response) => {
  try {
    const { location, preferences } = req.body as {
      location: string;
      preferences: TravelPreferences;
    };

    if (!location) {
      return res.status(400).json({ error: 'Location is required' });
    }

    const geoLocation = geocodeLocation(location);
    const restaurants = getRestaurantRecommendations(geoLocation, preferences);

    res.json(restaurants);
  } catch (error) {
    console.error('Restaurant recommendations error:', error);
    res.status(500).json({
      error: 'Failed to get restaurant recommendations',
    });
  }
});

export default router;
