import {
  Destination,
  Restaurant,
  TravelPreferences,
  Location,
  FoodPreference,
  TravelStyle,
  BudgetLevel,
} from '../types';

// Mock destination database
const destinationDatabase: Partial<Destination>[] = [
  {
    name: '경복궁',
    description: '조선시대의 대표적인 궁궐로, 한국의 역사와 전통 문화를 체험할 수 있는 곳',
    category: ['historical', 'cultural'],
    rating: 4.6,
    images: ['https://images.unsplash.com/photo-1583417319070-4a69db38a482'],
    priceLevel: 1,
    tags: ['역사', '문화', '전통', '사진명소'],
  },
  {
    name: '해운대 해수욕장',
    description: '부산의 대표적인 해변으로, 아름다운 바다와 다양한 해양 레저를 즐길 수 있는 곳',
    category: ['beach', 'nature', 'relaxation'],
    rating: 4.5,
    images: ['https://images.unsplash.com/photo-1590470122678-86fd017c0f94'],
    priceLevel: 2,
    tags: ['해변', '휴양', '수영', '가족'],
  },
  {
    name: '남산타워',
    description: '서울의 상징적인 랜드마크로, 도시 전경을 한눈에 볼 수 있는 전망대',
    category: ['landmark', 'urban', 'romantic'],
    rating: 4.4,
    images: ['https://images.unsplash.com/photo-1583417319070-4a69db38a483'],
    priceLevel: 2,
    tags: ['전망대', '야경', '데이트', '랜드마크'],
  },
  {
    name: '제주 한라산',
    description: '한국에서 가장 높은 산으로, 아름다운 자연 경관과 등산을 즐길 수 있는 곳',
    category: ['nature', 'adventure', 'hiking'],
    rating: 4.7,
    images: ['https://images.unsplash.com/photo-1590470122678-86fd017c0f95'],
    priceLevel: 1,
    tags: ['등산', '자연', '모험', '트레킹'],
  },
  {
    name: '명동 쇼핑거리',
    description: '서울의 대표적인 쇼핑 명소로, 다양한 브랜드와 먹거리를 즐길 수 있는 곳',
    category: ['shopping', 'urban', 'food'],
    rating: 4.3,
    images: ['https://images.unsplash.com/photo-1583417319070-4a69db38a484'],
    priceLevel: 3,
    tags: ['쇼핑', '패션', '먹거리', '번화가'],
  },
  {
    name: '광안리 해변',
    description: '부산의 야경 명소로, 광안대교의 아름다운 야경과 해변 카페를 즐길 수 있는 곳',
    category: ['beach', 'urban', 'romantic'],
    rating: 4.6,
    images: ['https://images.unsplash.com/photo-1590470122678-86fd017c0f96'],
    priceLevel: 2,
    tags: ['해변', '야경', '카페', '데이트'],
  },
  {
    name: '전주 한옥마을',
    description: '전통 한옥이 밀집된 역사 문화 지구로, 한복 체험과 전통 음식을 즐길 수 있는 곳',
    category: ['historical', 'cultural', 'food'],
    rating: 4.5,
    images: ['https://images.unsplash.com/photo-1583417319070-4a69db38a485'],
    priceLevel: 2,
    tags: ['한옥', '전통', '한복체험', '먹거리'],
  },
  {
    name: '롯데월드',
    description: '서울의 대표적인 테마파크로, 다양한 놀이기구와 즐길거리가 있는 가족 명소',
    category: ['theme_park', 'family', 'entertainment'],
    rating: 4.4,
    images: ['https://images.unsplash.com/photo-1583417319070-4a69db38a486'],
    priceLevel: 3,
    tags: ['놀이공원', '가족', '엔터테인먼트', '실내'],
  },
];

