import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { TouristSpot, RIO_BRANCO_SPOTS } from '../data/rioBrancoData';
import { 
  MapPin, 
  Navigation, 
  Layers, 
  Compass, 
  Clock, 
  Ticket, 
  Volume2, 
  Star, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';

interface InteractiveMapProps {
  onSelectSpot: (spot: TouristSpot) => void;
  favorites: string[];
  visited: string[];
  onToggleFavorite: (id: string) => void;
  onToggleVisited: (id: string) => void;
  selectedSpotId?: string | null;
}

const CATEGORY_COLORS: Record<string, string> = {
  historico: '#dc2626', // Red
  natureza: '#16a34a', // Green
  gastronomia: '#f59e0b', // Amber
  cultura: '#8b5cf6', // Violet
  religioso: '#0ea5e9', // Sky
};

const CATEGORY_LABELS: Record<string, string> = {
  todos: 'Todos os Locais',
  historico: 'Histórico & Monumentos',
  gastronomia: 'Sabores & Mercados',
  natureza: 'Parques & Floresta',
  cultura: 'Museus & Memória',
  religioso: 'Templos & Espiritual',
};

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  onSelectSpot,
  favorites,
  visited,
  onToggleFavorite,
  onToggleVisited,
  selectedSpotId,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const userMarkerRef = useRef<L.Marker | null>(null);

  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [activeSpot, setActiveSpot] = useState<TouristSpot | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Center on Rio Branco (near Gameleira & Centro)
    const map = L.map(mapContainerRef.current, {
      center: [-9.9745, -67.8100],
      zoom: 14,
      zoomControl: false,
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // OpenStreetMap clean tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors | Rio Branco - Acre',
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Markers when filter or spots change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear old markers
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    const filteredSpots = RIO_BRANCO_SPOTS.filter(
      (spot) => activeCategory === 'todos' || spot.category === activeCategory
    );

    filteredSpots.forEach((spot) => {
      const color = CATEGORY_COLORS[spot.category] || '#10b981';
      const isFav = favorites.includes(spot.id);
      const isVis = visited.includes(spot.id);

      // Create Custom HTML Pin
      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div style="
            position: relative;
            background-color: ${color};
            width: 38px;
            height: 38px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 10px rgba(0,0,0,0.4);
            border: 2px solid #ffffff;
            cursor: pointer;
            transition: transform 0.2s ease;
          ">
            <div style="
              transform: rotate(45deg);
              font-size: 16px;
              color: white;
              font-weight: bold;
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              ${isVis ? '✓' : isFav ? '★' : '•'}
            </div>
          </div>
        `,
        iconSize: [38, 38],
        iconAnchor: [19, 38],
        popupAnchor: [0, -36],
      });

      const marker = L.marker([spot.lat, spot.lng], { icon: customIcon });

      marker.on('click', () => {
        setActiveSpot(spot);
        map.panTo([spot.lat, spot.lng], { animate: true });
      });

      marker.addTo(map);
      markersRef.current[spot.id] = marker;
    });
  }, [activeCategory, favorites, visited]);

  // Center on selectedSpotId if provided from outside
  useEffect(() => {
    if (!selectedSpotId || !mapInstanceRef.current) return;
    const spot = RIO_BRANCO_SPOTS.find((s) => s.id === selectedSpotId);
    if (spot) {
      setActiveSpot(spot);
      mapInstanceRef.current.setView([spot.lat, spot.lng], 16, { animate: true });
    }
  }, [selectedSpotId]);

  // Locate User
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert('Geolocalização não é suportada pelo seu navegador.');
      return;
    }
    setLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationLoading(false);
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });

        const map = mapInstanceRef.current;
        if (!map) return;

        if (userMarkerRef.current) {
          userMarkerRef.current.remove();
        }

        const userIcon = L.divIcon({
          className: 'user-location-pin',
          html: `
            <div style="
              width: 22px;
              height: 22px;
              background-color: #3b82f6;
              border: 3px solid white;
              border-radius: 50%;
              box-shadow: 0 0 14px rgba(59, 130, 246, 0.8);
            "></div>
          `,
          iconSize: [22, 22],
          iconAnchor: [11, 11],
        });

        const marker = L.marker([latitude, longitude], { icon: userIcon })
          .addTo(map)
          .bindPopup('<b>Você está aqui</b>')
          .openPopup();

        userMarkerRef.current = marker;
        map.setView([latitude, longitude], 15, { animate: true });
      },
      (error) => {
        setLocationLoading(false);
        console.warn('Erro ao obter localização:', error.message);
        // Fallback to center of Rio Branco with informative message
        alert('Não foi possível obter sua localização exata. Exibindo o Centro Histórico de Rio Branco.');
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const filteredSpots = RIO_BRANCO_SPOTS.filter(
    (s) => activeCategory === 'todos' || s.category === activeCategory
  );

  return (
    <div className="relative w-full h-[calc(100vh-140px)] flex flex-col md:flex-row overflow-hidden bg-stone-950">
      {/* Category Pills & Quick Filters Header */}
      <div className="absolute top-3 left-3 right-3 z-[1000] flex flex-wrap gap-1.5 pointer-events-auto">
        <div className="bg-stone-900/90 backdrop-blur-md p-1.5 rounded-2xl shadow-xl border border-stone-800 flex items-center gap-1.5 overflow-x-auto max-w-full scrollbar-none">
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => {
            const isActive = activeCategory === key;
            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/50 scale-[1.02]'
                    : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700 hover:text-white'
                }`}
              >
                {key !== 'todos' && (
                  <span
                    className="w-2.5 h-2.5 rounded-full inline-block"
                    style={{ backgroundColor: CATEGORY_COLORS[key] || '#10b981' }}
                  />
                )}
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Floating GPS Action Buttons */}
      <div className="absolute bottom-6 right-4 z-[1000] flex flex-col gap-2 pointer-events-auto">
        <button
          onClick={handleLocateMe}
          disabled={locationLoading}
          title="Minha Localização"
          className="w-12 h-12 rounded-2xl bg-stone-900/95 backdrop-blur-md text-emerald-400 hover:text-emerald-300 border border-stone-800 shadow-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95"
        >
          <Navigation className={`w-5 h-5 ${locationLoading ? 'animate-spin' : ''}`} />
        </button>

        <button
          onClick={() => {
            if (mapInstanceRef.current) {
              mapInstanceRef.current.setView([-9.9745, -67.8100], 14, { animate: true });
            }
          }}
          title="Centralizar Rio Branco"
          className="w-12 h-12 rounded-2xl bg-stone-900/95 backdrop-blur-md text-stone-300 hover:text-white border border-stone-800 shadow-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95"
        >
          <Compass className="w-5 h-5" />
        </button>
      </div>

      {/* Map Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Bottom Floating Spot Preview Drawer (Mobile & Desktop) */}
      {activeSpot && (
        <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:w-96 z-[1001] bg-stone-900/95 backdrop-blur-lg border border-stone-800 rounded-3xl p-4 shadow-2xl transition-all animate-in fade-in slide-in-from-bottom-4">
          <div className="flex gap-3">
            <img
              src={activeSpot.imageUrl}
              alt={activeSpot.name}
              className="w-24 h-24 rounded-2xl object-cover shrink-0 border border-stone-700"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-1">
                <span
                  className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: CATEGORY_COLORS[activeSpot.category] || '#10b981' }}
                >
                  {CATEGORY_LABELS[activeSpot.category]}
                </span>
                <button
                  onClick={() => setActiveSpot(null)}
                  className="text-stone-400 hover:text-stone-200 text-xs px-1.5 py-0.5 rounded-lg bg-stone-800"
                >
                  ✕
                </button>
              </div>

              <h4 className="font-bold text-sm text-stone-100 truncate">{activeSpot.name}</h4>
              <p className="text-xs text-stone-400 line-clamp-2 mt-0.5 leading-relaxed">
                {activeSpot.shortDescription}
              </p>

              <div className="flex items-center gap-2 mt-2 text-[11px] text-stone-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-emerald-400" />
                  {activeSpot.admission}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons in Drawer */}
          <div className="mt-3 pt-3 border-t border-stone-800 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onToggleFavorite(activeSpot.id)}
                className={`p-2 rounded-xl text-xs transition-colors border ${
                  favorites.includes(activeSpot.id)
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-stone-800 text-stone-400 hover:text-amber-300 border-stone-700'
                }`}
                title="Favoritar"
              >
                <Star className="w-4 h-4 fill-current" />
              </button>

              <button
                onClick={() => onToggleVisited(activeSpot.id)}
                className={`p-2 rounded-xl text-xs transition-colors border ${
                  visited.includes(activeSpot.id)
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-stone-800 text-stone-400 hover:text-emerald-300 border-stone-700'
                }`}
                title="Marcar como visitado"
              >
                <CheckCircle2 className="w-4 h-4" />
              </button>

              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${activeSpot.lat},${activeSpot.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl text-xs bg-stone-800 text-stone-300 hover:text-white border border-stone-700 flex items-center gap-1"
                title="Abrir rota no Google Maps"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={() => onSelectSpot(activeSpot)}
              className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-1.5"
            >
              Ver Detalhes & Áudio
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
