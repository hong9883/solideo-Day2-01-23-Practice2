import {
  Location,
  TransportSegment,
  TransportType,
  Route,
  TravelPreferences,
  BudgetLevel,
} from '../types';
import { calculateDistance } from './geocoding';

export function generateTransportRoutes(
  departure: Location,
  arrival: Location,
  departureTime: Date,
  preferences: TravelPreferences
): Route[] {
  const distance = calculateDistance(departure, arrival);
  const routes: Route[] = [];

  // Generate different route options based on distance
  if (distance < 50) {
    // Short distance - bus, subway, taxi options
    routes.push(generateBusRoute(departure, arrival, departureTime, preferences));
    routes.push(generateSubwayRoute(departure, arrival, departureTime, preferences));
    if (preferences.budget !== BudgetLevel.LOW) {
      routes.push(generateTaxiRoute(departure, arrival, departureTime, preferences));
    }
  } else if (distance < 200) {
    // Medium distance - train, bus options
    routes.push(generateTrainRoute(departure, arrival, departureTime, preferences));
    routes.push(generateExpressBusRoute(departure, arrival, departureTime, preferences));
  } else {
    // Long distance - flight, train, bus options
    if (preferences.budget !== BudgetLevel.LOW) {
      routes.push(generateFlightRoute(departure, arrival, departureTime, preferences));
    }
    routes.push(generateKTXRoute(departure, arrival, departureTime, preferences));
    routes.push(generateExpressBusRoute(departure, arrival, departureTime, preferences));
  }

  // Sort by price or duration based on preferences
  if (preferences.budget === BudgetLevel.LOW) {
    routes.sort((a, b) => a.totalPrice - b.totalPrice);
  } else {
    routes.sort((a, b) => a.totalDuration - b.totalDuration);
  }

  return routes;
}

function generateBusRoute(
  departure: Location,
  arrival: Location,
  departureTime: Date,
  preferences: TravelPreferences
): Route {
  const distance = calculateDistance(departure, arrival);
  const duration = Math.ceil(distance * 2); // ~2 minutes per km
  const arrivalTime = new Date(departureTime.getTime() + duration * 60000);

  const segment: TransportSegment = {
    id: `bus-${Date.now()}`,
    type: TransportType.BUS,
    from: departure,
    to: arrival,
    departureTime: departureTime.toISOString(),
    arrivalTime: arrivalTime.toISOString(),
    duration,
    price: Math.ceil(distance * 50), // ~50원 per km
    provider: '시내버스',
    routeNumber: `${Math.floor(Math.random() * 900) + 100}번`,
  };

  return {
    id: `route-bus-${Date.now()}`,
    segments: [segment],
    totalDuration: duration,
    totalPrice: segment.price,
    departureTime: departureTime.toISOString(),
    arrivalTime: arrivalTime.toISOString(),
  };
}

function generateSubwayRoute(
  departure: Location,
  arrival: Location,
  departureTime: Date,
  preferences: TravelPreferences
): Route {
  const distance = calculateDistance(departure, arrival);
  const duration = Math.ceil(distance * 1.5); // ~1.5 minutes per km
  const arrivalTime = new Date(departureTime.getTime() + duration * 60000);

  const segment: TransportSegment = {
    id: `subway-${Date.now()}`,
    type: TransportType.SUBWAY,
    from: departure,
    to: arrival,
    departureTime: departureTime.toISOString(),
    arrivalTime: arrivalTime.toISOString(),
    duration,
    price: 1400,
    provider: '서울교통공사',
    routeNumber: `${Math.floor(Math.random() * 9) + 1}호선`,
  };

  return {
    id: `route-subway-${Date.now()}`,
    segments: [segment],
    totalDuration: duration,
    totalPrice: segment.price,
    departureTime: departureTime.toISOString(),
    arrivalTime: arrivalTime.toISOString(),
  };
}

function generateTaxiRoute(
  departure: Location,
  arrival: Location,
  departureTime: Date,
  preferences: TravelPreferences
): Route {
  const distance = calculateDistance(departure, arrival);
  const duration = Math.ceil(distance * 1.2); // ~1.2 minutes per km
  const arrivalTime = new Date(departureTime.getTime() + duration * 60000);

  const segment: TransportSegment = {
    id: `taxi-${Date.now()}`,
    type: TransportType.TAXI,
    from: departure,
    to: arrival,
    departureTime: departureTime.toISOString(),
    arrivalTime: arrivalTime.toISOString(),
    duration,
    price: 4000 + Math.ceil(distance * 1000), // Base fare + per km
    provider: '일반택시',
  };

  return {
    id: `route-taxi-${Date.now()}`,
    segments: [segment],
    totalDuration: duration,
    totalPrice: segment.price,
    departureTime: departureTime.toISOString(),
    arrivalTime: arrivalTime.toISOString(),
  };
}

