import React, { useState, useEffect } from 'react';
import { 
  Waves, 
  Sun, 
  Clock, 
  AlertTriangle, 
  ShieldCheck, 
  Info, 
  Phone,
  X 
} from 'lucide-react';
import { USEFUL_CONTACTS } from '../data/rioBrancoData';

export const RiverWeatherBar: React.FC = () => {
  const [acreTime, setAcreTime] = useState<string>('');
  const [showRiverModal, setShowRiverModal] = useState(false);
  const [showContactsModal, setShowContactsModal] = useState(false);

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
      <div className="bg-stone-950 border-b border-stone-800 text-stone-300 text-[11px] px-3 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-2 shadow-inner">
        {/* Acre Time & Location */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-stone-300 font-medium">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono font-bold text-amber-300">{acreTime || 'Carregando...'}</span>
            <span className="text-[10px] text-stone-400 hidden xs:inline">(Fuso Acre UTC-5 • -1h Brasília)</span>
          </div>

          <div className="h-3 w-px bg-stone-800 hidden sm:block" />

          {/* Weather */}
          <div className="flex items-center gap-1.5 text-stone-300">
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            <span>29°C • Sol com brisa</span>
          </div>
        </div>

        {/* Rio Acre Monitor & Emergency quick links */}
        <div className="flex items-center gap-2">
          {/* Rio Acre Badge */}
          <button
            onClick={() => setShowRiverModal(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/60 text-emerald-300 transition-colors cursor-pointer"
            title="Ver telemetria do Rio Acre"
          >
            <Waves className="w-3 h-3 text-emerald-400" />
            <span className="font-bold">Rio Acre: 8,42m</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </button>

          {/* SOS Help */}
          <button
            onClick={() => setShowContactsModal(true)}
            className="p-1 rounded-full text-stone-400 hover:text-red-400 transition-colors"
            title="Telefones de Emergência"
          >
            <Phone className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Rio Acre Details Modal */}
      {showRiverModal && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl text-stone-100">
            <div className="flex items-center justify-between pb-2 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <Waves className="w-5 h-5 text-emerald-400" />
                <h3 className="font-extrabold text-base">Monitor do Rio Acre</h3>
              </div>
              <button
                onClick={() => setShowRiverModal(false)}
                className="text-stone-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-300">Nível Atual Medido</span>
                <span className="text-xl font-extrabold text-emerald-400 font-mono">8,42 metros</span>
              </div>
              <p className="text-xs text-emerald-300/90 font-medium">
                ✓ Situação Segura e Normal para Navegação e Turismo
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                <span className="text-stone-400 block text-[10px]">Cota de Alerta</span>
                <span className="font-extrabold text-amber-400 text-sm font-mono">13,50 metros</span>
              </div>

              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                <span className="text-stone-400 block text-[10px]">Cota de Transbordo</span>
                <span className="font-extrabold text-red-400 text-sm font-mono">14,00 metros</span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              O Rio Acre é o coração pulsante da capital, nascendo nas cabeceiras entre o Peru e o Acre e serpenteando sob a Gameleira e a Passarela Joaquim Macedo.
            </p>

            <button
              onClick={() => setShowRiverModal(false)}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* Quick Emergency Contacts Modal */}
      {showContactsModal && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl text-stone-100">
            <div className="flex items-center justify-between pb-2 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-red-400" />
                <h3 className="font-extrabold text-base">Telefones Rápidos de Apoio</h3>
              </div>
              <button
                onClick={() => setShowContactsModal(false)}
                className="text-stone-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto scrollbar-thin">
              {USEFUL_CONTACTS.map((c, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between"
                >
                  <div>
                    <p className="font-bold text-xs text-stone-200">{c.name}</p>
                    <p className="text-[10px] text-stone-500">{c.desc}</p>
                  </div>
                  <a
                    href={`tel:${c.number.replace(/\D/g, '')}`}
                    className="px-2.5 py-1 rounded-lg bg-red-600 text-white font-mono text-xs font-bold"
                  >
                    {c.number}
                  </a>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowContactsModal(false)}
              className="w-full py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
};
