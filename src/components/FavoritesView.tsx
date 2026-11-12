import React from 'react';
import { RIO_BRANCO_SPOTS, TouristSpot } from '../data/rioBrancoData';
import { 
  Star, 
  CheckCircle2, 
  MapPin, 
  ExternalLink, 
  Trash2, 
  Award, 
  Compass,
  ArrowRight 
} from 'lucide-react';

interface FavoritesViewProps {
  favorites: string[];
  visited: string[];
  onToggleFavorite: (id: string) => void;
  onToggleVisited: (id: string) => void;
  onSelectSpot: (spot: TouristSpot) => void;
  onExploreMore: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favorites,
  visited,
  onToggleFavorite,
  onToggleVisited,
  onSelectSpot,
  onExploreMore,
}) => {
  const favoriteSpots = RIO_BRANCO_SPOTS.filter((s) => favorites.includes(s.id));
  const visitedSpots = RIO_BRANCO_SPOTS.filter((s) => visited.includes(s.id));

  const totalSpots = RIO_BRANCO_SPOTS.length;
  const visitedCount = visitedSpots.length;
  const progressPercent = Math.round((visitedCount / totalSpots) * 100);

  // Badge rank
  let badgeRank = 'Viajante Curioso';
  let badgeColor = 'text-stone-700 bg-white/20 border-white/30';
  if (visitedCount >= 10) {
    badgeRank = '🏆 Cidadão Honorário do Acre';
    badgeColor = 'text-amber-200 bg-amber-500/30 border-amber-300/40';
  } else if (visitedCount >= 6) {
    badgeRank = '🌿 Desbravador do Rio Acre';
    badgeColor = 'text-emerald-200 bg-emerald-500/30 border-emerald-300/40';
  } else if (visitedCount >= 2) {
    badgeRank = '🌟 Explorador dos Seringais';
    badgeColor = 'text-blue-200 bg-blue-500/30 border-blue-300/40';
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Passaporte Acreano Header Card */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-700 to-amber-700 border border-emerald-900/10 rounded-3xl p-6 sm:p-8 shadow-lg text-white space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
              Passaporte de Viagem
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Meu Progresso em Rio Branco
            </h2>
            <p className="text-xs sm:text-sm text-emerald-50 mt-1">
              Marque os locais que você já conheceu ao vivo na capital do Acre para colecionar conquistas.
            </p>
          </div>

          <div className={`px-4 py-2.5 rounded-2xl border text-xs font-extrabold self-start ${badgeColor}`}>
            {badgeRank}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-emerald-100">
              {visitedCount} de {totalSpots} lugares visitados
            </span>
            <span className="text-amber-300 font-mono font-bold">{progressPercent}%</span>
          </div>

          <div className="w-full h-3 rounded-full bg-black/20 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-300 to-emerald-300 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Favorited Spots Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-extrabold text-stone-900 flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            Meus Locais Salvos ({favoriteSpots.length})
          </h3>
          {favoriteSpots.length === 0 && (
            <button
              onClick={onExploreMore}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              Explorar Mapa e Salvar
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {favoriteSpots.length === 0 ? (
          <div className="p-8 rounded-3xl bg-white border border-stone-200 text-center space-y-3 shadow-xs">
            <p className="text-stone-500 text-sm">
              Você ainda não favoritou nenhum ponto turístico.
            </p>
            <button
              onClick={onExploreMore}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all"
            >
              Conhecer Atrações de Rio Branco
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {favoriteSpots.map((spot) => (
              <div
                key={spot.id}
                className="bg-white border border-stone-200 rounded-2xl p-4 shadow-xs hover:border-emerald-300 hover:shadow-sm transition-all flex flex-col justify-between gap-3"
              >
                <div className="flex gap-3">
                  <img
                    src={spot.imageUrl}
                    alt={spot.name}
                    className="w-20 h-20 rounded-xl object-cover shrink-0 border border-stone-200"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                      {spot.neighborhood}
                    </span>
                    <h4 className="font-bold text-sm text-stone-900 truncate mt-0.5">{spot.name}</h4>
                    <p className="text-xs text-stone-500 line-clamp-2 mt-1">
                      {spot.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onToggleVisited(spot.id)}
                      className={`p-1.5 rounded-lg text-xs border ${
                        visited.includes(spot.id)
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                          : 'bg-stone-100 border-stone-200 text-stone-600 hover:text-emerald-700'
                      }`}
                      title="Marcar como visitado"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onToggleFavorite(spot.id)}
                      className="p-1.5 rounded-lg bg-stone-100 border border-stone-200 text-red-600 hover:bg-stone-200"
                      title="Remover dos favoritos"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => onSelectSpot(spot)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all"
                  >
                    Ver Detalhes
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Visited Places Section */}
      <div className="space-y-4 pt-4 border-t border-stone-200">
        <h3 className="text-xl font-extrabold text-stone-900 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          Lugares que Já Visitei ({visitedSpots.length})
        </h3>

        {visitedSpots.length === 0 ? (
          <p className="text-stone-500 text-xs italic">
            Nenhum check-in registrado ainda. Ao visitar o Palácio Rio Branco, a Gameleira ou o Mercado Velho, clique em "Fazer Check-in"!
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {visitedSpots.map((spot) => (
              <div
                key={spot.id}
                onClick={() => onSelectSpot(spot)}
                className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 cursor-pointer hover:border-emerald-400 hover:shadow-xs transition-all text-xs font-semibold flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="truncate">{spot.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
