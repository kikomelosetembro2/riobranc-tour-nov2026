import React, { useState } from 'react';
import { ACRE_DISHES, AcreDish } from '../data/rioBrancoData';
import { 
  Utensils, 
  MapPin, 
  Clock, 
  Sparkles, 
  Flame, 
  Heart, 
  ChefHat, 
  Award, 
  RotateCcw,
  Check 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface GastronomyViewProps {
  onSpotClick?: (spotId: string) => void;
}

export const GastronomyView: React.FC<GastronomyViewProps> = () => {
  const [selectedDish, setSelectedDish] = useState<AcreDish>(ACRE_DISHES[0]);

  // "Monte a sua Baixaria" interactive simulator state
  const [baixariaBase, setBaixariaBase] = useState('Cuscuz de Milho Flocão Tradicional');
  const [baixariaCarne, setBaixariaCarne] = useState('Carne Moída Refogada com Bastante Tempero');
  const [baixariaOvos, setBaixariaOvos] = useState('2 Ovos Fritos com Gema Bem Mole');
  const [baixariaCheiroVerde, setBaixariaCheiroVerde] = useState(true);
  const [baixariaPimenta, setBaixariaPimenta] = useState(true);
  const [baixariaFeita, setBaixariaFeita] = useState(false);

  const handlePrepararBaixaria = () => {
    setBaixariaFeita(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#f59e0b', '#10b981', '#ef4444'],
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-950/80 via-stone-900 to-emerald-950/80 border border-stone-800 p-6 sm:p-10 shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Utensils className="w-3.5 h-3.5" />
            Gastronomia Acreana em Rio Branco
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Sabores da Floresta e Herança dos Seringais
          </h2>
          <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
            A culinária de Rio Branco é única no Brasil. Fruto da confluência entre tradições indígenas milenares, a migração dos seringueiros nordestinos e a influência dos imigrantes árabes e libaneses que vieram na era da borracha.
          </p>
        </div>
      </div>

      {/* Dishes Horizontal Switcher */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {ACRE_DISHES.map((dish) => {
          const isSelected = selectedDish.id === dish.id;
          return (
            <button
              key={dish.id}
              onClick={() => setSelectedDish(dish)}
              className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between gap-3 ${
                isSelected
                  ? 'bg-amber-600 text-white border-amber-500 shadow-xl shadow-amber-950/50 scale-[1.02]'
                  : 'bg-stone-900/90 text-stone-300 border-stone-800 hover:bg-stone-800 hover:text-white'
              }`}
            >
              <div className="w-full h-20 rounded-xl overflow-hidden bg-stone-950 shrink-0">
                <img
                  src={dish.imageUrl}
                  alt={dish.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-bold text-xs sm:text-sm leading-snug">{dish.name}</p>
                <p className={`text-[11px] line-clamp-1 mt-0.5 ${isSelected ? 'text-amber-100' : 'text-stone-400'}`}>
                  {dish.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Dish Deep Dive Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="lg:col-span-5 space-y-4">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-stone-950 border border-stone-800 shadow-inner">
            <img
              src={selectedDish.imageUrl}
              alt={selectedDish.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-stone-950/80 backdrop-blur-md border border-stone-700 text-xs font-semibold text-amber-400 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5" />
              Nível: {selectedDish.spiceLevel}
            </div>
          </div>

          <div className="bg-stone-800/50 rounded-2xl p-4 border border-stone-800 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Ingredientes Típicos
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {selectedDish.ingredients.map((ing, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-stone-800 text-xs text-stone-300 border border-stone-700/60"
                >
                  • {ing}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Prato Típico de Rio Branco
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-100">
              {selectedDish.name}
            </h3>
            <p className="text-sm font-medium text-amber-400/90 mt-0.5">
              {selectedDish.subtitle}
            </p>

            <div className="mt-4 space-y-3 text-stone-300 text-sm leading-relaxed">
              <p>{selectedDish.description}</p>
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-900/40 text-stone-200">
                <span className="font-bold text-amber-300 block mb-1">A História do Prato:</span>
                <p className="text-xs sm:text-sm text-stone-300">{selectedDish.story}</p>
              </div>
            </div>
          </div>

          {/* Where to Eat in Rio Branco */}
          <div className="space-y-3 pt-4 border-t border-stone-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              Onde Provar em Rio Branco
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedDish.whereToEat.map((loc, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-stone-800/70 border border-stone-700/80 space-y-1"
                >
                  <p className="font-bold text-sm text-stone-100">{loc.place}</p>
                  <p className="text-xs text-stone-400">{loc.neighborhood} • {loc.address}</p>
                  <p className="text-[11px] text-amber-300/90 flex items-center gap-1 pt-1">
                    <Clock className="w-3 h-3" />
                    {loc.bestTime}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Simulator: Monte sua Baixaria Acreana */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-900 to-emerald-950/40 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              <ChefHat className="w-3.5 h-3.5" />
              Interativo • Experiência Cultural
            </div>
            <h3 className="text-2xl font-extrabold text-white">
              Monte sua Autêntica Baixaria de Rio Branco
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 mt-1">
              Personalize o prato oficial do Mercado do Bosque do seu jeito e ganhe o seu certificado de viajante gastronômico!
            </p>
          </div>

          {baixariaFeita && (
            <button
              onClick={() => setBaixariaFeita(false)}
              className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold flex items-center gap-1.5 self-start transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Montar Outra
            </button>
          )}
        </div>

        {!baixariaFeita ? (
          <div className="space-y-5">
            {/* Base */}
            <div>
              <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block mb-2">
                1. Escolha a Base de Cuscuz
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  'Cuscuz de Milho Flocão Tradicional (Fofinho)',
                  'Cuscuz de Milho com Farinha de Cruzeiro do Sul',
                ].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setBaixariaBase(opt)}
                    className={`p-3 rounded-xl border text-xs text-left font-medium transition-all ${
                      baixariaBase === opt
                        ? 'bg-amber-600/30 border-amber-500 text-amber-200'
                        : 'bg-stone-800/60 border-stone-800 text-stone-400 hover:bg-stone-800'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Carne */}
            <div>
              <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block mb-2">
                2. A Carne do Recheio
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  'Carne Moída Refogada com Bastante Tempero',
                  'Carne de Sol Desfiada na Manteiga de Garrafa',
                ].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setBaixariaCarne(opt)}
                    className={`p-3 rounded-xl border text-xs text-left font-medium transition-all ${
                      baixariaCarne === opt
                        ? 'bg-amber-600/30 border-amber-500 text-amber-200'
                        : 'bg-stone-800/60 border-stone-800 text-stone-400 hover:bg-stone-800'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Ovos */}
            <div>
              <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block mb-2">
                3. O Ponto dos Ovos Caipiras
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  '2 Ovos Fritos com Gema Bem Mole (O Clássico!)',
                  '2 Ovos Fritos com Gema Firme',
                ].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setBaixariaOvos(opt)}
                    className={`p-3 rounded-xl border text-xs text-left font-medium transition-all ${
                      baixariaOvos === opt
                        ? 'bg-amber-600/30 border-amber-500 text-amber-200'
                        : 'bg-stone-800/60 border-stone-800 text-stone-400 hover:bg-stone-800'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Toppings Checkboxes */}
            <div className="flex flex-wrap gap-4 pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-300">
                <input
                  type="checkbox"
                  checked={baixariaCheiroVerde}
                  onChange={(e) => setBaixariaCheiroVerde(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 bg-stone-800 border-stone-700"
                />
                Cheiro-Verde Abundante (Coentro + Cebolinha)
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-300">
                <input
                  type="checkbox"
                  checked={baixariaPimenta}
                  onChange={(e) => setBaixariaPimenta(e.target.checked)}
                  className="rounded text-red-600 focus:ring-red-500 w-4 h-4 bg-stone-800 border-stone-700"
                />
                Gotas de Molho de Pimenta Murupi Acreana
              </label>
            </div>

            <button
              onClick={handlePrepararBaixaria}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-600 to-emerald-600 hover:from-amber-500 hover:to-emerald-500 text-white font-extrabold text-sm shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Servir Minha Baixaria no Mercado do Bosque!
            </button>
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-stone-800/80 border border-emerald-500/50 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-lg text-white">
                  Prato Pronto! Baixaria à Moda Rio Branco
                </h4>
                <p className="text-xs text-emerald-400 font-medium">
                  Certificado emitido: Você já sabe pedir como um verdadeiro acreano!
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-stone-900 border border-stone-700 space-y-1.5 text-xs text-stone-300">
              <p>🌾 <b>Base:</b> {baixariaBase}</p>
              <p>🥩 <b>Carne:</b> {baixariaCarne}</p>
              <p>🍳 <b>Ovos:</b> {baixariaOvos}</p>
              <p>🌿 <b>Cheiro-verde:</b> {baixariaCheiroVerde ? 'Sim, muito bem picadinho!' : 'Sem cheiro-verde'}</p>
              <p>🌶️ <b>Pimenta murupi:</b> {baixariaPimenta ? 'Sim, pimenta da terra' : 'Sem pimenta'}</p>
            </div>

            <p className="text-xs text-stone-400 italic">
              "Agora é só misturar a gema mole no cuscuz com carne e pedir um cafezinho com leite ou suco de cupuaçu!"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
