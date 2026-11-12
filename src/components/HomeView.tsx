import React, { useState } from 'react';
import { TouristSpot, RIO_BRANCO_SPOTS, ACRE_DISHES } from '../data/rioBrancoData';
import { 
  Search, 
  MapPin, 
  Clock, 
  Star, 
  CheckCircle2, 
  Volume2, 
  Sparkles, 
  ArrowRight, 
  Utensils, 
  Compass,
  Trees,
  Landmark,
  ExternalLink,
  GraduationCap
} from 'lucide-react';
import { DynamicTravelTips } from './DynamicTravelTips';

interface HomeViewProps {
  onSelectSpot: (spot: TouristSpot) => void;
  onOpenMapToSpot: (spotId: string) => void;
  onNavigateToTab: (tab: string) => void;
  favorites: string[];
  visited: string[];
  onToggleFavorite: (id: string) => void;
  onToggleVisited: (id: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectSpot,
  onOpenMapToSpot,
  onNavigateToTab,
  favorites,
  visited,
  onToggleFavorite,
  onToggleVisited,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  const filteredSpots = RIO_BRANCO_SPOTS.filter((spot) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      spot.name.toLowerCase().includes(query) ||
      spot.shortDescription.toLowerCase().includes(query) ||
      spot.neighborhood.toLowerCase().includes(query) ||
      spot.tags.some((t) => t.toLowerCase().includes(query));

    const matchesCategory =
      selectedCategory === 'todos' || spot.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Welcome Header */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-700 to-amber-700 border border-emerald-900/10 p-6 sm:p-10 shadow-lg text-white">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white text-xs font-extrabold uppercase tracking-widest backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-red-500 inline-block shadow-xs" />
            Acre • Amazônia Ocidental
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-none drop-shadow-xs">
            Descubra Rio Branco
          </h1>

          <p className="text-sm sm:text-base text-emerald-50 leading-relaxed font-normal max-w-2xl">
            O guia definitivo da capital acreana: sob a sombra da Gameleira centenária, os aromas da Baixaria no Mercado do Bosque, a luta heróica dos seringueiros e a brisa suave do Rio Acre.
          </p>

          {/* Search Box */}
          <div className="relative max-w-xl pt-2">
            <Search className="w-5 h-5 absolute left-4 top-5 text-stone-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar pontos turísticos, comidas, bairros..."
              className="w-full bg-white/95 text-stone-900 border border-white/60 rounded-2xl pl-12 pr-4 py-3.5 text-sm placeholder-stone-400 shadow-md focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Decorative Watermark Star of Acre */}
        <div className="absolute right-4 -bottom-10 opacity-15 pointer-events-none select-none">
          <svg width="280" height="280" viewBox="0 0 100 100" fill="#ffffff">
            <polygon points="50,5 64,38 98,38 70,59 81,92 50,72 19,92 30,59 2,38 36,38" />
          </svg>
        </div>
      </div>

      {/* Quick Access Action Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <button
          onClick={() => onNavigateToTab('mapa')}
          className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-emerald-500 hover:shadow-md transition-all text-left group shadow-xs"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
            <Compass className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-stone-900">Mapa do Acre</h4>
          <p className="text-xs text-stone-500 mt-0.5">Rotas & GPS ao vivo</p>
        </button>

        <button
          onClick={() => onNavigateToTab('gastronomia')}
          className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-amber-500 hover:shadow-md transition-all text-left group shadow-xs"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
            <Utensils className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-stone-900">Baixaria & Sabores</h4>
          <p className="text-xs text-stone-500 mt-0.5">Tacacá, peixes e doces</p>
        </button>

        <button
          onClick={() => onNavigateToTab('roteiros')}
          className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-emerald-500 hover:shadow-md transition-all text-left group shadow-xs"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
            <Clock className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-stone-900">Roteiros Prontos</h4>
          <p className="text-xs text-stone-500 mt-0.5">1 dia, fim de semana</p>
        </button>

        <button
          onClick={() => onNavigateToTab('escolas')}
          className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-blue-500 hover:shadow-md transition-all text-left group shadow-xs"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-stone-900">Escolas</h4>
          <p className="text-xs text-stone-500 mt-0.5">Municipais & Estaduais</p>
        </button>

        <button
          onClick={() => onNavigateToTab('assistente')}
          className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-emerald-500 hover:shadow-md transition-all text-left group shadow-xs col-span-2 sm:col-span-1"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-stone-900">Chico Tour IA</h4>
          <p className="text-xs text-stone-500 mt-0.5">Dicas e roteiro 24h</p>
        </button>
      </div>

      {/* Dynamic Travel Tips Component */}
      <DynamicTravelTips onOpenSpot={onOpenMapToSpot} currentTemp={29} />

      {/* Featured Banner: A Baixaria do Bosque */}
      <div className="p-5 sm:p-6 rounded-3xl bg-amber-50 border border-amber-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=80"
            alt="Baixaria de Rio Branco"
            className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-amber-300 shadow-xs"
          />
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-800">
              Patrimônio Cultural Imaterial
            </span>
            <h3 className="font-extrabold text-lg text-stone-900">
              Já provou a Baixaria no Mercado do Bosque?
            </h3>
            <p className="text-xs text-stone-600 mt-0.5">
              Cuscuz de milho macio, carne moída temperada, cheiro-verde fresco e dois ovos caipiras fritos com gema mole.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigateToTab('gastronomia')}
          className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-2 whitespace-nowrap self-stretch sm:self-auto justify-center"
        >
          Conhecer a Gastronomia
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Categories Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'todos', label: 'Todos os Locais' },
          { id: 'historico', label: '🏛️ Histórico' },
          { id: 'gastronomia', label: '🥘 Gastronomia' },
          { id: 'natureza', label: '🌳 Natureza & Parques' },
          { id: 'cultura', label: '🎨 Cultura & Museus' },
          { id: 'religioso', label: '⛪ Templos' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-emerald-600 text-white shadow-xs scale-[1.02]'
                : 'bg-white text-stone-700 hover:bg-stone-100 hover:text-stone-900 border border-stone-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Attractions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSpots.map((spot) => {
          const isFav = favorites.includes(spot.id);
          const isVis = visited.includes(spot.id);

          return (
            <div
              key={spot.id}
              className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between group"
            >
              {/* Image & Badges */}
              <div className="relative h-48 overflow-hidden bg-stone-100">
                <img
                  src={spot.imageUrl}
                  alt={spot.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-black/20" />

                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-xs text-white border border-white/20">
                    {spot.category}
                  </span>
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <button
                    onClick={() => onToggleFavorite(spot.id)}
                    className={`p-2 rounded-full backdrop-blur-xs transition-all ${
                      isFav
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'bg-white/80 text-stone-700 hover:bg-white'
                    }`}
                    title="Favoritar"
                  >
                    <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                  </button>

                  <button
                    onClick={() => onToggleVisited(spot.id)}
                    className={`p-2 rounded-full backdrop-blur-xs transition-all ${
                      isVis
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white/80 text-stone-700 hover:bg-white'
                    }`}
                    title="Já visitei"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-white">
                  <span className="flex items-center gap-1 drop-shadow-xs font-medium">
                    <MapPin className="w-3 h-3 text-emerald-300" />
                    {spot.neighborhood}
                  </span>
                  <span className="font-bold text-amber-300 drop-shadow-xs">
                    {spot.admission}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-base text-stone-900 group-hover:text-emerald-700 transition-colors">
                    {spot.name}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2 mt-1 leading-relaxed">
                    {spot.shortDescription}
                  </p>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onOpenMapToSpot(spot.id)}
                    className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-900 text-xs flex items-center gap-1.5 transition-all"
                    title="Ver no Mapa"
                  >
                    <Compass className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-[11px] font-semibold">Mapa</span>
                  </button>

                  <button
                    onClick={() => onSelectSpot(spot)}
                    className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    Detalhes & Áudio
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
