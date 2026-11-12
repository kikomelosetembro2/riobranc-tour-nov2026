import React, { useState, useEffect, useRef } from 'react';
import { RIO_BRANCO_SCHOOLS, School } from '../data/schoolsData';
import L from 'leaflet';
import {
  GraduationCap,
  MapPin,
  ExternalLink,
  Search,
  School as SchoolIcon,
  Navigation,
  Copy,
  Check,
  Building2,
  BookOpen,
  Map as MapIcon,
  List,
  Compass,
  Phone
} from 'lucide-react';

const REDE_COLORS: Record<string, { bg: string; text: string; border: string; pin: string }> = {
  Municipal: {
    bg: 'bg-emerald-100',
    text: 'text-emerald-800',
    border: 'border-emerald-300',
    pin: '#10b981',
  },
  Estadual: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-300',
    pin: '#3b82f6',
  },
  Federal: {
    bg: 'bg-purple-100',
    text: 'text-purple-800',
    border: 'border-purple-300',
    pin: '#a855f7',
  },
  Privada: {
    bg: 'bg-amber-100',
    text: 'text-amber-800',
    border: 'border-amber-300',
    pin: '#f59e0b',
  },
};

export const SchoolsView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRede, setSelectedRede] = useState<string>('Todas');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  const filteredSchools = RIO_BRANCO_SCHOOLS.filter((school) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      school.nome.toLowerCase().includes(term) ||
      school.endereco.toLowerCase().includes(term) ||
      (school.bairro && school.bairro.toLowerCase().includes(term));
    const matchesRede = selectedRede === 'Todas' || school.rede === selectedRede;
    return matchesSearch && matchesRede;
  });

  const handleCopyAddress = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Leaflet map setup for schools
  useEffect(() => {
    if (viewMode !== 'map' || !mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [-9.965, -67.82],
        zoom: 13,
        zoomControl: false,
      });

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors | Rio Branco - Acre',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear old markers
    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    filteredSchools.forEach((school) => {
      const color = REDE_COLORS[school.rede]?.pin || '#10b981';

      const customIcon = L.divIcon({
        className: 'custom-school-pin',
        html: `
          <div style="
            background-color: ${color};
            width: 32px;
            height: 32px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            border: 2px solid #ffffff;
            cursor: pointer;
          ">
            <span style="transform: rotate(45deg); color: white; font-size: 14px; font-weight: bold;">
              🎓
            </span>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -30],
      });

      const popupContent = `
        <div style="color: #1c1917; font-family: sans-serif; min-width: 200px; padding: 4px;">
          <b style="font-size: 13px; color: #047857;">${school.nome}</b><br/>
          <span style="font-size: 11px; background: #e0f2fe; color: #0369a1; padding: 2px 6px; border-radius: 4px; font-weight: bold; margin-top: 4px; display: inline-block;">Rede ${school.rede}</span><br/>
          <span style="font-size: 11px; color: #57534e; display: block; margin: 4px 0;">${school.endereco}</span>
          <a href="${school.maps_url}" target="_blank" rel="noopener noreferrer" style="display: inline-block; margin-top: 6px; padding: 4px 8px; background: #059669; color: white; text-decoration: none; border-radius: 6px; font-size: 11px; font-weight: bold;">Abrir no Google Maps ↗</a>
        </div>
      `;

      const marker = L.marker([school.lat, school.lng], { icon: customIcon })
        .addTo(map)
        .bindPopup(popupContent);

      markersRef.current[school.id] = marker;
    });

    if (filteredSchools.length > 0) {
      const group = L.featureGroup(Object.values(markersRef.current));
      map.fitBounds(group.getBounds().pad(0.15));
    }
  }, [viewMode, filteredSchools]);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-800 via-teal-700 to-blue-800 border border-emerald-900/10 p-6 sm:p-8 shadow-lg text-white">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
            <GraduationCap className="w-3.5 h-3.5" />
            Educação em Rio Branco • Acre
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Escolas Municipais & Instituições de Ensino
          </h2>
          <p className="text-xs sm:text-sm text-emerald-50 leading-relaxed">
            Consulte a localização de escolas municipais, estaduais, federais e privadas de Rio Branco com rotas diretas para o Google Maps, endereços completos e dados pedagógicos.
          </p>
        </div>

        {/* Counter Stats Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-5">
          <div className="p-3 rounded-2xl bg-white/15 border border-white/20 backdrop-blur-xs">
            <span className="text-[10px] uppercase font-bold text-white/80">Total Catalogadas</span>
            <p className="text-lg font-black text-white">{RIO_BRANCO_SCHOOLS.length}</p>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-300/30 backdrop-blur-xs">
            <span className="text-[10px] uppercase font-bold text-emerald-200">Municipais</span>
            <p className="text-lg font-black text-white">
              {RIO_BRANCO_SCHOOLS.filter((s) => s.rede === 'Municipal').length}
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-blue-500/20 border border-blue-300/30 backdrop-blur-xs">
            <span className="text-[10px] uppercase font-bold text-blue-200">Estaduais</span>
            <p className="text-lg font-black text-white">
              {RIO_BRANCO_SCHOOLS.filter((s) => s.rede === 'Estadual').length}
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-purple-500/20 border border-purple-300/30 backdrop-blur-xs">
            <span className="text-[10px] uppercase font-bold text-purple-200">Federais</span>
            <p className="text-lg font-black text-white">
              {RIO_BRANCO_SCHOOLS.filter((s) => s.rede === 'Federal').length}
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-amber-500/20 border border-amber-300/30 backdrop-blur-xs">
            <span className="text-[10px] uppercase font-bold text-amber-200">Privadas</span>
            <p className="text-lg font-black text-white">
              {RIO_BRANCO_SCHOOLS.filter((s) => s.rede === 'Privada').length}
            </p>
          </div>
        </div>
      </div>

      {/* Search, Filter & View Mode Controls */}
      <div className="bg-white border border-stone-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nome da escola, bairro ou endereço..."
              className="w-full bg-stone-50 border border-stone-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          {/* View mode toggle */}
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-2xl border border-stone-200 self-end sm:self-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'grid'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              Lista
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'map'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              Mapa Interativo
            </button>
          </div>
        </div>

        {/* Network filter pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pt-1">
          {['Todas', 'Municipal', 'Estadual', 'Federal', 'Privada'].map((rede) => (
            <button
              key={rede}
              onClick={() => setSelectedRede(rede)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedRede === rede
                  ? 'bg-emerald-600 text-white shadow-xs scale-[1.02]'
                  : 'bg-stone-100 text-stone-700 hover:text-stone-900 hover:bg-stone-200'
              }`}
            >
              {rede === 'Todas' ? 'Todas as Redes' : `Rede ${rede}`}
            </button>
          ))}
        </div>
      </div>

      {/* Map View Mode */}
      {viewMode === 'map' && (
        <div className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-xs">
          <div className="p-3 bg-stone-50 border-b border-stone-200 flex items-center justify-between text-xs text-stone-600">
            <span>Clique nos marcadores para abrir no Google Maps</span>
            <span className="font-bold text-emerald-700">
              {filteredSchools.length} escolas no mapa
            </span>
          </div>
          <div ref={mapContainerRef} className="w-full h-[520px] z-0" />
        </div>
      )}

      {/* Grid View Mode */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSchools.map((school) => {
            const colors = REDE_COLORS[school.rede] || REDE_COLORS.Municipal;
            const isCopied = copiedId === school.id;

            return (
              <div
                key={school.id}
                className="bg-white border border-stone-200 hover:border-emerald-300 rounded-3xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  {/* Top Bar with Network Tag */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border ${colors.bg} ${colors.text} ${colors.border}`}
                    >
                      Rede {school.rede}
                    </span>

                    {school.bairro && (
                      <span className="text-[11px] text-stone-500 font-semibold flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-stone-400" />
                        {school.bairro}
                      </span>
                    )}
                  </div>

                  {/* School Name */}
                  <h3 className="text-lg font-black text-stone-900 group-hover:text-emerald-700 transition-colors">
                    {school.nome}
                  </h3>

                  {/* Address */}
                  <div className="flex items-start gap-2 text-xs text-stone-700 leading-relaxed bg-stone-50 p-3 rounded-2xl border border-stone-200">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="flex-1">{school.endereco}</span>
                    <button
                      onClick={() => handleCopyAddress(school.id, school.endereco)}
                      className="text-stone-400 hover:text-stone-700 p-1 rounded-lg hover:bg-stone-200/60 transition-colors shrink-0"
                      title="Copiar endereço"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Etapas / Nível de ensino */}
                  {school.etapas && (
                    <div className="flex items-center gap-2 text-xs text-stone-600">
                      <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                      <span>{school.etapas}</span>
                    </div>
                  )}

                  {/* Destaques */}
                  {school.destaques && school.destaques.length > 0 && (
                    <ul className="space-y-1 text-[11px] text-stone-600 pt-1">
                      {school.destaques.map((d, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Actions: Google Maps URL button */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${school.lat},${school.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-900 text-xs font-semibold flex items-center gap-1.5 transition-all"
                    title="Obter rotas de trajeto até a escola"
                  >
                    <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Como Chegar</span>
                  </a>

                  <a
                    href={school.maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2"
                  >
                    <span>Abrir no Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Info Notice about Municipal Network */}
      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-stone-700 text-xs flex items-start gap-3">
        <SchoolIcon className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-stone-900">
            Sobre a Rede Municipal e Escolas de Rio Branco
          </p>
          <p className="leading-relaxed">
            A Secretaria Municipal de Educação de Rio Branco (SEME) administra unidades de educação infantil e ensino fundamental nos distritos da capital. Para matrículas e transporte escolar municipal, consulte o portal oficial da Prefeitura de Rio Branco.
          </p>
        </div>
      </div>
    </div>
  );
};
