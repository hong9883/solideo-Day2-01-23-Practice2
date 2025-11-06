import { Location } from '../types';

// Mock geocoding service - In production, use Google Geocoding API
// This provides realistic coordinates for major Korean cities and landmarks

const knownLocations: Record<string, Location> = {
  '서울역': {
    name: '서울역',
    address: '서울특별시 용산구 한강대로 405',
    lat: 37.5547,
    lng: 126.9707,
  },
  '부산역': {
    name: '부산역',
    address: '부산광역시 동구 중앙대로 206',
    lat: 35.1149,
    lng: 129.0414,
  },
  '인천공항': {
    name: '인천국제공항',
    address: '인천광역시 중구 공항로 272',
    lat: 37.4602,
    lng: 126.4407,
  },
  '김포공항': {
    name: '김포국제공항',
    address: '서울특별시 강서구 하늘길 77',
    lat: 37.5583,
    lng: 126.7906,
  },
  '제주공항': {
    name: '제주국제공항',
    address: '제주특별자치도 제주시 공항로 2',
    lat: 33.5066,
    lng: 126.4930,
  },
  '강릉': {
    name: '강릉시',
    address: '강원도 강릉시',
    lat: 37.7519,
    lng: 128.8761,
  },
  '대전': {
    name: '대전역',
    address: '대전광역시 동구 중앙로 215',
    lat: 36.3314,
    lng: 127.4349,
  },
  '광주': {
    name: '광주송정역',
    address: '광주광역시 광산구 송정로8번길 1',
    lat: 35.1400,
    lng: 126.7889,
  },
  '경주': {
    name: '경주역',
    address: '경상북도 경주시 태종로 788',
    lat: 35.8563,
    lng: 129.2249,
  },
};

export function geocodeLocation(locationName: string): Location {
  // Check for exact matches
  for (const [key, location] of Object.entries(knownLocations)) {
    if (locationName.includes(key) || key.includes(locationName)) {
      return location;
    }
  }

  // Default fallback - generate approximate coordinates
  // In production, this would call Google Geocoding API
  const hash = locationName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const lat = 33 + (hash % 10);
  const lng = 126 + (hash % 5);

  return {
    name: locationName,
    address: `${locationName} 주소`,
    lat,
    lng,
  };
}

export function calculateDistance(loc1: Location, loc2: Location): number {
  // Haversine formula
  const R = 6371; // Earth's radius in km
  const dLat = ((loc2.lat - loc1.lat) * Math.PI) / 180;
  const dLng = ((loc2.lng - loc1.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((loc1.lat * Math.PI) / 180) *
      Math.cos((loc2.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
