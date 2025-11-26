import React, { useState, useEffect, useRef } from 'react';
import { MapPin, ExternalLink, Search, Navigation, X, Filter } from 'lucide-react';
import { mapApiService } from '../../../services/mapApi';

const MapTab = ({ destination, tripData, startDate, endDate }) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [mapType, setMapType] = useState('places'); // 'places', 'food', 'hotels', 'all'
  const mapRef = useRef(null);
  const googleMapsRef = useRef(null);

  // Load Google Maps script
  useEffect(() => {
    const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    
    if (!googleMapsApiKey) {
      console.warn('Google Maps API key not found. Map features will be limited.');
      // Still set as loaded to show fallback UI
      setMapLoaded(true);
      return;
    }

    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places,geometry`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setMapLoaded(true);
        googleMapsRef.current = window.google;
      };
      script.onerror = () => {
        console.error('Failed to load Google Maps');
        setMapLoaded(true); // Still set to true to show fallback
      };
      document.head.appendChild(script);
    } else {
      setMapLoaded(true);
      googleMapsRef.current = window.google;
    }
  }, []);

  // Initialize map
  useEffect(() => {
    if (mapLoaded && mapRef.current && !map && googleMapsRef.current && googleMapsRef.current.maps) {
      const initMap = async () => {
        try {
          // Geocode destination to get center
          let center = { lat: 15.2993, lng: 74.1240 }; // Default to Goa
          
          if (destination) {
            try {
              const geoResult = await mapApiService.geocode(destination);
              if (geoResult.success) {
                center = { lat: geoResult.data.lat, lng: geoResult.data.lng };
              }
            } catch (error) {
              console.error('Error geocoding destination:', error);
            }
          }

          const newMap = new googleMapsRef.current.maps.Map(mapRef.current, {
            center: center,
            zoom: 12,
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true
          });

          setMap(newMap);
        } catch (error) {
          console.error('Error initializing map:', error);
        }
      };

      initMap();
    }
  }, [mapLoaded, destination, map]);

  // Extract all locations from trip data
  const extractLocations = () => {
    const locations = [];
    const days = Object.keys(tripData || {});

    days.forEach(date => {
      const day = tripData[date];
      
      // Places to Go
      if (day.placesToGo) {
        day.placesToGo.forEach(place => {
          locations.push({ name: place, type: 'place', date, category: 'placesToGo' });
        });
      }

      // Food places
      if (day.foodToEat) {
        day.foodToEat.forEach(food => {
          locations.push({ name: food.place, type: 'food', date, category: 'foodToEat' });
        });
      }

      // Hotels
      if (day.placesToStay) {
        day.placesToStay.forEach(stay => {
          if (stay.hotel) {
            locations.push({ name: stay.hotel, type: 'hotel', date, address: stay.address, category: 'placesToStay' });
          }
        });
      }

      // Timeline locations
      if (day.timeline) {
        day.timeline.forEach(item => {
          if (item.location && item.type !== 'transport') {
            locations.push({ 
              name: item.title, 
              location: item.location, 
              type: item.type, 
              date, 
              time: item.time,
              category: 'timeline' 
            });
          }
        });
      }
    });

    return locations;
  };

  // Add markers to map
  useEffect(() => {
    if (!map || !googleMapsRef.current || !googleMapsRef.current.maps) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    const newMarkers = [];

    const locations = extractLocations();
    const filteredLocations = mapType === 'all' 
      ? locations 
      : locations.filter(loc => {
          if (mapType === 'places') return loc.category === 'placesToGo' || (loc.category === 'timeline' && loc.type === 'activity');
          if (mapType === 'food') return loc.category === 'foodToEat' || (loc.category === 'timeline' && loc.type === 'food');
          if (mapType === 'hotels') return loc.category === 'placesToStay' || (loc.category === 'timeline' && loc.type === 'stay');
          return true;
        });

    // Geocode and add markers
    const addMarkers = async () => {
      for (const location of filteredLocations) {
        try {
          const searchTerm = location.location || location.name;
          const geoResult = await mapApiService.geocode(`${searchTerm} ${destination || ''}`);
          
          if (geoResult.success) {
            const position = { lat: geoResult.data.lat, lng: geoResult.data.lng };
            
            // Choose icon color based on type
            let iconColor = '#3B82F6'; // blue
            if (location.type === 'food') iconColor = '#F97316'; // orange
            else if (location.type === 'hotel' || location.type === 'stay') iconColor = '#8B5CF6'; // purple
            else if (location.type === 'activity') iconColor = '#10B981'; // green

            const marker = new googleMapsRef.current.maps.Marker({
              position: position,
              map: map,
              title: location.name,
              icon: {
                path: googleMapsRef.current.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: iconColor,
                fillOpacity: 1,
                strokeColor: '#FFFFFF',
                strokeWeight: 2
              }
            });

            const infoWindow = new googleMapsRef.current.maps.InfoWindow({
              content: `
                <div style="padding: 8px; min-width: 200px;">
                  <h3 style="margin: 0 0 8px 0; font-weight: 600; color: #1F2937;">${location.name}</h3>
                  ${location.location ? `<p style="margin: 0 0 4px 0; color: #6B7280; font-size: 12px;">${location.location}</p>` : ''}
                  ${location.time ? `<p style="margin: 0 0 4px 0; color: #6B7280; font-size: 12px;">⏰ ${location.time}</p>` : ''}
                  ${location.address ? `<p style="margin: 0; color: #6B7280; font-size: 12px;">📍 ${location.address}</p>` : ''}
                  <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchTerm)}" 
                     target="_blank" 
                     style="color: #3B82F6; text-decoration: none; font-size: 12px; margin-top: 8px; display: inline-block;">
                    View on Google Maps →
                  </a>
                </div>
              `
            });

            marker.addListener('click', () => {
              infoWindow.open(map, marker);
              setSelectedMarker(location);
            });

            newMarkers.push(marker);
          }
        } catch (error) {
          console.error(`Error geocoding ${location.name}:`, error);
        }
      }
      setMarkers(newMarkers);
    };

    addMarkers();
  }, [map, tripData, mapType, destination]);

  // Handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim() || !map) return;

    try {
      const results = await mapApiService.searchPlaces(searchQuery, null, null);
      if (results.success) {
        setSearchResults(results.data);
        
        // Center map on first result
        if (results.data.length > 0) {
          const firstResult = results.data[0];
          map.setCenter({ lat: firstResult.lat, lng: firstResult.lng });
          map.setZoom(14);
        }
      }
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Map of {destination || 'Your Trip'}</h3>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for places..."
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Search size={18} />
            </button>
          </div>
        </form>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-3 flex-wrap">
          {['all', 'places', 'food', 'hotels'].map((type) => (
            <button
              key={type}
              onClick={() => setMapType(type)}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                mapType === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Map Container */}
        <div 
          ref={mapRef}
          className="w-full rounded-lg overflow-hidden border-2 border-gray-200"
          style={{ height: '400px', minHeight: '400px' }}
        >
          {!mapLoaded && (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                <p className="text-gray-600 text-sm">Loading map...</p>
              </div>
            </div>
          )}
          {mapLoaded && !googleMapsRef.current?.maps && (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <div className="text-center p-4">
                <MapPin size={48} className="text-blue-600 mx-auto mb-2" />
                <p className="text-gray-700 font-medium mb-2">{destination || 'Your Trip'}</p>
                <p className="text-gray-500 text-sm mb-4">Google Maps API key required for interactive map</p>
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(destination || '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-700">Search Results</h4>
            <button
              onClick={() => setSearchResults([])}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          </div>
          {searchResults.slice(0, 5).map((place, idx) => (
            <div
              key={idx}
              onClick={() => {
                if (map) {
                  map.setCenter({ lat: place.lat, lng: place.lng });
                  map.setZoom(15);
                }
              }}
              className="p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-blue-600" />
                <div className="flex-1">
                  <h5 className="font-medium text-gray-800 text-sm">{place.name}</h5>
                  <p className="text-xs text-gray-500">{place.type}</p>
                </div>
                <Navigation size={14} className="text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Map Links */}
      <div className="space-y-2 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-700">Quick Map Links</h4>
        {[
          { title: 'View on Google Maps', url: `https://www.google.com/maps/search/${encodeURIComponent(destination || '')}` },
          { title: 'Attractions', url: `https://www.google.com/maps/search/tourist+attractions+in+${encodeURIComponent(destination || '')}` },
          { title: 'Restaurants', url: `https://www.google.com/maps/search/restaurants+in+${encodeURIComponent(destination || '')}` },
          { title: 'Hotels', url: `https://www.google.com/maps/search/hotels+in+${encodeURIComponent(destination || '')}` }
        ].map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
          >
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-blue-600" />
              <h5 className="font-medium text-gray-800 group-hover:text-blue-600 text-sm">{link.title}</h5>
            </div>
            <ExternalLink size={14} className="text-gray-400 group-hover:text-blue-600" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default MapTab;
