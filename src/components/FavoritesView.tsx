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
  let badgeColor = 'text-stone-400 bg-stone-800 border-stone-700';
  if (visitedCount >= 10) {
    badgeRank = '🏆 Cidadão Honorário do Acre';
    badgeColor = 'text-amber-300 bg-amber-500/20 border-amber-500/40';
  } else if (visitedCount >= 6) {
    badgeRank = '🌿 Desbravador do Rio Acre';
    badgeColor = 'text-emerald-300 bg-emerald-500/20 border-emerald-500/40';
  } else if (visitedCount >= 2) {
    badgeRank = '🌟 Explorador dos Seringais';
    badgeColor = 'text-blue-300 bg-blue-500/20 border-blue-500/40';
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Passaporte Acreano Header Card */}
      <div className="bg-gradient-to-r from-emerald-950 via-stone-900 to-amber-950/60 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Passaporte de Viagem
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Meu Progresso em Rio Branco
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 mt-1">
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
            <span className="text-stone-300">
              {visitedCount} de {totalSpots} lugares visitados
            </span>
            <span className="text-emerald-400 font-mono font-bold">{progressPercent}%</span>
          </div>

          <div className="w-full h-3 rounded-full bg-stone-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Favorited Spots Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            Meus Locais Salvos ({favoriteSpots.length})
          </h3>
          {favoriteSpots.length === 0 && (
            <button
              onClick={onExploreMore}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              Explorar Mapa e Salvar
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {favoriteSpots.length === 0 ? (
          <div className="p-8 rounded-3xl bg-stone-900 border border-stone-800 text-center space-y-3">
            <p className="text-stone-400 text-sm">
              Você ainda não favoritou nenhum ponto turístico.
            </p>
            <button
              onClick={onExploreMore}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-all"
            >
              Conhecer Atrações de Rio Branco
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {favoriteSpots.map((spot) => (
              <div
                key={spot.id}
                className="bg-stone-900 border border-stone-800 rounded-2xl p-4 shadow-xl hover:border-stone-700 transition-all flex flex-col justify-between gap-3"
              >
                <div className="flex gap-3">
                  <img
                    src={spot.imageUrl}
                    alt={spot.name}
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                      {spot.neighborhood}
                    </span>
                    <h4 className="font-bold text-sm text-stone-100 truncate mt-0.5">{spot.name}</h4>
                    <p className="text-xs text-stone-400 line-clamp-2 mt-1">
                      {spot.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-800">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onToggleVisited(spot.id)}
                      className={`p-1.5 rounded-lg text-xs border ${
                        visited.includes(spot.id)
                          ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300'
                          : 'bg-stone-800 border-stone-700 text-stone-400 hover:text-emerald-300'
                      }`}
                      title="Marcar como visitado"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onToggleFavorite(spot.id)}
                      className="p-1.5 rounded-lg bg-stone-800 border border-stone-700 text-red-400 hover:bg-stone-700"
                      title="Remover dos favoritos"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => onSelectSpot(spot)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
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
      <div className="space-y-4 pt-4 border-t border-stone-800">
        <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
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
                className="p-3 rounded-2xl bg-emerald-950/30 border border-emerald-800/40 text-stone-200 cursor-pointer hover:border-emerald-500 transition-all text-xs font-semibold flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">{spot.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
