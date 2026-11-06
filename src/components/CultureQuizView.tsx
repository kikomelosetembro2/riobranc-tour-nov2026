import React, { useState, useRef } from 'react';
import { 
  ACRE_SLANGS, 
  AcreSlang, 
  ACRE_QUIZ, 
  QuizQuestion,
  USEFUL_CONTACTS 
} from '../data/rioBrancoData';
import { 
  BookOpen, 
  HelpCircle, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Award, 
  RotateCcw, 
  Phone, 
  Search, 
  Play, 
  Pause,
  Trees,
  CheckCircle,
  XCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CultureQuizView: React.FC = () => {
  // Tabs: 'dicionario' | 'quiz' | 'sons' | 'telefones'
  const [activeTab, setActiveTab] = useState<'dicionario' | 'quiz' | 'sons' | 'telefones'>('dicionario');

  // Slang search & filter
  const [searchTerm, setSearchTerm] = useState('');
  const [slangCategory, setSlangCategory] = useState<string>('todos');

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  // Web Audio Amazon Sound generator
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const noiseNodeRef = useRef<AudioNode | null>(null);

  const startAmazonSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Pink/Brown noise generator for river and forest breeze
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5; // Gain
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Low pass filter to simulate soothing river water & Amazon breeze
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.18, ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start();
      noiseNodeRef.current = whiteNoise;
      setIsPlayingSound(true);
    } catch (e) {
      console.warn('Web Audio error:', e);
    }
  };

  const stopAmazonSound = () => {
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    setIsPlayingSound(false);
  };

  const toggleSound = () => {
    if (isPlayingSound) {
      stopAmazonSound();
    } else {
      startAmazonSound();
    }
  };

  // Quiz logic
  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const question = ACRE_QUIZ[currentQuestionIndex];
    if (idx === question.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < ACRE_QUIZ.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsQuizFinished(true);
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsQuizFinished(false);
  };

  const filteredSlangs = ACRE_SLANGS.filter((s) => {
    const matchesSearch =
      s.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.meaning.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = slangCategory === 'todos' || s.category === slangCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Subnav Pills */}
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 bg-stone-900/90 p-2 rounded-2xl border border-stone-800 backdrop-blur-md">
        <button
          onClick={() => setActiveTab('dicionario')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'dicionario'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-stone-300 hover:bg-stone-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Dicionário Acreano
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'quiz'
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-stone-300 hover:bg-stone-800'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          Quiz de Rio Branco
        </button>

        <button
          onClick={() => setActiveTab('sons')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'sons'
              ? 'bg-emerald-700 text-white shadow-md'
              : 'text-stone-300 hover:bg-stone-800'
          }`}
        >
          <Trees className="w-4 h-4" />
          Sons do Rio Acre & Mata
        </button>

        <button
          onClick={() => setActiveTab('telefones')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'telefones'
              ? 'bg-red-700 text-white shadow-md'
              : 'text-stone-300 hover:bg-stone-800'
          }`}
        >
          <Phone className="w-4 h-4" />
          Telefones Úteis
        </button>
      </div>

      {/* TAB 1: Dicionário Acreano */}
      {activeTab === 'dicionario' && (
        <div className="space-y-6">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Linguagem & Expressões Populares
              </span>
              <h3 className="text-2xl font-extrabold text-white mt-1">
                Dicionário do Papoco Acreano
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 mt-1">
                Aprenda o linguajar autêntico de Rio Branco para se comunicar com orgulho e simpatia com os moradores!
              </p>
            </div>

            {/* Search and Category filter */}
            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-500" />
                <input
                  type="text"
                  placeholder="Buscar termo ou significado..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                {['todos', 'expressao', 'giria', 'culinaria', 'costume'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSlangCategory(cat)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all ${
                      slangCategory === cat
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-800 text-stone-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredSlangs.map((s, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-stone-900 border border-stone-800 hover:border-emerald-500/50 transition-all space-y-2 shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-base text-emerald-400">{s.term}</h4>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-stone-800 text-stone-400">
                    {s.category}
                  </span>
                </div>
                <p className="text-xs text-stone-200 leading-relaxed font-medium">
                  {s.meaning}
                </p>
                <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800/80 text-[11px] text-stone-400 italic">
                  "{s.example}"
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Quiz de Rio Branco */}
      {activeTab === 'quiz' && (
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {!isQuizFinished ? (
            <div>
              {/* Quiz Progress */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Desafio Cultural
                  </span>
                  <h3 className="text-xl font-extrabold text-white mt-0.5">
                    Você Conhece Rio Branco & o Acre?
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-stone-400">Pergunta</span>
                  <p className="text-base font-extrabold text-amber-400 font-mono">
                    {currentQuestionIndex + 1} / {ACRE_QUIZ.length}
                  </p>
                </div>
              </div>

              {/* Question */}
              <div className="py-6 space-y-4">
                <h4 className="text-lg sm:text-xl font-bold text-stone-100 leading-snug">
                  {ACRE_QUIZ[currentQuestionIndex].question}
                </h4>

                <div className="space-y-2.5 pt-2">
                  {ACRE_QUIZ[currentQuestionIndex].options.map((opt, idx) => {
                    let btnStyle = 'bg-stone-800/80 border-stone-700 text-stone-300 hover:bg-stone-800 hover:text-white';
                    if (isAnswered) {
                      if (idx === ACRE_QUIZ[currentQuestionIndex].correctIndex) {
                        btnStyle = 'bg-emerald-600/30 border-emerald-500 text-emerald-200 font-bold';
                      } else if (selectedOption === idx) {
                        btnStyle = 'bg-red-600/30 border-red-500 text-red-200';
                      } else {
                        btnStyle = 'opacity-40 bg-stone-800/50 border-stone-800 text-stone-500';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        disabled={isAnswered}
                        className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {isAnswered && idx === ACRE_QUIZ[currentQuestionIndex].correctIndex && (
                          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />
                        )}
                        {isAnswered && selectedOption === idx && idx !== ACRE_QUIZ[currentQuestionIndex].correctIndex && (
                          <XCircle className="w-5 h-5 text-red-400 shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Explanation and Next Button */}
              {isAnswered && (
                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-3 animate-in fade-in">
                  <p className="text-xs text-stone-300 leading-relaxed">
                    <span className="font-bold text-emerald-400 block mb-1">Explicação do Guia:</span>
                    {ACRE_QUIZ[currentQuestionIndex].explanation}
                  </p>
                  <button
                    onClick={handleNextQuestion}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-lg transition-all"
                  >
                    {currentQuestionIndex < ACRE_QUIZ.length - 1 ? 'Próxima Pergunta →' : 'Ver Meu Resultado!'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="py-8 text-center space-y-5 animate-in zoom-in-95">
              <div className="w-20 h-20 rounded-3xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto shadow-2xl">
                <Award className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Parabéns, Desbravador!
                </h3>
                <p className="text-sm text-stone-400 mt-1">
                  Você acertou <span className="font-extrabold text-amber-400">{score}</span> de {ACRE_QUIZ.length} perguntas sobre Rio Branco e o Acre.
                </p>
              </div>

              <div className="max-w-md mx-auto p-4 rounded-2xl bg-stone-950 border border-stone-800 text-xs text-stone-300">
                {score === 6 && '🏆 Desempenho Perfeito! Você tem a alma de um autêntico acreano seringueiro!'}
                {score >= 4 && score < 6 && '🌟 Muito bem! Você conhece os encantos e a história de Rio Branco com destaque!'}
                {score < 4 && '🌿 Bom começo! Use o Rio Branco-TourApk para explorar mais a Gameleira, a Baixaria e os museus!'}
              </div>

              <button
                onClick={handleRestartQuiz}
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xl transition-all inline-flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Refazer o Quiz
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Sons do Rio Acre e Floresta */}
      {activeTab === 'sons' && (
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-10 shadow-2xl text-center space-y-6">
          <div className="max-w-xl mx-auto space-y-3">
            <div className="w-16 h-16 rounded-3xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-xl">
              <Trees className="w-8 h-8" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Sons Ambientes da Floresta Amazônica & Rio Acre
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              Feche os olhos e sinta a atmosfera relaxante do entardecer na Gameleira: a correnteza do Rio Acre e a brisa nas copas das castanheiras e seringueiras nativas.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-4">
            <button
              onClick={toggleSound}
              className={`px-8 py-4 rounded-2xl font-extrabold text-sm flex items-center gap-3 shadow-2xl transition-all scale-105 ${
                isPlayingSound
                  ? 'bg-red-600 hover:bg-red-500 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
            >
              {isPlayingSound ? (
                <>
                  <Pause className="w-5 h-5" /> Pausar Sons da Mata
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-current" /> Tocar Sons do Rio Acre
                </>
              )}
            </button>

            {isPlayingSound && (
              <div className="flex items-center gap-1.5 pt-2">
                {[12, 24, 18, 30, 16, 28, 20, 32, 14, 26].map((h, i) => (
                  <div
                    key={i}
                    className="w-1 bg-emerald-400 rounded-full animate-pulse"
                    style={{
                      height: `${h}px`,
                      animationDuration: `${0.4 + (i % 4) * 0.2}s`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: Telefones Úteis */}
      {activeTab === 'telefones' && (
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-red-400">
              Segurança & Apoio ao Turista
            </span>
            <h3 className="text-2xl font-extrabold text-white mt-1">
              Contatos de Emergência em Rio Branco
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 mt-1">
              Guarde os números de socorro, apoio aeroportuário e defesa civil para sua viagem com total tranquilidade.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {USEFUL_CONTACTS.map((c, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-stone-950 border border-stone-800 flex items-center justify-between gap-3"
              >
                <div>
                  <p className="font-bold text-sm text-stone-100">{c.name}</p>
                  <p className="text-xs text-stone-400 mt-0.5">{c.desc}</p>
                </div>
                <a
                  href={`tel:${c.number.replace(/\D/g, '')}`}
                  className="px-3.5 py-1.5 rounded-xl bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white border border-red-500/40 text-xs font-mono font-bold transition-all shrink-0"
                >
                  {c.number}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
