import React, { useState } from 'react';
import { usePWAInstall, useOnlineStatus } from '../hooks/usePWA';
import { Download, Smartphone, X, WifiOff, Check } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const isOnline = useOnlineStatus();

  return (
    <>
      {/* Offline Toast Banner */}
      {!isOnline && (
        <div className="fixed bottom-16 lg:bottom-4 left-4 z-50 flex items-center gap-2 rounded-2xl bg-amber-600/95 backdrop-blur-md px-3.5 py-2 text-xs font-semibold text-white shadow-2xl border border-amber-400/40 animate-pulse">
          <WifiOff className="w-4 h-4 shrink-0" />
          <span>Modo Offline: Usando dados e fotos armazenados pelo Workbox.</span>
        </div>
      )}

      {/* If installed already, don't show install button */}
      {!isInstalled && isInstallable && (
        <button
          onClick={install}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg transition-all"
          title="Instalar Rio Branco-TourApk"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Instalar Apk</span>
        </button>
      )}

      {/* iOS Safari Guide */}
      {!isInstalled && !isInstallable && isIOS && (
        <>
          <button
            onClick={() => setShowIOSGuide(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 font-bold text-xs transition-all"
            title="Instalar no iPhone / iPad"
          >
            <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Instalar no iOS</span>
          </button>

          {showIOSGuide && (
            <div className="fixed inset-0 z-[4000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
              <div className="w-full max-w-sm rounded-3xl bg-stone-900 border border-stone-800 p-6 shadow-2xl text-stone-100 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                  <h3 className="font-extrabold text-base flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-emerald-400" />
                    Instalar Rio Branco-TourApk no iOS
                  </h3>
                  <button
                    onClick={() => setShowIOSGuide(false)}
                    className="p-1 text-stone-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <ol className="space-y-3 text-xs text-stone-300">
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
                      1
                    </span>
                    <span>No navegador Safari do iPhone, toque no botão <b>Compartilhar</b> (ícone do quadrado com a seta para cima).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
                      2
                    </span>
                    <span>Role a tela para baixo e selecione <b>"Adicionar à Tela de Início"</b>.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
                      3
                    </span>
                    <span>Toque em <b>Adicionar</b> no canto superior. Pronto! O TourApk funcionará como aplicativo nativo mesmo offline.</span>
                  </li>
                </ol>

                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                >
                  Entendi
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};
