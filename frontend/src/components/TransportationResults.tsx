import { useState } from 'react'
import { Route, TransportType } from '../types'
import { Bus, Train, Plane, Navigation, Clock, DollarSign, ChevronDown, ChevronUp } from 'lucide-react'

interface TransportationResultsProps {
  routes: Route[]
}

const transportIcons = {
  [TransportType.BUS]: Bus,
  [TransportType.TRAIN]: Train,
  [TransportType.FLIGHT]: Plane,
  [TransportType.SUBWAY]: Train,
  [TransportType.TAXI]: Navigation,
  [TransportType.WALK]: Navigation,
}

const transportColors = {
  [TransportType.BUS]: 'text-orange-600 bg-orange-50',
  [TransportType.TRAIN]: 'text-blue-600 bg-blue-50',
  [TransportType.FLIGHT]: 'text-purple-600 bg-purple-50',
  [TransportType.SUBWAY]: 'text-green-600 bg-green-50',
  [TransportType.TAXI]: 'text-yellow-600 bg-yellow-50',
  [TransportType.WALK]: 'text-gray-600 bg-gray-50',
}

const transportLabels = {
  [TransportType.BUS]: '버스',
  [TransportType.TRAIN]: '기차',
  [TransportType.FLIGHT]: '항공',
  [TransportType.SUBWAY]: '지하철',
  [TransportType.TAXI]: '택시',
  [TransportType.WALK]: '도보',
}

export default function TransportationResults({ routes }: TransportationResultsProps) {
  const [expandedRoute, setExpandedRoute] = useState<string | null>(routes[0]?.id || null)

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}시간 ${mins}분` : `${mins}분`
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price) + '원'
  }

  const formatTime = (timeString: string) => {
    const date = new Date(timeString)
    return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-4 py-3">
        <h2 className="text-lg font-semibold">교통편 안내</h2>
        <p className="text-sm text-primary-100">총 {routes.length}개의 경로를 찾았습니다</p>
      </div>

      <div className="divide-y divide-gray-200">
        {routes.map((route) => {
          const isExpanded = expandedRoute === route.id

          return (
            <div key={route.id} className="p-4">
              {/* Route Summary */}
              <button
                onClick={() => setExpandedRoute(isExpanded ? null : route.id)}
                className="w-full flex items-center justify-between hover:bg-gray-50 p-3 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div className="flex space-x-1">
                    {route.segments.map((segment, idx) => {
                      const Icon = transportIcons[segment.type]
                      return (
                        <div
                          key={idx}
                          className={`p-2 rounded-lg ${transportColors[segment.type]}`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                      )
                    })}
                  </div>

                  <div className="flex-1 text-left">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
                      <Clock className="w-4 h-4" />
                      <span>{formatTime(route.departureTime)} → {formatTime(route.arrivalTime)}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="font-semibold text-gray-900">
                        {formatDuration(route.totalDuration)}
                      </span>
                      <span className="text-primary-600 font-semibold">
                        {formatPrice(route.totalPrice)}
                      </span>
                    </div>
                  </div>
                </div>

                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {/* Expanded Route Details */}
              {isExpanded && (
                <div className="mt-4 space-y-3 pl-3 border-l-2 border-primary-200">
                  {route.segments.map((segment, idx) => {
                    const Icon = transportIcons[segment.type]
                    return (
                      <div key={segment.id} className="ml-4 relative">
                        {/* Timeline dot */}
                        <div className="absolute -left-7 top-2 w-3 h-3 bg-primary-500 rounded-full border-2 border-white"></div>

                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <div className={`p-2 rounded-lg ${transportColors[segment.type]}`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="font-semibold text-sm">
                                  {transportLabels[segment.type]}
                                  {segment.routeNumber && ` - ${segment.routeNumber}`}
                                </div>
                                <div className="text-xs text-gray-500">{segment.provider}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-semibold text-primary-600">
                                {formatPrice(segment.price)}
                              </div>
                              <div className="text-xs text-gray-500">
                                {formatDuration(segment.duration)}
                              </div>
                            </div>
                          </div>

                          <div className="space-y-1 text-sm">
                            <div className="flex items-center text-gray-600">
                              <span className="text-green-600 mr-2">출발:</span>
                              <span>{segment.from.name}</span>
                              <span className="ml-auto text-gray-500">
                                {formatTime(segment.departureTime)}
                              </span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <span className="text-red-600 mr-2">도착:</span>
                              <span>{segment.to.name}</span>
                              <span className="ml-auto text-gray-500">
                                {formatTime(segment.arrivalTime)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
