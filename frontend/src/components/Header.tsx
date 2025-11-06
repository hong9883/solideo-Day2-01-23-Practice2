import { Settings } from 'lucide-react'

interface HeaderProps {
  onOpenPreferences: () => void
}

export default function Header({ onOpenPreferences }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">✈️</div>
            <div>
              <h1 className="text-2xl font-bold text-primary-600">TravelMate</h1>
              <p className="text-sm text-gray-500">AI 기반 맞춤형 여행 플래너</p>
            </div>
          </div>

          <button
            onClick={onOpenPreferences}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Settings className="w-5 h-5" />
            <span className="hidden sm:inline">여행 취향 설정</span>
          </button>
        </div>
      </div>
    </header>
  )
}
