import React, { useState } from 'react';
import { 
  Lightbulb, 
  Sun, 
  CloudRain, 
  Clock, 
  MapPin, 
  Umbrella, 
  Sparkles, 
  Compass, 
  ChevronRight,
  ShieldAlert,
  Droplets
} from 'lucide-react';

interface TravelTip {
  id: string;
  title: string;
  location: string;
  category: 'clima' | 'horario' | 'chuva' | 'gastronomia' | 'seguranca';
  situation: string;
  recommendation: string;
  whatToBring: string[];
  spotId?: string;
}

const DYNAMIC_TIPS: TravelTip[] = [
  {
    id: 'parque-maternidade-horario',
    title: 'Melhor Época & Horário: Parque da Maternidade',
    location: 'Parque da Maternidade (Centro / Bosque)',
    category: 'horario',
    situation: 'Entardecer fresco e lazer ao ar livre',
    recommendation: 'O melhor horário é entre as 16h30 e 18h30. O sol intenso baixa, a brisa amazônica corre ao longo dos 6km de ciclovia arborizada e os quiosques de água de coco na Praça Povos da Floresta estão no auge da vibração!',
    whatToBring: ['Tênis confortável', 'Garrafinha de água', 'Protetor solar leve'],
    spotId: 'parque-maternidade',
  },
  {
    id: 'chuva-amazonica',
    title: 'O Que Fazer e Levar em Dias de Chuva Amazônica',
    location: 'Rio Branco (Geral / Centro Histórico)',
    category: 'chuva',
    situation: 'Pancadas rápidas e intensas do inverno amazônico',
    recommendation: 'As chuvas em Rio Branco costumam ser passageiras e trazem um frescor bem-vindo à terra vermelha. Aproveite para visitar atrações cobertas como o Museu da Borracha e o Palácio Rio Branco, ou faça uma pausa para um café com tapioca no Mercado Velho.',
    whatToBring: ['Sombrinha dobrável ou capa leve', 'Bolsa impermeável para celular/documentos', 'Calçado com boa aderência para calçadas úmidas'],
    spotId: 'museu-da-borracha',
  },
  {
    id: 'gameleira-por-do-sol',
    title: 'Hora Mágica: Pôr do Sol na Gameleira',
    location: 'Calçadão da Gameleira (Segundo Distrito)',
    category: 'horario',
    situation: 'Final de tarde às margens do Rio Acre',
    recommendation: 'Chegue por volta das 17h10. Atravesse a Passarela Joaquim Macedo a pé contemplando a correnteza do Rio Acre e posicione-se sob a copa da gameleira centenária. O céu ganha tonalidades violetas e alaranjadas espetaculares.',
    whatToBring: ['Câmera ou smartphone com bateria', 'Óculos escuros', 'Disposição para provar kibe de macaxeira'],
    spotId: 'gameleira',
  },
  {
    id: 'mercado-bosque-baixaria',
    title: 'Tradição Matinal: O Segredo da Baixaria',
    location: 'Mercado do Bosque',
    category: 'gastronomia',
    situation: 'Café da manhã dos fortes',
    recommendation: 'Chegue cedo, preferencialmente entre 06h00 e 08h30. É quando a carne moída refogada sai fumegante da panela e os ovos caipiras são fritos na hora com a gema bem mole. Misture a gema no cuscuz antes de saborear!',
    whatToBring: ['Apetite farto', 'Dinheiro trocado ou Pix'],
    spotId: 'mercado-do-bosque',
  },
  {
    id: 'parque-chico-mendes-manha',
    title: 'Trilha do Seringueiro: Parque Chico Mendes',
    location: 'Parque Ambiental Chico Mendes (Rodovia AC-40)',
    category: 'clima',
    situation: 'Contato imersivo com a floresta primária',
    recommendation: 'Prefira o turno da manhã (entre 08h e 10h30), quando a floresta está fresca e as araras e macacos resgatados estão mais ativos. A caminhada na mata virgem com demonstração de sangria de seringueira é imperdível.',
    whatToBring: ['Repelente de insetos', 'Tênis fechado', 'Roupas leves de manga comprida'],
    spotId: 'parque-chico-mendes',
  },
  {
    id: 'sol-amazonia-hidratacao',
    title: 'Calor e Sol Amazônico: Dicas de Proteção',
    location: 'Primeiro e Segundo Distrito',
    category: 'seguranca',
    situation: 'Índice UV muito alto entre 11h e 14h',
    recommendation: 'O sol de Rio Branco é intenso e a umidade alta eleva a sensação térmica. Evite longas caminhadas descobertas ao meio-dia. Pare nos quiosques locais para tomar suco natural de cupuaçu, graviola ou água de coco bem gelada.',
    whatToBring: ['Protetor solar FPS 50+', 'Boné ou chapéu regional', 'Hidratação constante'],
  },
];

