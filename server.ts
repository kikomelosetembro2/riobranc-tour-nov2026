import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini client if API key is provided
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  aiClient = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Fallback intelligent answers for Rio Branco guide
const FALLBACK_ANSWERS: Record<string, string> = {
  baixaria: "A Baixaria é o patrimônio imaterial de Rio Branco! Servida principalmente nas madrugadas e manhãs do tradicional Mercado do Bosque, consiste em uma generosa camada de cuscuz de milho macio, carne moída refogada com temperos caseiros, cheiro-verde abundante e ovos caipiras fritos com a gema mole por cima. Acompanha café com leite ou suco de cupuaçu. Uma delícia imperdível!",
  gameleira: "O Calçadão da Gameleira fica no Segundo Distrito de Rio Branco, às margens do Rio Acre. É o marco zero da fundação da cidade em 1882 pelo seringalista Neutel Maia. No local há uma gameleira centenária majestosa, o mastro da bandeira do Acre com 60 metros e casarões históricos revitalizados. É o local favorito dos rio-branquenses para assistir ao pôr do sol amazônico!",
  tacaca: "O Tacacá no Acre é levado a sério! O ponto mais famoso é o Bairro da Base, onde as tacacazeiras servem a iguaria em cuias tradicionais: tucupi fervente temperado, goma de mandioca transparente, folhas frescas de jambu (que dão aquela dormência gostosa nos lábios) e camarões secos selecionados. É servido no final da tarde!",
  roteiro: "Para 1 dia em Rio Branco, recomendo: 07h00 Café com Baixaria no Mercado do Bosque; 09h00 Visita ao Palácio Rio Branco e Museu da Borracha no Centro; 11h30 Caminhada pelo Parque da Maternidade; 12h30 Almoço com Pirarucu ou Tambaqui; 15h00 Passeio no Horto Florestal ou Parque Chico Mendes; 17h30 Pôr do sol na Gameleira atravessando a Passarela Joaquim Macedo; 19h30 Tacacá no Bairro da Base ou jantar no Mercado Velho!",
  clima: "Em Rio Branco temos clima equatorial amazônico, quente e úmido. As duas estações principais são o 'inverno amazônico' (período chuvoso, geralmente de novembro a abril) e o 'verão amazônico' ou estiagem (maio a outubro), ideal para passeios ao ar livre e contemplação do Rio Acre.",
  historia: "O Acre é o único estado brasileiro que lutou para ser brasileiro! Foi comprado da Bolívia pelo Tratado de Petrópolis em 1903 após a heroica Revolução Acreana liderada por Plácido de Castro e seringueiros. Rio Branco nasceu como seringal Empresa em 1882 e se transformou na vibrante capital do estado da floresta."
};

// API: Chico Tour - Guia IA de Rio Branco
app.post('/api/tour-assistant', async (req, res) => {
  try {
    const { message, context } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Mensagem inválida ou vazia.' });
    }

    const lower = message.toLowerCase();

    // If Gemini client is available, generate dynamic response
    if (aiClient) {
      try {
        const systemPrompt = `Você é o "Chico Tour", o guia virtual oficial e caloroso do aplicativo Rio Branco-TourApk, em Rio Branco, capital do Acre, Brasil.
Você ama a história acreana, a cultura dos seringueiros, a floresta amazônica, os heróis da Revolução Acreana (Plácido de Castro, Chico Mendes) e a rica gastronomia local (Baixaria no Mercado do Bosque, Tacacá da Base, Kibe de macaxeira, peixes amazônicos como Pirarucu e Tambaqui, doces de castanha).
Tom de voz: acolhedor, conhecedor profundo de Rio Branco, prestativo e simpático. Use expressões regionais autênticas com moderação e orgulho (como "parente", "maninho", "olha aí", "coisa boa").
Responda de forma clara, prática e envolvente em Português do Brasil.
Dê endereços, melhores horários, dicas de segurança e fatos históricos reais de Rio Branco quando apropriado.
Mantenha as respostas concisas e fáceis de ler no celular (2 a 3 parágrafos curtos ou tópicos objetivos).`;

        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: `Pergunta do turista: "${message}"\nContexto adicional: ${context || 'Nenhum'}. Responda como o Chico Tour sobre Rio Branco - Acre.`,
          config: {
            systemInstruction: systemPrompt,
          },
        });

        const reply = response.text || 'Olá, parente! Rio Branco tem muito a oferecer. Como posso te guiar hoje?';
        return res.json({ reply, source: 'gemini' });
      } catch (err: any) {
        console.warn('Erro na chamada Gemini, usando base interna:', err?.message || err);
      }
    }

    // Fallback response matching
    let matchedReply = '';
    for (const [key, text] of Object.entries(FALLBACK_ANSWERS)) {
      if (lower.includes(key)) {
        matchedReply = text;
        break;
      }
    }

    if (!matchedReply) {
      matchedReply = `Que pergunta bacana sobre nossa linda Rio Branco! A capital do Acre oferece encantos únicos: a história preservada na Gameleira e Palácio Rio Branco, a natureza vibrante no Parque Chico Mendes e Horto Florestal, e sabores incomparáveis como a Baixaria e o Tacacá da Base. Me conte o que você mais gostaria de fazer (história, gastronomia, parques ou compras de artesanato) que monto uma dica sob medida pra você!`;
    }

    return res.json({ reply: matchedReply, source: 'local-knowledge' });
  } catch (error: any) {
    console.error('Erro na API tour-assistant:', error);
    return res.status(500).json({ error: 'Erro interno no guia virtual.' });
  }
});

// API: Rio Acre e Telemetria de Rio Branco
app.get('/api/rio-acre-status', (req, res) => {
  // Dados informativos de monitoramento turístico
  const riverLevelMeters = 8.42;
  const alertQuota = 13.50;
  const floodQuota = 14.00;
  
  res.json({
    city: 'Rio Branco, Acre',
    timezone: 'America/Rio_Branco (UTC-5)',
    timeDifferenceBrasilia: '-1 hora',
    currentWeather: {
      temperature: 29,
      feelsLike: 33,
      condition: 'Sol com nuvens amazônicas',
      humidity: '79%',
      windSpeed: '9 km/h',
      uvIndex: 'Muito Alto (8)',
    },
    rioAcre: {
      currentLevelMeters: riverLevelMeters,
      alertQuotaMeters: alertQuota,
      floodQuotaMeters: floodQuota,
      status: riverLevelMeters < alertQuota ? 'Normal e Navegável' : 'Atenção',
      lastUpdate: 'Medição diária Defesa Civil / ANA',
      curiosity: 'O Rio Acre nasce no Peru, banha a Gameleira histórica e deságua no Rio Purus.'
    },
    touristNotice: 'Ótimo momento para caminhada no Calçadão da Gameleira e Parque da Maternidade.'
  });
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Rio Branco-TourApk server rodando na porta ${PORT} [http://localhost:${PORT}]`);
  });
}

startServer();
