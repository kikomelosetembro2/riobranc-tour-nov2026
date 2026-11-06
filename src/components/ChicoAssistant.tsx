import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Compass, 
  HelpCircle,
  MapPin,
  Coffee,
  Trees
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  { icon: '☕', text: 'Onde comer a melhor Baixaria de Rio Branco?' },
  { icon: '🍲', text: 'Como chegar ao Bairro da Base tomar Tacacá?' },
  { icon: '🗺️', text: 'Roteiro perfeito de 1 dia na capital do Acre' },
  { icon: '🌿', text: 'História de Chico Mendes e os seringais' },
  { icon: '☀️', text: 'Melhor época do ano para visitar o Acre (chuvas vs seca)' },
  { icon: '🗿', text: 'O que são e onde ficam os Geoglifos do Acre?' },
];

export const ChicoAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Olá, parente! Sou o Chico Tour, seu guia virtual e companheiro pelo Rio Branco-TourApk. 🌳🌿 Conheço cada canto da nossa amada capital acreana: das manhãs no Mercado do Bosque com Baixaria bem temperada ao pôr do sol mágico na Gameleira e o tacacá fervente no Bairro da Base! O que você gostaria de explorar hoje em Rio Branco?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputValue;
    if (!query.trim() || loading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setLoading(true);

    try {
      const response = await fetch('/api/tour-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });

      if (!response.ok) {
        throw new Error('Falha na resposta do servidor.');
      }

      const data = await response.json();
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'Desculpe, tive um contratempo amazônico na conexão. Mas posso te dizer: visite a Gameleira e o Mercado Velho!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error('Erro no assistente:', err);
      const fallbackMsg: Message = {
        id: `bot-fallback-${Date.now()}`,
        sender: 'assistant',
        text: 'Parente, parece que a internet deu uma vacilada rápida na mata, mas aqui vai a dica de ouro: se estiver de manhã em Rio Branco, vá direto ao Mercado do Bosque pedir uma Baixaria caprichada. À tarde, nada supera o entardecer no Calçadão da Gameleira e o tacacá no Bairro da Base!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleSpeak = (msgId: string, text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 1.0;
      utterance.onend = () => setSpeakingId(null);
      utterance.onerror = () => setSpeakingId(null);
      window.speechSynthesis.speak(utterance);
      setSpeakingId(msgId);
    }
  };

  const handleResetChat = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingId(null);
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'assistant',
        text: 'Memória renovada, parente! Em que posso te ajudar sobre os pontos turísticos, rotas e sabores de Rio Branco hoje?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-4xl mx-auto bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="px-5 py-3.5 bg-gradient-to-r from-emerald-950 via-stone-900 to-stone-900 border-b border-stone-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-stone-100 flex items-center gap-1.5">
              Chico Tour • Guia IA
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            </h3>
            <p className="text-[11px] text-stone-400">
              Especialista nativo em Rio Branco e tradições do Acre
            </p>
          </div>
        </div>

        <button
          onClick={handleResetChat}
          className="p-2 rounded-xl bg-stone-800/80 hover:bg-stone-800 text-stone-400 hover:text-stone-200 text-xs flex items-center gap-1 transition-all border border-stone-700"
          title="Reiniciar Conversa"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reiniciar</span>
        </button>
      </div>

      {/* Quick Prompts Bar */}
      <div className="px-4 py-2.5 bg-stone-950/60 border-b border-stone-800 overflow-x-auto scrollbar-none flex gap-2">
        {QUICK_PROMPTS.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(p.text)}
            disabled={loading}
            className="px-3 py-1.5 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-medium whitespace-nowrap transition-all border border-stone-700/60 flex items-center gap-1.5 shrink-0"
          >
            <span>{p.icon}</span>
            <span>{p.text}</span>
          </button>
        ))}
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 scrollbar-thin scrollbar-thumb-stone-800">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                  isUser
                    ? 'bg-amber-600 text-white'
                    : 'bg-emerald-700 text-white shadow-md shadow-emerald-950'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-[85%] sm:max-w-[75%] space-y-1.5`}>
                <div
                  className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-line shadow-md ${
                    isUser
                      ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white rounded-tr-none'
                      : 'bg-stone-800/90 border border-stone-700/80 text-stone-200 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>

                <div
                  className={`flex items-center gap-2 text-[10px] text-stone-500 px-1 ${
                    isUser ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {!isUser && (
                    <button
                      onClick={() => handleSpeak(msg.id, msg.text)}
                      className="text-stone-400 hover:text-emerald-400 flex items-center gap-1 transition-colors"
                      title="Ouvir em áudio"
                    >
                      {speakingId === msg.id ? (
                        <VolumeX className="w-3.5 h-3.5 text-red-400" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-2xl rounded-tl-none bg-stone-800/80 border border-stone-700 flex items-center gap-2 text-stone-400 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]" />
              <span className="ml-1">Chico Tour está consultando os caminhos de Rio Branco...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="p-3 sm:p-4 bg-stone-950/80 border-t border-stone-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 bg-stone-900 border border-stone-700/80 rounded-2xl p-1.5 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Pergunte sobre pontos turísticos, comidas, história ou dicas de Rio Branco..."
            className="flex-1 bg-transparent px-3 py-2 text-sm text-stone-100 placeholder-stone-500 focus:outline-none"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || loading}
            className="w-10 h-10 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white flex items-center justify-center shadow-lg transition-all shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <p className="text-[10px] text-center text-stone-500 mt-2">
          Rio Branco-TourApk Inteligência Turística • Informações históricas e culturais de Rio Branco, Acre
        </p>
      </div>
    </div>
  );
};