interface DynamicTravelTipsProps {
  onOpenSpot?: (spotId: string) => void;
  currentTemp?: number;
}

export const DynamicTravelTips: React.FC<DynamicTravelTipsProps> = ({
  onOpenSpot,
  currentTemp = 29,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('todos');
  const [activeTip, setActiveTip] = useState<TravelTip>(DYNAMIC_TIPS[0]);

  const filteredTips = DYNAMIC_TIPS.filter((tip) => {
    if (selectedFilter === 'todos') return true;
    return tip.category === selectedFilter;
  });

  return (
    <div className="space-y-4 bg-white border border-stone-200 rounded-3xl p-5 sm:p-7 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase tracking-wider mb-1.5 border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5" />
            Dicas de Viagem Dinâmicas • Rio Branco
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
            Conselhos do Guia Local
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
            Orientações inteligentes baseadas na hora do dia, clima amazônico e particularidades de cada ponto de Rio Branco.
          </p>
        </div>

        {/* Real-time weather smart pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold self-start sm:self-auto">
          <Sun className="w-4 h-4 text-amber-600" />
          <span>Clima Hoje: {currentTemp}°C • Chuvas passageiras</span>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
        {[
          { id: 'todos', label: 'Todas as Dicas' },
          { id: 'horario', label: '⏰ Melhores Horários' },
          { id: 'chuva', label: '🌧️ Dias de Chuva' },
          { id: 'clima', label: '🌿 Na Floresta' },
          { id: 'gastronomia', label: '🥘 Rota dos Sabores' },
          { id: 'seguranca', label: '☀️ Proteção & Sol' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => {
              setSelectedFilter(f.id);
              const found = DYNAMIC_TIPS.find((t) => f.id === 'todos' || t.category === f.id);
              if (found) setActiveTip(found);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedFilter === f.id
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:text-stone-900 hover:bg-stone-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Tips Interactive Grid & Spotlight */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-1">
        {/* Left List of Tips */}
        <div className="lg:col-span-5 space-y-2 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-stone-200">
          {filteredTips.map((tip) => {
            const isSelected = activeTip.id === tip.id;
            return (
              <button
                key={tip.id}
                onClick={() => setActiveTip(tip)}
                className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-start justify-between gap-2 ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-400 text-stone-900 shadow-xs'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                    <MapPin className="w-3 h-3" />
                    <span>{tip.location}</span>
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm leading-snug text-stone-900">{tip.title}</h4>
                  <p className="text-[11px] text-stone-500 line-clamp-1">{tip.situation}</p>
                </div>
                <ChevronRight className={`w-4 h-4 shrink-0 mt-1 transition-transform ${isSelected ? 'text-emerald-700 translate-x-1' : 'text-stone-400'}`} />
              </button>
            );
          })}
        </div>

        {/* Right Active Tip Deep Dive Card */}
        <div className="lg:col-span-7 bg-stone-50 border border-stone-200 rounded-2xl p-5 sm:p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
                {activeTip.location}
              </span>
              <span className="text-xs text-stone-500 italic">
                {activeTip.situation}
              </span>
            </div>

            <h4 className="text-lg sm:text-xl font-black text-stone-900 leading-tight">
              {activeTip.title}
            </h4>

            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              {activeTip.recommendation}
            </p>

            {/* What to Bring checklist */}
            <div className="p-3.5 rounded-xl bg-white border border-stone-200 space-y-2">
              <p className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                O que levar no seu bolso ou mochila:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {activeTip.whatToBring.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-stone-100 text-[11px] text-stone-700 border border-stone-200 font-medium"
                  >
                    ✓ {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action button to open location if available */}
          {activeTip.spotId && onOpenSpot && (
            <div className="pt-2 border-t border-stone-200 flex items-center justify-end">
              <button
                onClick={() => onOpenSpot(activeTip.spotId!)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5"
              >
                <span>Ver Ponto Turístico & Áudio</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
