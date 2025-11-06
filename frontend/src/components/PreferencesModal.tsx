import { useState } from 'react'
import { X } from 'lucide-react'
import {
  TravelPreferences,
  TravelStyle,
  FoodPreference,
  BudgetLevel,
  TravelPace,
} from '../types'

interface PreferencesModalProps {
  preferences: TravelPreferences
  onSave: (preferences: TravelPreferences) => void
  onClose: () => void
}

const travelStyleOptions = [
  { value: TravelStyle.LUXURY, label: '럭셔리', emoji: '💎' },
  { value: TravelStyle.BUDGET, label: '알뜰여행', emoji: '💰' },
  { value: TravelStyle.ADVENTURE, label: '모험', emoji: '🏔️' },
  { value: TravelStyle.RELAXATION, label: '휴양', emoji: '🏖️' },
  { value: TravelStyle.CULTURAL, label: '문화', emoji: '🎭' },
  { value: TravelStyle.NATURE, label: '자연', emoji: '🌲' },
  { value: TravelStyle.URBAN, label: '도시', emoji: '🏙️' },
  { value: TravelStyle.FAMILY, label: '가족', emoji: '👨‍👩‍👧‍👦' },
]

const foodPreferenceOptions = [
  { value: FoodPreference.KOREAN, label: '한식', emoji: '🍚' },
  { value: FoodPreference.JAPANESE, label: '일식', emoji: '🍣' },
  { value: FoodPreference.CHINESE, label: '중식', emoji: '🥟' },
  { value: FoodPreference.WESTERN, label: '양식', emoji: '🍝' },
  { value: FoodPreference.VEGETARIAN, label: '채식', emoji: '🥗' },
  { value: FoodPreference.VEGAN, label: '비건', emoji: '🌱' },
  { value: FoodPreference.STREET_FOOD, label: '길거리음식', emoji: '🌭' },
  { value: FoodPreference.FINE_DINING, label: '파인다이닝', emoji: '🍷' },
  { value: FoodPreference.LOCAL, label: '로컬맛집', emoji: '🏠' },
  { value: FoodPreference.CAFE, label: '카페', emoji: '☕' },
]

const budgetOptions = [
  { value: BudgetLevel.LOW, label: '저예산', description: '가성비 위주' },
  { value: BudgetLevel.MEDIUM, label: '중간', description: '적당한 수준' },
  { value: BudgetLevel.HIGH, label: '고예산', description: '품질 위주' },
  { value: BudgetLevel.LUXURY, label: '럭셔리', description: '최고급' },
]

const paceOptions = [
  { value: TravelPace.SLOW, label: '느긋하게', description: '여유로운 일정' },
  { value: TravelPace.MODERATE, label: '적당히', description: '균형잡힌 일정' },
  { value: TravelPace.FAST, label: '빠르게', description: '알찬 일정' },
]

export default function PreferencesModal({
  preferences,
  onSave,
  onClose,
}: PreferencesModalProps) {
  const [localPreferences, setLocalPreferences] = useState<TravelPreferences>(preferences)

  const toggleTravelStyle = (style: TravelStyle) => {
    const newStyles = localPreferences.travelStyle.includes(style)
      ? localPreferences.travelStyle.filter((s) => s !== style)
      : [...localPreferences.travelStyle, style]

    setLocalPreferences({ ...localPreferences, travelStyle: newStyles })
  }

  const toggleFoodPreference = (food: FoodPreference) => {
    const newFoods = localPreferences.foodPreferences.includes(food)
      ? localPreferences.foodPreferences.filter((f) => f !== food)
      : [...localPreferences.foodPreferences, food]

    setLocalPreferences({ ...localPreferences, foodPreferences: newFoods })
  }

  const handleSave = () => {
    onSave(localPreferences)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">여행 취향 설정</h2>
            <p className="text-sm text-primary-100">나만의 맞춤 여행을 위한 설정</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Travel Style */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              여행 스타일 (복수 선택 가능)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {travelStyleOptions.map((option) => {
                const isSelected = localPreferences.travelStyle.includes(option.value)
                return (
                  <button
                    key={option.value}
                    onClick={() => toggleTravelStyle(option.value)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <div className="text-2xl mb-1">{option.emoji}</div>
                    <div className="text-sm font-medium">{option.label}</div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Food Preferences */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              음식 취향 (복수 선택 가능)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {foodPreferenceOptions.map((option) => {
                const isSelected = localPreferences.foodPreferences.includes(option.value)
                return (
                  <button
                    key={option.value}
                    onClick={() => toggleFoodPreference(option.value)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <div className="text-2xl mb-1">{option.emoji}</div>
                    <div className="text-xs font-medium">{option.label}</div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Budget Level */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">예산 수준</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {budgetOptions.map((option) => {
                const isSelected = localPreferences.budget === option.value
                return (
                  <button
                    key={option.value}
                    onClick={() =>
                      setLocalPreferences({ ...localPreferences, budget: option.value })
                    }
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      isSelected
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold text-gray-900 mb-1">{option.label}</div>
                    <div className="text-xs text-gray-600">{option.description}</div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Travel Pace */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">여행 속도</h3>
            <div className="grid grid-cols-3 gap-3">
              {paceOptions.map((option) => {
                const isSelected = localPreferences.pace === option.value
                return (
                  <button
                    key={option.value}
                    onClick={() =>
                      setLocalPreferences({ ...localPreferences, pace: option.value })
                    }
                    className={`p-4 rounded-lg border-2 transition-all text-center ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold text-gray-900 mb-1">{option.label}</div>
                    <div className="text-xs text-gray-600">{option.description}</div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
          >
            저장하기
          </button>
        </div>
      </div>
    </div>
  )
}
