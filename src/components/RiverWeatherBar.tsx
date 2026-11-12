import React, { useState, useEffect } from 'react';
import { 
  Waves, 
  Sun, 
  Clock, 
  AlertTriangle, 
  ShieldCheck, 
  Info, 
  Phone,
  X,
  Droplets,
  Sparkles,
  Thermometer,
  Trees
} from 'lucide-react';
import { USEFUL_CONTACTS } from '../data/rioBrancoData';

interface RiverWeatherBarProps {
  onOpenTips?: () => void;
}

export const RiverWeatherBar: React.FC<RiverWeatherBarProps> = ({ onOpenTips }) => {
  const [acreTime, setAcreTime] = useState<string>('');
  const [showRiverModal, setShowRiverModal] = useState(false);
  const [showContactsModal, setShowContactsModal] = useState(false);
  const [showWeatherAdviceModal, setShowWeatherAdviceModal] = useState(false);

  // Weather data
  const currentTemp = 29;
  const feelsLike = 33;
  const weatherCondition = 'Sol com nuvens amazônicas';

  // Dynamic climate advice logic based on temperature
  let weatherAdvice = 'Clima agradável para explorar Rio Branco!';
  let weatherAdviceShort = 'Hidrate-se com água de coco!';
  let adviceColor = 'text-amber-800 bg-amber-100 border-amber-300 hover:bg-amber-200';

  if (currentTemp >= 30 || feelsLike >= 33) {
    weatherAdviceShort = 'Está quente, hidrate-se bastante!';
    weatherAdvice = 'Está bastante quente em Rio Branco (sensação térmica de 33°C)! Beba bastante água, aproveite a água de coco fresca na Praça Povos da Floresta ou um suco gelado de cupuaçu.';
    adviceColor = 'text-amber-800 bg-amber-100 border-amber-300 hover:bg-amber-200';
  } else if (currentTemp <= 23) {
    weatherAdviceShort = 'Friagem amazônica: clima fresquinho!';
    weatherAdvice = 'Temperatura amena! Ideal para caminhar no Calçadão da Gameleira e tomar um tacacá bem quentinho no Bairro da Base.';
    adviceColor = 'text-blue-800 bg-blue-100 border-blue-300 hover:bg-blue-200';
  } else {
    weatherAdviceShort = 'Brisa boa: ótimo para passear!';
    weatherAdvice = 'Dia perfeito para pedalar no Parque da Maternidade ou visitar o Palácio Rio Branco e o Mercado Velho.';
    adviceColor = 'text-emerald-800 bg-emerald-100 border-emerald-300 hover:bg-emerald-200';
  }

  useEffect(() => {
    const updateClock = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('pt-BR', {
          timeZone: 'America/Rio_Branco',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
        setAcreTime(formatter.format(now));
      } catch (e) {
        // Fallback offset UTC-5
        const d = new Date();
        const utc = d.getTime() + d.getTimezoneOffset() * 60000;
        const acreDate = new Date(utc - 3600000 * 5);
        setAcreTime(acreDate.toLocaleTimeString());
      }
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="bg-stone-100 border-b border-stone-200 text-stone-700 text-[11px] px-3 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-2 shadow-xs">
        {/* Acre Time & Weather */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Acre Emblem Circle Thumbnail */}
          <img
            src="/assets/aistudio/51977699-bandeira-do-acre-estado-do-brasil-bandeira-oficial-faz-acre-circulo-bandeira-cracha-vetor_c775a930.jpg"
            alt="Bandeira do Acre"
            className="w-5 h-5 rounded-full border border-stone-300 shadow-xs object-cover"
          />

          <div className="flex items-center gap-1.5 text-stone-800 font-medium">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span className="font-mono font-bold text-amber-700">{acreTime || 'Carregando...'}</span>
            <span className="text-[10px] text-stone-500 hidden md:inline">(UTC-5 • Acre)</span>
          </div>

          <div className="h-3 w-px bg-stone-300 hidden sm:block" />

          {/* Temperature */}
          <div className="flex items-center gap-1.5 text-stone-800">
            <Sun className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-bold">{currentTemp}°C</span>
            <span className="text-stone-500 hidden xs:inline">({weatherCondition})</span>
          </div>

          {/* Interactive Temperature Tip Badge */}
          <button
            onClick={() => setShowWeatherAdviceModal(true)}
            className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[10px] font-bold transition-all cursor-pointer ${adviceColor}`}
            title="Clique para ver recomendações do clima"
          >
            <Droplets className="w-3 h-3 text-amber-600" />
            <span>{weatherAdviceShort}</span>
            <Sparkles className="w-2.5 h-2.5 opacity-80" />
          </button>
        </div>

        {/* Rio Acre Monitor & Emergency quick links */}
        <div className="flex items-center gap-2">
          {/* Rio Acre Badge */}
          <button
            onClick={() => setShowRiverModal(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 transition-colors cursor-pointer"
            title="Ver telemetria do Rio Acre"
          >
            <Waves className="w-3 h-3 text-emerald-600" />
            <span className="font-bold">Rio Acre: 8,42m</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </button>

          {/* SOS Help */}
          <button
            onClick={() => setShowContactsModal(true)}
            className="p-1.5 rounded-full text-stone-500 hover:text-red-600 transition-colors hover:bg-stone-200/60"
            title="Telefones de Emergência em Rio Branco"
          >
            <Phone className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Weather Advice Modal */}
      {showWeatherAdviceModal && (
        <div className="fixed inset-0 z-[3500] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white border border-stone-200 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl text-stone-900">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-amber-500" />
                <h3 className="font-extrabold text-base text-stone-900">Dica do Clima Amazônico</h3>
              </div>
              <button
                onClick={() => setShowWeatherAdviceModal(false)}
                className="text-stone-400 hover:text-stone-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-600">Temperatura Atual</span>
                <span className="text-xl font-extrabold text-amber-800 font-mono">
                  {currentTemp}°C <span className="text-xs text-stone-500">(Sensação {feelsLike}°C)</span>
                </span>
              </div>
              <p className="text-xs text-amber-900 font-medium leading-relaxed">
                {weatherAdvice}
              </p>
            </div>

            <div className="space-y-2 text-xs text-stone-700">
              <p className="font-bold text-stone-900">Recomendações para o seu dia em Rio Branco:</p>
              <ul className="space-y-1.5 text-stone-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  Prefira caminhadas ao ar livre antes das 09h30 ou após as 16h30.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  Mantenha água potável ou água de coco em garrafinha térmica.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  No calor do meio-dia, visite museus climatizados (Museu da Borracha, Palácio Rio Branco).
                </li>
              </ul>
            </div>

            <button
              onClick={() => {
                setShowWeatherAdviceModal(false);
                if (onOpenTips) onOpenTips();
              }}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all"
            >
              Ver Todas as Dicas de Viagem
            </button>
          </div>
        </div>
      )}

      {/* Rio Acre Details Modal */}
      {showRiverModal && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white border border-stone-200 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl text-stone-900">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <Waves className="w-5 h-5 text-emerald-600" />
                <h3 className="font-extrabold text-base text-stone-900">Monitor do Rio Acre</h3>
              </div>
              <button
                onClick={() => setShowRiverModal(false)}
                className="text-stone-400 hover:text-stone-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-600">Nível Atual Medido</span>
                <span className="text-xl font-extrabold text-emerald-800 font-mono">8,42 metros</span>
              </div>
              <p className="text-xs text-emerald-900 font-medium">
                ✓ Situação Segura e Normal para Navegação e Turismo
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-stone-500 block text-[10px]">Cota de Alerta</span>
                <span className="font-extrabold text-amber-700 text-sm font-mono">13,50 metros</span>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-stone-500 block text-[10px]">Cota de Transbordo</span>
                <span className="font-extrabold text-red-600 text-sm font-mono">14,00 metros</span>
              </div>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              O Rio Acre é o coração pulsante da capital, nascendo nas cabeceiras entre o Peru e o Acre e serpenteando sob a Gameleira e a Passarela Joaquim Macedo.
            </p>

            <button
              onClick={() => setShowRiverModal(false)}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* Quick Emergency Contacts Modal */}
      {showContactsModal && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white border border-stone-200 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl text-stone-900">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-red-600" />
                <h3 className="font-extrabold text-base text-stone-900">Telefones Rápidos de Apoio</h3>
              </div>
              <button
                onClick={() => setShowContactsModal(false)}
                className="text-stone-400 hover:text-stone-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto scrollbar-thin">
              {USEFUL_CONTACTS.map((c, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between"
                >
                  <div>
                    <p className="font-bold text-xs text-stone-900">{c.name}</p>
                    <p className="text-[10px] text-stone-500">{c.desc}</p>
                  </div>
                  <a
                    href={`tel:${c.number.replace(/\D/g, '')}`}
                    className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white font-mono text-xs font-bold shadow-xs transition-colors"
                  >
                    {c.number}
                  </a>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowContactsModal(false)}
              className="w-full py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
};