function generateTrainRoute(
  departure: Location,
  arrival: Location,
  departureTime: Date,
  preferences: TravelPreferences
): Route {
  const distance = calculateDistance(departure, arrival);
  const duration = Math.ceil(distance * 0.8); // ~0.8 minutes per km
  const arrivalTime = new Date(departureTime.getTime() + duration * 60000);

  const segment: TransportSegment = {
    id: `train-${Date.now()}`,
    type: TransportType.TRAIN,
    from: departure,
    to: arrival,
    departureTime: departureTime.toISOString(),
    arrivalTime: arrivalTime.toISOString(),
    duration,
    price: Math.ceil(distance * 100), // ~100원 per km
    provider: '코레일',
    routeNumber: '무궁화호',
  };

  return {
    id: `route-train-${Date.now()}`,
    segments: [segment],
    totalDuration: duration,
    totalPrice: segment.price,
    departureTime: departureTime.toISOString(),
    arrivalTime: arrivalTime.toISOString(),
  };
}

function generateKTXRoute(
  departure: Location,
  arrival: Location,
  departureTime: Date,
  preferences: TravelPreferences
): Route {
  const distance = calculateDistance(departure, arrival);
  const duration = Math.ceil(distance * 0.4); // ~0.4 minutes per km (high-speed)
  const arrivalTime = new Date(departureTime.getTime() + duration * 60000);

  const segment: TransportSegment = {
    id: `ktx-${Date.now()}`,
    type: TransportType.TRAIN,
    from: departure,
    to: arrival,
    departureTime: departureTime.toISOString(),
    arrivalTime: arrivalTime.toISOString(),
    duration,
    price: Math.ceil(distance * 150), // ~150원 per km
    provider: '코레일',
    routeNumber: 'KTX',
  };

  return {
    id: `route-ktx-${Date.now()}`,
    segments: [segment],
    totalDuration: duration,
    totalPrice: segment.price,
    departureTime: departureTime.toISOString(),
    arrivalTime: arrivalTime.toISOString(),
  };
}

function generateExpressBusRoute(
  departure: Location,
  arrival: Location,
  departureTime: Date,
  preferences: TravelPreferences
): Route {
  const distance = calculateDistance(departure, arrival);
  const duration = Math.ceil(distance * 1.0); // ~1 minute per km
  const arrivalTime = new Date(departureTime.getTime() + duration * 60000);

  const segment: TransportSegment = {
    id: `express-bus-${Date.now()}`,
    type: TransportType.BUS,
    from: departure,
    to: arrival,
    departureTime: departureTime.toISOString(),
    arrivalTime: arrivalTime.toISOString(),
    duration,
    price: Math.ceil(distance * 80), // ~80원 per km
    provider: '고속버스',
  };

  return {
    id: `route-express-bus-${Date.now()}`,
    segments: [segment],
    totalDuration: duration,
    totalPrice: segment.price,
    departureTime: departureTime.toISOString(),
    arrivalTime: arrivalTime.toISOString(),
  };
}

function generateFlightRoute(
  departure: Location,
  arrival: Location,
  departureTime: Date,
  preferences: TravelPreferences
): Route {
  const distance = calculateDistance(departure, arrival);
  const flightDuration = Math.max(60, Math.ceil(distance * 0.15)); // Minimum 60 min, ~0.15 min per km
  const totalDuration = flightDuration + 120; // Add 2 hours for check-in/boarding
  const arrivalTime = new Date(departureTime.getTime() + totalDuration * 60000);

  const segment: TransportSegment = {
    id: `flight-${Date.now()}`,
    type: TransportType.FLIGHT,
    from: departure,
    to: arrival,
    departureTime: departureTime.toISOString(),
    arrivalTime: arrivalTime.toISOString(),
    duration: totalDuration,
    price: Math.ceil(distance * 200), // ~200원 per km
    provider: '대한항공',
    routeNumber: `KE${Math.floor(Math.random() * 9000) + 1000}`,
  };

  return {
    id: `route-flight-${Date.now()}`,
    segments: [segment],
    totalDuration: totalDuration,
    totalPrice: segment.price,
    departureTime: departureTime.toISOString(),
    arrivalTime: arrivalTime.toISOString(),
  };
}
