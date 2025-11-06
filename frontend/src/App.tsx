import { useState } from 'react'
import SearchForm from './components/SearchForm'
import MapView from './components/MapView'
import TransportationResults from './components/TransportationResults'
import RecommendationsPanel from './components/RecommendationsPanel'
import PreferencesModal from './components/PreferencesModal'
import Header from './components/Header'
import { TripPlan, SearchParams, TravelPreferences, BudgetLevel, TravelPace } from './types'
import { searchRoutes } from './services/api'

function App() {
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null)
  const [loading, setLoading] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState<TravelPreferences>({
    travelStyle: [],
    foodPreferences: [],
    budget: BudgetLevel.MEDIUM,
    pace: TravelPace.MODERATE,
    interests: [],
  })

  const handleSearch = async (params: SearchParams) => {
    setLoading(true)
    try {
      const result = await searchRoutes(params, preferences)
      setTripPlan(result)
    } catch (error) {
      console.error('Search failed:', error)
      alert('검색 중 오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setLoading(false)
    }
  }

  const handlePreferencesSave = (newPreferences: TravelPreferences) => {
    setPreferences(newPreferences)
    setShowPreferences(false)
    // If we have a trip plan, update recommendations
    if (tripPlan) {
      handleSearch({
        departure: tripPlan.departure.name,
        arrival: tripPlan.arrival.name,
        departureTime: new Date(tripPlan.departureTime),
        duration: tripPlan.duration,
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onOpenPreferences={() => setShowPreferences(true)} />

      <main className="container mx-auto px-4 py-6">
        {/* Search Section */}
        <div className="mb-6">
          <SearchForm onSearch={handleSearch} loading={loading} />
        </div>

        {/* Results Section */}
        {tripPlan && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map and Transportation - Takes 2 columns on large screens */}
            <div className="lg:col-span-2 space-y-6">
              <MapView tripPlan={tripPlan} />
              <TransportationResults routes={tripPlan.routes} />
            </div>

            {/* Recommendations Panel - Takes 1 column */}
            <div className="lg:col-span-1">
              <RecommendationsPanel recommendations={tripPlan.recommendations} />
            </div>
          </div>
        )}

        {/* Empty State */}
        {!tripPlan && !loading && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🗺️</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              여행을 시작해보세요
            </h2>
            <p className="text-gray-500">
              출발지와 목적지를 입력하고 취향에 맞는 여행 계획을 받아보세요
            </p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">최적의 여행 경로를 찾고 있습니다...</p>
          </div>
        )}
      </main>

      {/* Preferences Modal */}
      {showPreferences && (
        <PreferencesModal
          preferences={preferences}
          onSave={handlePreferencesSave}
          onClose={() => setShowPreferences(false)}
        />
      )}
    </div>
  )
}

export default App
