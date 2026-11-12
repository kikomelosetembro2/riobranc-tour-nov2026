/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TouristSpot, RIO_BRANCO_SPOTS, ACRE_DISHES, TOUR_ITINERARIES, ACRE_SLANGS, ACRE_QUIZ } from './data/rioBrancoData';
import { RiverWeatherBar } from './components/RiverWeatherBar';
import { HomeView } from './components/HomeView';
import { InteractiveMap } from './components/InteractiveMap';
import { GastronomyView } from './components/GastronomyView';
import { ItinerariesView } from './components/ItinerariesView';
import { ChicoAssistant } from './components/ChicoAssistant';
import { CultureQuizView } from './components/CultureQuizView';
import { FavoritesView } from './components/FavoritesView';
import { SpotModal } from './components/SpotModal';
import { PWAInstallButton } from './components/PWAInstallButton';
import { SchoolsView } from './components/SchoolsView';

import {
  Compass,
  MapPin,
  Utensils,
  Calendar,
  Sparkles,
  BookOpen,
  Star,
  GraduationCap,
  Info,
  Menu,
  X,
  Share2,
  Download,
  FolderArchive,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'mapa' | 'gastronomia' | 'roteiros' | 'escolas' | 'assistente' | 'cultura' | 'favoritos'>('home');
  const [selectedSpot, setSelectedSpot] = useState<TouristSpot | null>(null);
  const [targetMapSpotId, setTargetMapSpotId] = useState<string | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exported, setExported] = useState(false);

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

  // Download complete App Data & Prompt configuration
  const handleExportData = () => {
    const backupData = {
      appName: 'Rio Branco-TourApk',
      version: '1.2.0',
      exportedAt: new Date().toISOString(),
      creator: 'Google AI Studio Build',
      location: 'Rio Branco - Acre, Brasil',
      systemPrompt: 'Você é o Chico Tour, o guia virtual oficial e caloroso do aplicativo Rio Branco-TourApk, em Rio Branco, capital do Acre, Brasil...',
      favorites,
      visited,
      attractionsCount: RIO_BRANCO_SPOTS.length,
      dishesCount: ACRE_DISHES.length,
      itinerariesCount: TOUR_ITINERARIES.length,
      migrationGuide: {
        toAnotherGmail: [
          '1. No Google AI Studio, abra o menu superior do aplicativo e clique em "Share" ou "Export".',
          '2. Você pode vincular a um repositório do GitHub (Settings > Connect GitHub) e cloná-lo na sua outra conta de Gmail.',
          '3. Para continuar modificando na nova conta, basta acessar https://aistudio.google.com/ com o novo Gmail e importar o repositório ou criar um novo app colando os arquivos.',
        ],
        limitsAndQuotas: [
          'No Google AI Studio (plano padrão com Gemini Flash), você tem até 15 requisições por minuto (RPM) e 1.500 requisições por dia (RPD) sem custo.',
          'O ciclo de limite gratuito é renovado diariamente à meia-noite UTC.',
          'Você pode fazer quantas edições e alterações no código desejar ao longo do tempo sem expiração do projeto.'
        ]
      }
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rio-branco-tour-apk-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setExported(true);
    setTimeout(() => setExported(false), 3000);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Telemetry & Acre River Level Bar */}
      <RiverWeatherBar onOpenTips={() => setActiveTab('home')} />

      {/* Main App Bar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo & Acre Flag Badge Brand */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 rounded-full border-2 border-amber-400 p-0.5 shadow-sm group-hover:scale-105 transition-transform overflow-hidden bg-white shrink-0">
              <img
                src="/assets/aistudio/51977699-bandeira-do-acre-estado-do-brasil-bandeira-oficial-faz-acre-circulo-bandeira-cracha-vetor_c775a930.jpg"
                alt="Bandeira Oficial do Acre"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg sm:text-xl tracking-tight text-stone-900 font-['Outfit']">
                  Rio Branco<span className="text-emerald-600">-Tour</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Apk
                </span>
              </div>
              <p className="text-[10px] text-stone-500 hidden xs:block">
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
              { id: 'escolas', label: 'Escolas', icon: GraduationCap },
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
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-xs scale-[1.02]'
                      : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-extrabold flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: PWA Install, Backup & Favorites */}
          <div className="flex items-center gap-2">
            {/* PWA Install Button */}
            <PWAInstallButton />

            {/* Export / Backup Project Modal Button */}
            <button
              onClick={() => setShowExportModal(true)}
              className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-emerald-700 border border-stone-200 transition-all"
              title="Exportar / Backup do Aplicativo"
            >
              <FolderArchive className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('assistente')}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-amber-600 hover:from-emerald-500 hover:to-amber-500 text-white text-xs font-extrabold shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Guia IA</span>
            </button>

            <button
              onClick={() => setActiveTab('favoritos')}
              className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-amber-600 border border-stone-200 transition-all relative"
              title="Meu Passaporte"
            >
              <Star className="w-4 h-4 fill-current" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-extrabold flex items-center justify-center">
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

        {activeTab === 'escolas' && <SchoolsView />}

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

      {/* Export / Migration & Quotas Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-[4500] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-7 max-w-lg w-full space-y-5 shadow-2xl text-stone-900 max-h-[90vh] overflow-y-auto scrollbar-thin">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2.5">
                <FolderArchive className="w-5 h-5 text-emerald-600" />
                <h3 className="font-extrabold text-lg text-stone-900">Exportar & Informações do App</h3>
              </div>
              <button
                onClick={() => setShowExportModal(false)}
                className="text-stone-400 hover:text-stone-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Direct download button */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
              <h4 className="text-sm font-bold text-emerald-900">
                Baixar Dados Completos & Configuração (JSON)
              </h4>
              <p className="text-xs text-stone-700 leading-relaxed">
                Faça o download de todos os pontos catalogados de Rio Branco, roteiros, dados do Chico Tour IA e seus favoritos para backup offline.
              </p>
              <button
                onClick={handleExportData}
                className="w-full mt-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
              >
                {exported ? <CheckCircle2 className="w-4 h-4 text-emerald-100" /> : <Download className="w-4 h-4" />}
                {exported ? 'Arquivo Baixado com Sucesso!' : 'Baixar Backup do Rio Branco-TourApk'}
              </button>
            </div>

            {/* How to export to another Gmail account */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-amber-800 uppercase tracking-wider text-[11px]">
                Como migrar ou abrir em outra conta de Gmail:
              </h4>
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2 text-stone-700">
                <p><b>1. Compartilhar Link:</b> Use o botão "Share" no topo do AI Studio para gerar um link e abrir na sua outra conta Google.</p>
                <p><b>2. Conectar com GitHub:</b> Vá no painel do AI Studio em <i>Settings &gt; Connect GitHub</i> para sincronizar o repositório completo com seu GitHub pessoal e cloná-lo quando quiser.</p>
                <p><b>3. Exportar Código:</b> Você pode baixar o pacote compactado de arquivos do projeto diretamente pelo ambiente de desenvolvimento.</p>
              </div>
            </div>

            {/* Quotas & Periods Explanation */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-emerald-800 uppercase tracking-wider text-[11px]">
                Limites e Períodos de Alterações no Google AI Studio:
              </h4>
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2 text-stone-700">
                <p>• <b>Sem Limite de Tempo:</b> O seu aplicativo não expira; você pode continuar alterando e evoluindo o projeto continuamente.</p>
                <p>• <b>Cota Diária Gratuita (Free Tier):</b> O modelo Gemini Flash oferece até <b>15 requisições por minuto (RPM)</b> e até <b>1.500 requisições por dia (RPD)</b> gratuitas, renovadas a cada 24 horas (meia-noite UTC).</p>
                <p>• <b>Sem Limite de Modificações no Código:</b> Edições de interface, estilos e dados locais (como o TourApk offline) rodam direto no navegador e no servidor sem consumir cota.</p>
              </div>
            </div>

            <button
              onClick={() => setShowExportModal(false)}
              className="w-full py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Persistent Mobile Bottom Navigation Bar (Apk Style) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-stone-200 px-2 py-1.5 flex items-center justify-around shadow-lg">
        {[
          { id: 'home', label: 'Início', icon: Compass },
          { id: 'mapa', label: 'Mapa', icon: MapPin },
          { id: 'gastronomia', label: 'Sabores', icon: Utensils },
          { id: 'roteiros', label: 'Roteiros', icon: Calendar },
          { id: 'escolas', label: 'Escolas', icon: GraduationCap },
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
                  ? 'text-emerald-700 font-bold scale-105'
                  : 'text-stone-500 hover:text-stone-800'
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
