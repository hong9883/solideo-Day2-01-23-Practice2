// Location types
export interface Location {
  name: string;
  address: string;
  lat: number;
  lng: number;
}

// Transportation types
export enum TransportType {
  BUS = 'bus',
  TRAIN = 'train',
  FLIGHT = 'flight',
  SUBWAY = 'subway',
  TAXI = 'taxi',
  WALK = 'walk',
}

export interface TransportSegment {
  id: string;
  type: TransportType;
  from: Location;
  to: Location;
  departureTime: string;
  arrivalTime: string;
  duration: number; // in minutes
  price: number; // in KRW
  provider: string;
  routeNumber?: string;
  polyline?: string;
}

export interface Route {
  id: string;
  segments: TransportSegment[];
  totalDuration: number;
  totalPrice: number;
  departureTime: string;
  arrivalTime: string;
}

// User preferences
export interface TravelPreferences {
  travelStyle: TravelStyle[];
  foodPreferences: FoodPreference[];
  budget: BudgetLevel;
  pace: TravelPace;
  interests: string[];
}

export enum TravelStyle {
  LUXURY = 'luxury',
  BUDGET = 'budget',
  ADVENTURE = 'adventure',
  RELAXATION = 'relaxation',
  CULTURAL = 'cultural',
  NATURE = 'nature',
  URBAN = 'urban',
  FAMILY = 'family',
}

export enum FoodPreference {
  KOREAN = 'korean',
  JAPANESE = 'japanese',
  CHINESE = 'chinese',
  WESTERN = 'western',
  VEGETARIAN = 'vegetarian',
  VEGAN = 'vegan',
  STREET_FOOD = 'street_food',
  FINE_DINING = 'fine_dining',
  LOCAL = 'local',
  CAFE = 'cafe',
}

export enum BudgetLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  LUXURY = 'luxury',
}

export enum TravelPace {
  SLOW = 'slow',
  MODERATE = 'moderate',
  FAST = 'fast',
}

// Destination types
export interface Destination {
  id: string;
  name: string;
  description: string;
  location: Location;
  category: string[];
  rating: number;
  images: string[];
  priceLevel: number; // 1-4
  tags: string[];
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  location: Location;
  cuisine: FoodPreference[];
  rating: number;
  priceRange: string;
  images: string[];
  openingHours?: string;
  phoneNumber?: string;
}

// Trip planning
export interface TripPlan {
  id: string;
  departure: Location;
  arrival: Location;
  departureTime: string;
  duration: number; // in days
  routes: Route[];
  recommendations: {
    destinations: Destination[];
    restaurants: Restaurant[];
  };
  preferences: TravelPreferences;
}

// Search state
export interface SearchParams {
  departure: string;
  arrival: string;
  departureTime: Date;
  duration: number;
}