// Mock restaurant database
const restaurantDatabase: Partial<Restaurant>[] = [
  {
    name: '광장시장 빈대떡',
    description: '서울 광장시장의 유명한 빈대떡 맛집. 50년 전통의 수제 빈대떡',
    cuisine: [FoodPreference.KOREAN, FoodPreference.STREET_FOOD, FoodPreference.LOCAL],
    rating: 4.5,
    priceRange: '₩5,000 - ₩15,000',
    images: ['https://images.unsplash.com/photo-1590470122678-86fd017c0f97'],
  },
  {
    name: '미쉐린 스타 한식당',
    description: '현대적으로 재해석한 한식 코스 요리. 계절 식재료를 활용한 창작 요리',
    cuisine: [FoodPreference.KOREAN, FoodPreference.FINE_DINING],
    rating: 4.8,
    priceRange: '₩100,000 - ₩200,000',
    images: ['https://images.unsplash.com/photo-1590470122678-86fd017c0f98'],
  },
  {
    name: '해운대 회센터',
    description: '신선한 활어회와 다양한 해산물 요리. 바다 전망이 아름다운 레스토랑',
    cuisine: [FoodPreference.KOREAN, FoodPreference.LOCAL],
    rating: 4.4,
    priceRange: '₩30,000 - ₩60,000',
    images: ['https://images.unsplash.com/photo-1590470122678-86fd017c0f99'],
  },
  {
    name: '채식당 그린테이블',
    description: '건강한 비건 요리 전문점. 식물성 재료만을 사용한 창의적인 메뉴',
    cuisine: [FoodPreference.VEGETARIAN, FoodPreference.VEGAN],
    rating: 4.6,
    priceRange: '₩15,000 - ₩30,000',
    images: ['https://images.unsplash.com/photo-1590470122678-86fd017c0f00'],
  },
  {
    name: '스시 오마카세',
    description: '최고급 일식 오마카세. 일본에서 공수한 신선한 재료로 만드는 스시',
    cuisine: [FoodPreference.JAPANESE, FoodPreference.FINE_DINING],
    rating: 4.7,
    priceRange: '₩150,000 - ₩300,000',
    images: ['https://images.unsplash.com/photo-1590470122678-86fd017c0f01'],
  },
  {
    name: '차이나타운 짜장면',
    description: '인천 차이나타운의 원조 짜장면. 100년 전통의 맛',
    cuisine: [FoodPreference.CHINESE, FoodPreference.LOCAL],
    rating: 4.3,
    priceRange: '₩8,000 - ₩20,000',
    images: ['https://images.unsplash.com/photo-1590470122678-86fd017c0f02'],
  },
  {
    name: '이탈리안 레스토랑',
    description: '정통 이탈리아 요리 전문점. 수제 파스타와 피자',
    cuisine: [FoodPreference.WESTERN],
    rating: 4.5,
    priceRange: '₩25,000 - ₩50,000',
    images: ['https://images.unsplash.com/photo-1590470122678-86fd017c0f03'],
  },
  {
    name: '감성 카페 루프탑',
    description: '도심 속 루프탑 카페. 분위기 좋은 공간에서 즐기는 특별한 커피',
    cuisine: [FoodPreference.CAFE],
    rating: 4.4,
    priceRange: '₩6,000 - ₩15,000',
    images: ['https://images.unsplash.com/photo-1590470122678-86fd017c0f04'],
  },
  {
    name: '포장마차 거리',
    description: '한국의 대표적인 길거리 음식을 한 곳에서. 떡볶이, 순대, 튀김 등',
    cuisine: [FoodPreference.KOREAN, FoodPreference.STREET_FOOD],
    rating: 4.2,
    priceRange: '₩3,000 - ₩10,000',
    images: ['https://images.unsplash.com/photo-1590470122678-86fd017c0f05'],
  },
];

export function getDestinationRecommendations(
  location: Location,
  preferences: TravelPreferences
): Destination[] {
  // Filter and score destinations based on preferences
  const scoredDestinations = destinationDatabase.map((dest) => {
    let score = 0;

    // Match travel style
    preferences.travelStyle.forEach((style) => {
      if (dest.category?.includes(style)) {
        score += 10;
      }
    });

    // Match budget
    const priceLevelMap = {
      [BudgetLevel.LOW]: 1,
      [BudgetLevel.MEDIUM]: 2,
      [BudgetLevel.HIGH]: 3,
      [BudgetLevel.LUXURY]: 4,
    };
    const targetPrice = priceLevelMap[preferences.budget];
    if (Math.abs((dest.priceLevel || 2) - targetPrice) <= 1) {
      score += 5;
    }

    // Add base rating score
    score += (dest.rating || 0) * 2;

    return {
      ...dest,
      score,
      id: `dest-${Math.random().toString(36).substr(2, 9)}`,
      location: {
        name: dest.name || '',
        address: `${location.name} 근처`,
        lat: location.lat + (Math.random() - 0.5) * 0.1,
        lng: location.lng + (Math.random() - 0.5) * 0.1,
      },
    } as Destination & { score: number };
  });

  // Sort by score and return top matches
  return scoredDestinations
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map(({ score, ...dest }) => dest);
}

export function getRestaurantRecommendations(
  location: Location,
  preferences: TravelPreferences
): Restaurant[] {
  // Filter and score restaurants based on food preferences
  const scoredRestaurants = restaurantDatabase.map((rest) => {
    let score = 0;

    // Match food preferences
    preferences.foodPreferences.forEach((pref) => {
      if (rest.cuisine?.includes(pref)) {
        score += 15;
      }
    });

    // Match budget level
    const priceValue = parseInt(rest.priceRange?.split('-')[0].replace(/[^0-9]/g, '') || '0');
    const budgetMap = {
      [BudgetLevel.LOW]: 15000,
      [BudgetLevel.MEDIUM]: 35000,
      [BudgetLevel.HIGH]: 80000,
      [BudgetLevel.LUXURY]: 150000,
    };
    const targetBudget = budgetMap[preferences.budget];
    if (Math.abs(priceValue - targetBudget) < targetBudget * 0.5) {
      score += 8;
    }

    // Add base rating score
    score += (rest.rating || 0) * 3;

    return {
      ...rest,
      score,
      id: `rest-${Math.random().toString(36).substr(2, 9)}`,
      location: {
        name: rest.name || '',
        address: `${location.name} 근처`,
        lat: location.lat + (Math.random() - 0.5) * 0.05,
        lng: location.lng + (Math.random() - 0.5) * 0.05,
      },
      openingHours: '11:00 - 22:00',
      phoneNumber: '02-1234-5678',
    } as Restaurant & { score: number };
  });

  // Sort by score and return top matches
  return scoredRestaurants
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map(({ score, ...rest }) => rest);
}
