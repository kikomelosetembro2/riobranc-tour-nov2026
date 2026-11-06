/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TouristSpot, RIO_BRANCO_SPOTS } from './data/rioBrancoData';
import { RiverWeatherBar } from './components/RiverWeatherBar';
import { HomeView } from './components/HomeView';
import { InteractiveMap } from './components/InteractiveMap';
import { GastronomyView } from './components/GastronomyView';
import { ItinerariesView } from './components/ItinerariesView';
import { ChicoAssistant } from './components/ChicoAssistant';
import { CultureQuizView } from './components/CultureQuizView';
import { FavoritesView } from './components/FavoritesView';
import { SpotModal } from './components/SpotModal';

import {
  Compass,
  MapPin,
  Utensils,
  Calendar,
  Sparkles,
  BookOpen,
  Star,
  Info,
  Menu,
  X,
  Share2
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'mapa' | 'gastronomia' | 'roteiros' | 'assistente' | 'cultura' | 'favoritos'>('home');
  const [selectedSpot, setSelectedSpot] = useState<TouristSpot | null>(null);
  const [targetMapSpotId, setTargetMapSpotId] = useState<string | null>(null);

  // Local storage for Favorites and Visited places
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('rb_tour_favorites');
      return saved ? JSON.parse(saved) : ['gameleira', 'mercado-do-bosque', 'palacio-rio-branco'];
    } catch {
      return ['gameleira', 'mercado-do-bosque'];
    }
  });

  const [visited, setVisited] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('rb_tour_visited');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('rb_tour_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.warn('Falha ao salvar favoritos no storage');
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('rb_tour_visited', JSON.stringify(visited));
    } catch (e) {
      console.warn('Falha ao salvar visitados no storage');
    }
  }, [visited]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleVisited = (id: string) => {
    setVisited((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleOpenMapToSpot = (spotId: string) => {
    setTargetMapSpotId(spotId);
    setActiveTab('mapa');
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Telemetry & Acre River Level Bar */}
      <RiverWeatherBar />

      {/* Main App Bar */}
      <header className="sticky top-0 z-50 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo & Acre Flag Star Brand */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-700 via-emerald-600 to-amber-500 p-0.5 shadow-lg group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className="w-full h-full bg-stone-900 rounded-[14px] flex items-center justify-center">
                {/* Red Star of Acre */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#ef4444">
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                </svg>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg sm:text-xl tracking-tight text-white font-['Outfit']">
                  Rio Branco<span className="text-emerald-400">-Tour</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  Apk
                </span>
              </div>
              <p className="text-[10px] text-stone-400 hidden xs:block">
                Guia Turístico, Cultural & Gastronômico do Acre
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {[
              { id: 'home', label: 'Início', icon: Compass },
              { id: 'mapa', label: 'Mapa Interativo', icon: MapPin },
              { id: 'gastronomia', label: 'Gastronomia', icon: Utensils },
              { id: 'roteiros', label: 'Roteiros', icon: Calendar },
              { id: 'assistente', label: 'Chico Tour IA', icon: Sparkles },
              { id: 'cultura', label: 'Cultura & Quiz', icon: BookOpen },
              { id: 'favoritos', label: 'Passaporte', icon: Star, badge: favorites.length },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950 scale-[1.02]'
                      : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="w-4 h-4 rounded-full bg-amber-500 text-stone-950 text-[10px] font-extrabold flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Quick Chico IA Access or Favorites */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('assistente')}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-amber-600 hover:from-emerald-500 hover:to-amber-500 text-white text-xs font-extrabold shadow-md flex items-center gap-1.5 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Guia IA</span>
            </button>

            <button
              onClick={() => setActiveTab('favoritos')}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-400 border border-stone-700 transition-all relative"
              title="Meu Passaporte"
            >
              <Star className="w-4 h-4 fill-current" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-extrabold flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-20 lg:pb-12">
        {activeTab === 'home' && (
          <HomeView
            onSelectSpot={setSelectedSpot}
            onOpenMapToSpot={handleOpenMapToSpot}
            onNavigateToTab={(t) => setActiveTab(t as any)}
            favorites={favorites}
            visited={visited}
            onToggleFavorite={toggleFavorite}
            onToggleVisited={toggleVisited}
          />
        )}

        {activeTab === 'mapa' && (
          <InteractiveMap
            onSelectSpot={setSelectedSpot}
            favorites={favorites}
            visited={visited}
            onToggleFavorite={toggleFavorite}
            onToggleVisited={toggleVisited}
            selectedSpotId={targetMapSpotId}
          />
        )}

        {activeTab === 'gastronomia' && (
          <GastronomyView onSpotClick={handleOpenMapToSpot} />
        )}

        {activeTab === 'roteiros' && (
          <ItinerariesView onSelectSpot={setSelectedSpot} />
        )}

        {activeTab === 'assistente' && <ChicoAssistant />}

        {activeTab === 'cultura' && <CultureQuizView />}

        {activeTab === 'favoritos' && (
          <FavoritesView
            favorites={favorites}
            visited={visited}
            onToggleFavorite={toggleFavorite}
            onToggleVisited={toggleVisited}
            onSelectSpot={setSelectedSpot}
            onExploreMore={() => setActiveTab('home')}
          />
        )}
      </main>

      {/* Spot Detail & Audio Guide Modal */}
      <SpotModal
        spot={selectedSpot}
        onClose={() => setSelectedSpot(null)}
        isFavorite={selectedSpot ? favorites.includes(selectedSpot.id) : false}
        isVisited={selectedSpot ? visited.includes(selectedSpot.id) : false}
        onToggleFavorite={toggleFavorite}
        onToggleVisited={toggleVisited}
      />

      {/* Persistent Mobile Bottom Navigation Bar (Apk Style) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-stone-900/95 backdrop-blur-lg border-t border-stone-800 px-2 py-1.5 flex items-center justify-around shadow-2xl">
        {[
          { id: 'home', label: 'Início', icon: Compass },
          { id: 'mapa', label: 'Mapa', icon: MapPin },
          { id: 'gastronomia', label: 'Sabores', icon: Utensils },
          { id: 'roteiros', label: 'Roteiros', icon: Calendar },
          { id: 'assistente', label: 'Chico IA', icon: Sparkles },
          { id: 'cultura', label: 'Cultura', icon: BookOpen },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
                isActive
                  ? 'text-emerald-400 font-bold scale-105'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
