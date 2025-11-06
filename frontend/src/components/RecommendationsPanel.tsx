import { useState } from 'react'
import { Destination, Restaurant } from '../types'
import { MapPin, Star, DollarSign, Utensils, Landmark } from 'lucide-react'

interface RecommendationsPanelProps {
  recommendations: {
    destinations: Destination[]
    restaurants: Restaurant[]
  }
}

export default function RecommendationsPanel({ recommendations }: RecommendationsPanelProps) {
  const [activeTab, setActiveTab] = useState<'destinations' | 'restaurants'>('destinations')

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating)
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    )
  }

  const renderPriceLevel = (level: number) => {
    return (
      <div className="flex items-center">
        {[...Array(4)].map((_, i) => (
          <DollarSign
            key={i}
            className={`w-4 h-4 ${
              i < level ? 'text-green-600' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 sticky top-6">
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-4 py-3">
        <h2 className="text-lg font-semibold">맞춤 추천</h2>
        <p className="text-sm text-primary-100">취향에 맞는 장소를 추천해드려요</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('destinations')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'destinations'
              ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
          }`}
        >
          <Landmark className="w-4 h-4 inline mr-2" />
          관광지 ({recommendations.destinations.length})
        </button>
        <button
          onClick={() => setActiveTab('restaurants')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'restaurants'
              ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
          }`}
        >
          <Utensils className="w-4 h-4 inline mr-2" />
          맛집 ({recommendations.restaurants.length})
        </button>
      </div>

      {/* Content */}
      <div className="max-h-[600px] overflow-y-auto">
        {activeTab === 'destinations' && (
          <div className="divide-y divide-gray-100">
            {recommendations.destinations.map((destination) => (
              <div key={destination.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex space-x-3">
                  {destination.images.length > 0 && (
                    <img
                      src={destination.images[0]}
                      alt={destination.name}
                      className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1">{destination.name}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {destination.description}
                    </p>
                    <div className="flex items-center justify-between">
                      {renderStars(destination.rating)}
                      {renderPriceLevel(destination.priceLevel)}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {destination.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {recommendations.destinations.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                <Landmark className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>추천할 관광지가 없습니다</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'restaurants' && (
          <div className="divide-y divide-gray-100">
            {recommendations.restaurants.map((restaurant) => (
              <div key={restaurant.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex space-x-3">
                  {restaurant.images.length > 0 && (
                    <img
                      src={restaurant.images[0]}
                      alt={restaurant.name}
                      className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1">{restaurant.name}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {restaurant.description}
                    </p>
                    <div className="flex items-center justify-between mb-2">
                      {renderStars(restaurant.rating)}
                      <span className="text-sm font-semibold text-green-600">
                        {restaurant.priceRange}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {restaurant.cuisine.map((cuisine) => (
                        <span
                          key={cuisine}
                          className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded"
                        >
                          {cuisine}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {recommendations.restaurants.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                <Utensils className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>추천할 맛집이 없습니다</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
