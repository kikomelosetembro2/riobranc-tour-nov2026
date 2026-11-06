import React, { useState } from 'react';
import { TOUR_ITINERARIES, TourItinerary, RIO_BRANCO_SPOTS, TouristSpot } from '../data/rioBrancoData';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Sparkles, 
  Lightbulb, 
  Compass, 
  Share2, 
  CheckCircle, 
  ArrowRight,
  Download
} from 'lucide-react';

interface ItinerariesViewProps {
  onSelectSpot: (spot: TouristSpot) => void;
}

export const ItinerariesView: React.FC<ItinerariesViewProps> = ({ onSelectSpot }) => {
  const [selectedItinerary, setSelectedItinerary] = useState<TourItinerary>(TOUR_ITINERARIES[0]);
  const [copied, setCopied] = useState(false);

  const handleCopyItinerary = () => {
    let text = `${selectedItinerary.title}\nDuração: ${selectedItinerary.duration}\n${selectedItinerary.summary}\n\n`;
    selectedItinerary.steps.forEach((step) => {
      text += `[${step.time}] ${step.title}\n${step.description}\nDica: ${step.tip}\n\n`;
    });
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-stone-900 to-amber-950/80 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Calendar className="w-3.5 h-3.5" />
          Roteiros Planejados em Rio Branco
        </div>
        <h2 className="text-3xl font-extrabold text-white">
          Itinerários Prontos para sua Viagem ao Acre
        </h2>
        <p className="text-sm text-stone-300 max-w-2xl leading-relaxed">
          Planejados hora a hora por guias locais para otimizar seus deslocamentos entre o Primeiro e o Segundo Distrito de Rio Branco, evitando o calor forte e aproveitando o melhor de cada atração.
        </p>
      </div>

      {/* Itinerary Selection Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {TOUR_ITINERARIES.map((it) => {
          const isSelected = selectedItinerary.id === it.id;
          return (
            <button
              key={it.id}
              onClick={() => setSelectedItinerary(it)}
              className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                isSelected
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-xl shadow-emerald-950/50 scale-[1.02]'
                  : 'bg-stone-900 text-stone-300 border-stone-800 hover:bg-stone-800 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className={`px-2.5 py-0.5 rounded-full ${isSelected ? 'bg-emerald-800 text-white' : 'bg-stone-800 text-stone-400'}`}>
                  {it.duration}
                </span>
                <span className="text-[11px] opacity-80">{it.difficulty}</span>
              </div>
              <h3 className="font-bold text-sm leading-tight">{it.title}</h3>
              <p className={`text-xs line-clamp-2 ${isSelected ? 'text-emerald-100' : 'text-stone-400'}`}>
                {it.summary}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Itinerary Details */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
              Roteiro Recomendado
            </span>
            <h3 className="text-2xl font-extrabold text-white mt-1">
              {selectedItinerary.title}
            </h3>
            <p className="text-xs text-stone-400 mt-1">
              Indicado para: <span className="text-stone-300 font-medium">{selectedItinerary.recommendedFor}</span>
            </p>
          </div>

          <button
            onClick={handleCopyItinerary}
            className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-xs font-semibold text-stone-200 flex items-center gap-2 self-start transition-all"
          >
            {copied ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Download className="w-4 h-4" />}
            {copied ? 'Copiado para o Celular!' : 'Salvar / Copiar Roteiro'}
          </button>
        </div>

        {/* Timeline Steps */}
        <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-stone-800">
          {selectedItinerary.steps.map((step, idx) => {
            const linkedSpot = step.spotId
              ? RIO_BRANCO_SPOTS.find((s) => s.id === step.spotId)
              : null;

            return (
              <div key={idx} className="relative group">
                {/* Timeline Pin Dot */}
                <div className="absolute -left-6 sm:-left-8 top-1 w-5 h-5 rounded-full bg-emerald-600 border-4 border-stone-900 shadow-md group-hover:scale-110 transition-transform" />

                <div className="p-4 sm:p-5 rounded-2xl bg-stone-800/60 border border-stone-700/70 hover:border-emerald-500/50 transition-all space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-bold font-mono">
                      {step.time}
                    </span>
                    {linkedSpot && (
                      <button
                        onClick={() => onSelectSpot(linkedSpot)}
                        className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
                      >
                        Ver Ponto no Mapa & Áudio
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <h4 className="font-extrabold text-base text-stone-100">
                    {step.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    {step.description}
                  </p>

                  <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/30 text-amber-200 text-xs flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <p><span className="font-bold text-amber-300">Dica do Guia:</span> {step.tip}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
