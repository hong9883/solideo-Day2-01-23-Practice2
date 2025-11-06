import { useEffect, useRef, useState } from 'react'
import { TripPlan } from '../types'
import { Loader } from '@googlemaps/js-api-loader'

interface MapViewProps {
  tripPlan: TripPlan
}

export default function MapView({ tripPlan }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY',
          version: 'weekly',
          libraries: ['places', 'geometry'],
        })

        await loader.load()

        if (!mapRef.current) return

        const mapInstance = new google.maps.Map(mapRef.current, {
          center: {
            lat: (tripPlan.departure.lat + tripPlan.arrival.lat) / 2,
            lng: (tripPlan.departure.lng + tripPlan.arrival.lng) / 2,
          },
          zoom: 8,
          mapTypeControl: true,
          streetViewControl: false,
          fullscreenControl: true,
        })

        setMap(mapInstance)
        setIsLoading(false)
      } catch (error) {
        console.error('Error loading Google Maps:', error)
        setIsLoading(false)
      }
    }

    initMap()
  }, [])

  useEffect(() => {
    if (!map || !tripPlan) return

    // Clear existing markers and polylines
    // In production, you'd store references to these and clear them properly

    // Add departure marker
    new google.maps.Marker({
      position: { lat: tripPlan.departure.lat, lng: tripPlan.departure.lng },
      map: map,
      title: tripPlan.departure.name,
      label: '출발',
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: '#22c55e',
        fillOpacity: 1,
        strokeColor: '#fff',
        strokeWeight: 2,
      },
    })

    // Add arrival marker
    new google.maps.Marker({
      position: { lat: tripPlan.arrival.lat, lng: tripPlan.arrival.lng },
      map: map,
      title: tripPlan.arrival.name,
      label: '도착',
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: '#ef4444',
        fillOpacity: 1,
        strokeColor: '#fff',
        strokeWeight: 2,
      },
    })

    // Draw route polylines
    if (tripPlan.routes.length > 0) {
      const selectedRoute = tripPlan.routes[0]
      const colors = {
        bus: '#f59e0b',
        train: '#3b82f6',
        flight: '#8b5cf6',
        subway: '#10b981',
        taxi: '#fbbf24',
        walk: '#6b7280',
      }

      selectedRoute.segments.forEach((segment) => {
        const path = [
          { lat: segment.from.lat, lng: segment.from.lng },
          { lat: segment.to.lat, lng: segment.to.lng },
        ]

        new google.maps.Polyline({
          path: path,
          geodesic: true,
          strokeColor: colors[segment.type] || '#000',
          strokeOpacity: 0.8,
          strokeWeight: 4,
          map: map,
        })
      })
    }

    // Fit bounds to show all markers
    const bounds = new google.maps.LatLngBounds()
    bounds.extend({ lat: tripPlan.departure.lat, lng: tripPlan.departure.lng })
    bounds.extend({ lat: tripPlan.arrival.lat, lng: tripPlan.arrival.lng })
    map.fitBounds(bounds)
  }, [map, tripPlan])

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">지도를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-4 py-3">
        <h2 className="text-lg font-semibold">경로 지도</h2>
        <p className="text-sm text-primary-100">
          {tripPlan.departure.name} → {tripPlan.arrival.name}
        </p>
      </div>
      <div ref={mapRef} className="w-full h-96" />
    </div>
  )
}
