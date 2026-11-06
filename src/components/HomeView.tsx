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
  ExternalLink
} from 'lucide-react';

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
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-950 via-stone-900 to-amber-950/70 border border-stone-800 p-6 sm:p-10 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-extrabold uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-red-500 inline-block shadow-sm" />
            Acre • Amazônia Ocidental
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-none">
            Descubra Rio Branco
          </h1>

          <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-normal">
            O guia definitivo da capital acreana: sob a sombra da Gameleira centenária, os aromas da Baixaria no Mercado do Bosque, a luta heróica dos seringueiros e a brisa suave do Rio Acre.
          </p>

          {/* Search Box */}
          <div className="relative max-w-xl pt-2">
            <Search className="w-5 h-5 absolute left-4 top-5 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar pontos turísticos, comidas, bairros..."
              className="w-full bg-stone-900/90 backdrop-blur-md border border-stone-700/80 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-stone-100 placeholder-stone-500 shadow-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
            />
          </div>
        </div>

        {/* Decorative Watermark Star of Acre */}
        <div className="absolute right-4 -bottom-10 opacity-10 pointer-events-none select-none">
          <svg width="280" height="280" viewBox="0 0 100 100" fill="#ef4444">
            <polygon points="50,5 64,38 98,38 70,59 81,92 50,72 19,92 30,59 2,38 36,38" />
          </svg>
        </div>
      </div>

      {/* Quick Access Action Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => onNavigateToTab('mapa')}
          className="p-4 rounded-2xl bg-stone-900 border border-stone-800 hover:border-emerald-500/60 transition-all text-left group shadow-lg"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
            <Compass className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-stone-100">Mapa do Acre</h4>
          <p className="text-xs text-stone-400 mt-0.5">Rotas & GPS ao vivo</p>
        </button>

        <button
          onClick={() => onNavigateToTab('gastronomia')}
          className="p-4 rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/60 transition-all text-left group shadow-lg"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
            <Utensils className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-stone-100">Baixaria & Sabores</h4>
          <p className="text-xs text-stone-400 mt-0.5">Tacacá, peixes e doces</p>
        </button>

        <button
          onClick={() => onNavigateToTab('roteiros')}
          className="p-4 rounded-2xl bg-stone-900 border border-stone-800 hover:border-emerald-500/60 transition-all text-left group shadow-lg"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-300 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
            <Clock className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-stone-100">Roteiros Prontos</h4>
          <p className="text-xs text-stone-400 mt-0.5">1 dia, fim de semana</p>
        </button>

        <button
          onClick={() => onNavigateToTab('assistente')}
          className="p-4 rounded-2xl bg-stone-900 border border-stone-800 hover:border-emerald-500/60 transition-all text-left group shadow-lg"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-stone-100">Chico Tour IA</h4>
          <p className="text-xs text-stone-400 mt-0.5">Dicas e roteiro 24h</p>
        </button>
      </div>

      {/* Featured Banner: A Baixaria do Bosque */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-amber-950/60 to-stone-900 border border-amber-800/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=80"
            alt="Baixaria de Rio Branco"
            className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-amber-600/50"
          />
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400">
              Patrimônio Cultural Imaterial
            </span>
            <h3 className="font-extrabold text-lg text-white">
              Já provou a Baixaria no Mercado do Bosque?
            </h3>
            <p className="text-xs text-stone-300 mt-0.5">
              Cuscuz de milho macio, carne moída temperada, cheiro-verde fresco e dois ovos caipiras fritos com gema mole.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigateToTab('gastronomia')}
          className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-lg transition-all flex items-center gap-2 whitespace-nowrap self-stretch sm:self-auto justify-center"
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
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950 scale-[1.02]'
                : 'bg-stone-900 text-stone-400 hover:bg-stone-800 hover:text-white border border-stone-800'
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
              className="bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-xl hover:border-stone-700 transition-all flex flex-col justify-between group"
            >
              {/* Image & Badges */}
              <div className="relative h-48 overflow-hidden bg-stone-950">
                <img
                  src={spot.imageUrl}
                  alt={spot.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-black/30" />

                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                    {spot.category}
                  </span>
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <button
                    onClick={() => onToggleFavorite(spot.id)}
                    className={`p-2 rounded-full backdrop-blur-md transition-all ${
                      isFav
                        ? 'bg-amber-500 text-white shadow-lg'
                        : 'bg-stone-900/80 text-stone-300 hover:text-white'
                    }`}
                    title="Favoritar"
                  >
                    <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                  </button>

                  <button
                    onClick={() => onToggleVisited(spot.id)}
                    className={`p-2 rounded-full backdrop-blur-md transition-all ${
                      isVis
                        ? 'bg-emerald-500 text-white shadow-lg'
                        : 'bg-stone-900/80 text-stone-300 hover:text-white'
                    }`}
                    title="Já visitei"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-stone-300">
                  <span className="flex items-center gap-1 drop-shadow">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    {spot.neighborhood}
                  </span>
                  <span className="font-semibold text-emerald-400 drop-shadow">
                    {spot.admission}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-base text-stone-100 group-hover:text-emerald-400 transition-colors">
                    {spot.name}
                  </h3>
                  <p className="text-xs text-stone-400 line-clamp-2 mt-1 leading-relaxed">
                    {spot.shortDescription}
                  </p>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-2 border-t border-stone-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onOpenMapToSpot(spot.id)}
                    className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs flex items-center gap-1.5 transition-all"
                    title="Ver no Mapa"
                  >
                    <Compass className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[11px] font-semibold">Mapa</span>
                  </button>

                  <button
                    onClick={() => onSelectSpot(spot)}
                    className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
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
