import React, { useState, useEffect } from 'react';
import { TouristSpot } from '../data/rioBrancoData';
import {
  X,
  MapPin,
  Clock,
  Ticket,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Star,
  CheckCircle2,
  Share2,
  ExternalLink,
  Sparkles,
  Info
} from 'lucide-react';

interface SpotModalProps {
  spot: TouristSpot | null;
  onClose: () => void;
  isFavorite: boolean;
  isVisited: boolean;
  onToggleFavorite: (id: string) => void;
  onToggleVisited: (id: string) => void;
}

export const SpotModal: React.FC<SpotModalProps> = ({
  spot,
  onClose,
  isFavorite,
  isVisited,
  onToggleFavorite,
  onToggleVisited,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    // Stop any audio when modal closes or spot changes
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [spot]);

  if (!spot) return null;

  const handleToggleAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert('Síntese de voz não suportada pelo seu navegador.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(spot.audioGuideText);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.95;

      utterance.onend = () => {
        setIsPlayingAudio(false);
      };

      utterance.onerror = () => {
        setIsPlayingAudio(false);
      };

      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: `${spot.name} - Rio Branco TourApk`,
      text: `${spot.shortDescription} Venha conhecer este ponto turístico em Rio Branco, Acre!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(`${spot.name} - Rio Branco, Acre: ${spot.shortDescription}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white border border-stone-200 rounded-3xl shadow-2xl text-stone-900 flex flex-col scrollbar-thin scrollbar-thumb-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero Image & Controls */}
        <div className="relative h-64 sm:h-80 w-full shrink-0 overflow-hidden rounded-t-3xl bg-stone-100">
          <img
            src={spot.imageUrl}
            alt={spot.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs text-stone-700 hover:text-stone-900 flex items-center justify-center border border-stone-200 shadow-md hover:scale-105 transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Category Badge & Actions */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-600 text-white shadow-md">
              {spot.category}
            </span>
          </div>

          {/* Spot Title Over Image */}
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-sm">
              {spot.name}
            </h2>
            <div className="flex items-center gap-2 mt-1 text-xs text-stone-200">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{spot.neighborhood} • {spot.address}</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-6">
          {/* Quick Action Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <button
              onClick={() => onToggleFavorite(spot.id)}
              className={`p-3 rounded-2xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                isFavorite
                  ? 'bg-amber-100 border-amber-300 text-amber-800'
                  : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              <Star className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              {isFavorite ? 'Favoritado' : 'Favoritar'}
            </button>

            <button
              onClick={() => onToggleVisited(spot.id)}
              className={`p-3 rounded-2xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                isVisited
                  ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                  : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {isVisited ? 'Visitado ✓' : 'Fazer Check-in'}
            </button>

            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${spot.lat},${spot.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl bg-stone-50 hover:bg-stone-100 border border-stone-200 text-xs font-semibold text-emerald-700 flex items-center justify-center gap-2 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              Como Chegar
            </a>

            <button
              onClick={handleShare}
              className="p-3 rounded-2xl bg-stone-50 hover:bg-stone-100 border border-stone-200 text-xs font-semibold text-stone-700 flex items-center justify-center gap-2 transition-all"
            >
              <Share2 className="w-4 h-4" />
              {copiedLink ? 'Copiado!' : 'Compartilhar'}
            </button>
          </div>

          {/* Interactive Audio Guide Box */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 shrink-0">
                <Volume2 className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-emerald-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Áudio-Guia Oficial Rio Branco
                </h4>
                <p className="text-xs text-stone-600 mt-0.5">
                  Ouça a história narrada deste marco histórico em português.
                </p>
              </div>
            </div>

            <button
              onClick={handleToggleAudio}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all ${
                isPlayingAudio
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <Pause className="w-4 h-4" /> Pausar Narração
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" /> Ouvir Narração
                </>
              )}
            </button>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-emerald-700 mb-2">
              Sobre o Local
            </h4>
            <p className="text-stone-700 text-sm leading-relaxed whitespace-pre-line">
              {spot.fullDescription}
            </p>
          </div>

          {/* Key Highlights */}
          {spot.highlights && spot.highlights.length > 0 && (
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-emerald-700 mb-2">
                Destaques Imperdíveis
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {spot.highlights.map((h, idx) => (
                  <li
                    key={idx}
                    className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center gap-2 text-stone-700"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Practical Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-stone-50 p-4 rounded-2xl border border-stone-200">
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-stone-900">Horário de Funcionamento</p>
                <p className="text-stone-600 mt-0.5">{spot.openingHours}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Ticket className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-stone-900">Ingresso / Acesso</p>
                <p className="text-stone-600 mt-0.5">{spot.admission}</p>
              </div>
            </div>
          </div>

          {/* Fun Fact / Curiosidade Acreana */}
          {spot.funFact && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-amber-950">Curiosidade Acreana</p>
                <p className="mt-1 leading-relaxed text-amber-900/90">{spot.funFact}</p>
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {spot.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg bg-stone-100 text-[11px] font-medium text-stone-600 border border-stone-200"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
