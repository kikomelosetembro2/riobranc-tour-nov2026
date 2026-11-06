export interface TouristSpot {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: 'historico' | 'natureza' | 'gastronomia' | 'cultura' | 'religioso';
  lat: number;
  lng: number;
  address: string;
  neighborhood: string;
  openingHours: string;
  admission: string;
  imageUrl: string;
  highlights: string[];
  audioGuideText: string;
  funFact: string;
  tags: string[];
}

export interface AcreDish {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  story: string;
  imageUrl: string;
  whereToEat: {
    place: string;
    address: string;
    neighborhood: string;
    bestTime: string;
  }[];
  ingredients: string[];
  spiceLevel: 'Suave' | 'Médio' | 'Picante' | 'Amortecedor (Jambu)';
}

export interface TourItinerary {
  id: string;
  title: string;
  duration: string;
  difficulty: 'Fácil' | 'Moderado';
  summary: string;
  recommendedFor: string;
  steps: {
    time: string;
    title: string;
    description: string;
    spotId?: string;
    tip: string;
  }[];
}

export interface AcreSlang {
  term: string;
  meaning: string;
  example: string;
  category: 'expressao' | 'giria' | 'culinaria' | 'costume';
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const RIO_BRANCO_SPOTS: TouristSpot[] = [
  {
    id: 'gameleira',
    name: 'Calçadão da Gameleira e Marco Zero',
    shortDescription: 'O berço histórico de Rio Branco às margens do Rio Acre sob a sombra da imensa gameleira centenária.',
    fullDescription: 'O Calçadão da Gameleira é o ponto mais emblemático da capital acreana. Foi aqui, em 1882, que o desbravador cearense Neutel Maia desembarcou com seus homens e instalou a sede do seringal Empresa, dando início à povoação da cidade. O local possui um calçadão charmoso, casario histórico em estilo colonial revitalizado, bares ribeirinhos e o monumental Mastro da Bandeira do Acre com 60 metros de altura.',
    category: 'historico',
    lat: -9.9754,
    lng: -67.8038,
    address: 'Rua Cunha Vasconcelos, s/n',
    neighborhood: 'Segundo Distrito (Seis de Agosto)',
    openingHours: 'Aberto 24 horas (mais movimentado das 17h às 22h)',
    admission: 'Gratuito',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
    highlights: [
      'Gameleira centenária com copa frondosa',
      'Pôr do sol deslumbrante sobre o Rio Acre',
      'Mastro da Bandeira do Acre de 60m',
      'Conexão com a Passarela Joaquim Macedo'
    ],
    audioGuideText: 'Você está no Calçadão da Gameleira, onde tudo começou em 1882. Olhe para a gigantesca árvore gameleira: sob seus galhos, seringueiros e pioneiros se reuniam para negociar fardos de látex. Ao entardecer, as águas barrentas do Rio Acre refletem os tons alaranjados do céu amazônico.',
    funFact: 'A árvore é da espécie Ficus e testemunhou toda a transição de seringal para a capital moderna de um estado soberano.',
    tags: ['Marco Zero', 'Pôr do Sol', 'Fotografia', 'História']
  },
  {
    id: 'palacio-rio-branco',
    name: 'Palácio Rio Branco',
    shortDescription: 'Edifício governamental histórico em estilo neoclássico construído em 1930 no coração da cidade.',
    fullDescription: 'Inaugurado em 15 de junho de 1930 pelo governador Hugo Carneiro, o Palácio Rio Branco é o símbolo do poder republicano acreano. Sua fachada neoclássica exibe belas colunas coríntias e escadaria de mármore. Em seu interior funciona um rico museu que conta a história dos ciclos da borracha, a Revolução Acreana e a evolução dos povos indígenas e seringueiros.',
    category: 'historico',
    lat: -9.9729,
    lng: -67.8118,
    address: 'Praça Eurico Gaspar Dutra, s/n',
    neighborhood: 'Centro',
    openingHours: 'Terça a Domingo, das 08h às 18h',
    admission: 'Entrada Franca',
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1000&q=80',
    highlights: [
      'Arquitetura neoclássica imponente',
      'Obelisco aos Heróis da Revolução Acreana na praça externa',
      'Salões de época preservados e acervo fotográfico',
      'Exposição interativa dos seringais'
    ],
    audioGuideText: 'Bem-vindo ao Palácio Rio Branco. Este palácio substituiu a antiga sede de madeira da era territorial. Na praça em frente, o obelisco homenageia Plácido de Castro e os bravos seringueiros que lutaram pela anexação do Acre ao Brasil no Tratado de Petrópolis.',
    funFact: 'A planta original do palácio foi inspirada em construções gregas para simbolizar a força e a democracia na floresta.',
    tags: ['Arquitetura', 'Museu', 'Centro Histórico', 'Revolução Acreana']
  },
  {
    id: 'passarela-joaquim-macedo',
    name: 'Passarela Joaquim Macedo',
    shortDescription: 'Moderna ponte pênsil estaiada sobre o Rio Acre unindo os dois distritos históricos da capital.',
    fullDescription: 'Inaugurada em 2006, a Passarela Joaquim Macedo é uma obra-prima de engenharia estaiada com 200 metros de extensão. Destinada exclusivamente a pedestres e ciclistas, cruza o Rio Acre ligando o Mercado Velho (Primeiro Distrito) ao Calçadão da Gameleira (Segundo Distrito). À noite, sua iluminação cênica cria um reflexo espetacular no rio.',
    category: 'historico',
    lat: -9.9743,
    lng: -67.8078,
    address: 'Ligação entre Rua Epaminondas Jácome e Rua Cunha Vasconcelos',
    neighborhood: 'Centro / Segundo Distrito',
    openingHours: 'Aberto 24 horas',
    admission: 'Gratuito',
    imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1000&q=80',
    highlights: [
      'Vista panorâmica de 360° do Rio Acre',
      'Passeio relaxante a pé e de bicicleta',
      'Iluminação noturna colorida',
      'Ponto central para selfies e fotos de viagem'
    ],
    audioGuideText: 'Caminhe pela Passarela Joaquim Macedo sentindo a brisa do Rio Acre. Ela recebeu o nome do ex-governador Joaquim Macedo e é hoje o principal elo físico e cultural entre os bairros históricos de Rio Branco.',
    funFact: 'A passarela balança de forma suave e controlada para dissipar a energia dos ventos da Amazônia.',
    tags: ['Mirante', 'Ponte Estaiada', 'Noturno', 'Pedestres']
  },
  {
    id: 'mercado-velho',
    name: 'Mercado Velho (Mercado dos Colonizadores)',
    shortDescription: 'Construído na década de 1920 às margens do rio, repleto de sabores, ervas amazônicas e artesanato.',
    fullDescription: 'O Mercado Municipal Elias Mansour (conhecido carinhosamente como Mercado Velho) foi erguido na década de 1920 em alvenaria com tijolos cozidos em olarias do Rio Acre. É o lugar perfeito para encontrar a autêntica farinha de Cruzeiro do Sul, castanha-do-brasil fresca em casca ou laminada, mel de abelhas nativas, doces de cupuaçu e garrafadas de raízes medicinais.',
    category: 'gastronomia',
    lat: -9.9748,
    lng: -67.8089,
    address: 'Av. Epaminondas Jácome, 1500',
    neighborhood: 'Centro',
    openingHours: 'Segunda a Sábado, das 06h às 19h; Domingo, das 06h às 13h',
    admission: 'Gratuito',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80',
    highlights: [
      'Bancas com a famosa farinha de mandioca crocante de Cruzeiro do Sul',
      'Erveiros tradicionais e medicina da floresta',
      'Lanchonetes com tapioca, kibe de macaxeira e sucos regionais',
      'Deck com vista para o Rio Acre'
    ],
    audioGuideText: 'Sinta os aromas da floresta! O Mercado Velho é o pulsar comercial da tradição acreana. Não deixe de provar um kibe de macaxeira frito na hora com um copo de suco de cupuaçu geladinho.',
    funFact: 'Durante as cheias históricas do Rio Acre, a água já chegou a tocar o assoalho superior do mercado.',
    tags: ['Compras', 'Artesanato', 'Farinha de Cruzeiro do Sul', 'Sabores']
  },
  {
    id: 'parque-maternidade',
    name: 'Parque da Maternidade',
    shortDescription: 'Parque linear com 6km de extensão com ciclovias, quiosques, lagos e a Casa dos Povos da Floresta.',
    fullDescription: 'Com mais de 6 quilômetros de extensão cortando o coração urbano de Rio Branco ao longo do canal da Maternidade, este parque é o principal espaço de lazer esportivo e convivência da população. Abriga ciclovias arborizadas, pistas de cooper, skate parks, quadras poliesportivas, além de espaços culturais como a Casa dos Povos da Floresta e o Memorial dos Autonomistas.',
    category: 'natureza',
    lat: -9.9678,
    lng: -67.8185,
    address: 'Av. Getúlio Vargas até Av. Ceará',
    neighborhood: 'Bosque / Centro / Abraão Alab',
    openingHours: 'Aberto 24 horas',
    admission: 'Gratuito',
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80',
    highlights: [
      'Ciclovia contínua de 6km sob árvores nativas',
      'Casa dos Povos da Floresta com arquitetura seringueira',
      'Quiosques com água de coco e lanches regionais',
      'Praça Povos da Floresta com escultura imponente'
    ],
    audioGuideText: 'O Parque da Maternidade revitalizou um antigo igarapé degradado e transformou a qualidade de vida em Rio Branco. É aqui que os moradores se reúnem ao entardecer para correr, pedalar e conversar tomando água de coco fresca.',
    funFact: 'O parque é um modelo internacional de recuperação ambiental urbana em bacias hidrográficas tropicais.',
    tags: ['Parque Linear', 'Ciclovia', 'Caminhada', 'Povos da Floresta']
  },
  {
    id: 'horto-florestal',
    name: 'Horto Florestal de Rio Branco',
    shortDescription: '17 hectares de floresta primária com trilhas sombreadas, igarapé e seringueiras nativas com história.',
    fullDescription: 'O Horto Florestal é uma verdadeira reserva ecológica dentro da malha urbana de Rio Branco. Com 17 hectares de vegetação amazônica densa, o parque conta com trilhas ecológicas suspensas e de terra batida, árvores gigantes como samaúmas e castanheiras, e seringueiras onde é possível ver as cicatrizes da sangria de látex feita por seringueiros no século passado.',
    category: 'natureza',
    lat: -9.9532,
    lng: -67.8389,
    address: 'Estrada do Calafate, s/n',
    neighborhood: 'Vila Ivonete / Calafate',
    openingHours: 'Diariamente, das 05h às 18h',
    admission: 'Gratuito',
    imageUrl: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1000&q=80',
    highlights: [
      'Trilhas ecológicas com cantos de pássaros amazônicos',
      'Lago com peixes e tartarugas da Amazônia',
      'Academia ao ar livre e pistas de corrida em meio à mata',
      'Exemplares vivos da Hevea brasiliensis (árvore da borracha)'
    ],
    audioGuideText: 'Respire o oxigênio puro da mata. No Horto Florestal, a temperatura cai até 3 graus em relação às avenidas da cidade graças à frondosa copa das árvores nativas.',
    funFact: 'Muitas espécies de macacos-de-cheiro e cutias circulam livremente pelas trilhas nas primeiras horas da manhã.',
    tags: ['Trilhas', 'Mata Amazônica', 'Seringueiras', 'Ecoturismo']
  },
  {
    id: 'parque-chico-mendes',
    name: 'Parque Ambiental Chico Mendes',
    shortDescription: '57 hectares de floresta viva com memorial ao mártir ecologista e centro de reabilitação de fauna.',
    fullDescription: 'Criado em homenagem ao líder seringueiro e ambientalista Chico Mendes, o parque possui 57 hectares de floresta preservada na Rodovia AC-40. O espaço combina conservação ambiental com lazer educativo, contendo réplica de um seringal tradicional com a casa de taipa do seringueiro, defumador de borracha, além de recintos amplos de animais da fauna amazônica resgatados.',
    category: 'cultura',
    lat: -10.0089,
    lng: -67.7654,
    address: 'Rodovia AC-40, Km 5, Vila Acre',
    neighborhood: 'Vila Acre',
    openingHours: 'Terça a Domingo, das 07h às 17h',
    admission: 'R$ 5,00 (crianças até 10 anos e idosos não pagam)',
    imageUrl: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1000&q=80',
    highlights: [
      'Memorial Chico Mendes com seus ideais de preservação da Amazônia',
      'Trilha do Seringueiro com demonstração do corte da seringueira',
      'Onças-pintadas e animais resgatados pelos órgãos ambientais',
      'Lago com mirantes e áreas para piquenique familiar'
    ],
    audioGuideText: 'Chico Mendes levou a voz dos povos da floresta para o mundo inteiro. Aqui no parque ambiental, você descobre como funcionavam as Reservas Extrativistas e por que manter a floresta em pé é mais valioso do que derrubá-la.',
    funFact: 'O conceito de Reserva Extrativista (Resex), hoje adotado mundialmente, nasceu aqui nas lutas sindicais seringueiras do Acre.',
    tags: ['Chico Mendes', 'Animais da Amazônia', 'Seringal Vivo', 'Educação Ambiental']
  },
  {
    id: 'catedral-nazare',
    name: 'Catedral Nossa Senhora de Nazaré',
    shortDescription: 'Bela catedral em estilo romano com três naves e vitrais coloridos na Praça Plácido de Castro.',
    fullDescription: 'Iniciada em 1948 e inaugurada em 1958, a Catedral de Rio Branco impressiona pela imponência de sua nave central e duas torres sineiras. Projetada em estilo basílica romana, seu interior abriga vitrais europeus que filtram a forte luz solar amazônica em belos feixes multicoloridos, além de afrescos sacros.',
    category: 'religioso',
    lat: -9.9721,
    lng: -67.8142,
    address: 'Praça Plácido de Castro, Centro',
    neighborhood: 'Centro',
    openingHours: 'Segunda a Sábado, das 07h às 19h; Domingo com missas às 07h, 17h e 19h',
    admission: 'Gratuito',
    imageUrl: 'https://images.unsplash.com/photo-1548625361-195973b0a53b?auto=format&fit=crop&w=1000&q=80',
    highlights: [
      'Vitrais importados com passagens bíblicas',
      'Praça Plácido de Castro (Praça da Revolução) em frente',
      'Torres visíveis de vários pontos do Primeiro Distrito',
      'Tranquilidade e acústica excepcional'
    ],
    audioGuideText: 'A Catedral de Nazaré é o principal templo católico do Acre. A praça que a envolve foi batizada em honra a José Plácido de Castro, o general gaúcho que liderou as tropas seringueiras na Revolução Acreana.',
    funFact: 'A construção contou com tijolos especiais e pedras transportadas em vapores pelos rios da Amazônia.',
    tags: ['Catedral', 'Vitrais', 'História', 'Praça da Revolução']
  },
  {
    id: 'museu-da-borracha',
    name: 'Museu da Borracha Gov. Hermelindo Gusmão',
    shortDescription: 'Acervo fascinante sobre a era áurea da borracha, paleontologia amazônica e artefatos indígenas.',
    fullDescription: 'Fundado em 1978 no cinquentenário do Tratado de Petrópolis, o Museu da Borracha reúne um acervo incomparável sobre a história do Acre: apetrechos autênticos do cotidiano dos seringais (porongas, tigelas de látex, machadinhas, prensas), fotografias históricas, fósseis pré-históricos de jacarés gigantes (Purussaurus) e arte plumária das etnias indígenas nativas.',
    category: 'cultura',
    lat: -9.9712,
    lng: -67.8105,
    address: 'Av. Ceará, 1441',
    neighborhood: 'Centro',
    openingHours: 'Segunda a Sexta, das 08h às 17h; Sábados das 09h às 14h',
    admission: 'Entrada Franca',
    imageUrl: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&w=1000&q=80',
    highlights: [
      'Apetrechos reais dos seringueiros da virada do século XX',
      'Fósseis da megafauna pré-histórica do Acre',
      'Acervo das nações originárias Kaxinawá, Ashaninka e Yawanawá',
      'Guias educativos experientes'
    ],
    audioGuideText: 'Entrar no Museu da Borracha é viajar no tempo: aqui compreendemos a dureza da vida nos seringais isolados na selva, a riqueza gerada pela borracha que moveu a indústria automobilística mundial e a sabedoria milenar dos povos originários.',
    funFact: 'No Acre foram descobertos os maiores fósseis do réptil pré-histórico Purussaurus brasiliensis, que chegava a 12 metros de comprimento.',
    tags: ['Museu', 'Ciclo da Borracha', 'Fósseis', 'Indígenas']
  },
  {
    id: 'mercado-do-bosque',
    name: 'Mercado do Bosque (Templo da Baixaria)',
    shortDescription: 'O ponto de encontro tradicional dos rio-branquenses para comer a melhor Baixaria da cidade.',
    fullDescription: 'Não se pode dizer que conheceu Rio Branco sem passar pelo Mercado do Bosque ao amanhecer ou pela manhã. Famoso por reunir dezenas de quiosques que servem a "Baixaria" acreana em pratos fumegantes, além de mingaus de milho, tapiocas recheadas e sucos de frutas da Amazônia.',
    category: 'gastronomia',
    lat: -9.9625,
    lng: -67.8164,
    address: 'Rua Cel. Alexandrino, s/n',
    neighborhood: 'Bosque',
    openingHours: 'Diariamente das 05h às 13h (alguns boxes abrem às 02h da madrugada nos fins de semana)',
    admission: 'Consumo no local',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    highlights: [
      'A mais tradicional Baixaria de Rio Branco',
      'Ambiente popular autêntico e vibrante',
      'Sucos de graviola, açaí, cupuaçu e taperebá batidos na hora',
      'Ponto tradicional pós-balada e pré-trabalho dos moradores'
    ],
    audioGuideText: 'Sente-se à mesa e peça: "Me vê uma baixaria caprichada!". Veja o prato ser montado com carinho: cuscuz quentinho desfiado, carne moída bem temperada com cebolinha e cheiro-verde, coroado com ovos com gema mole que se misturam ao caldo.',
    funFact: 'A Baixaria é tombada como Patrimônio Cultural Imaterial de Rio Branco por lei municipal.',
    tags: ['Baixaria', 'Café da Manhã', 'Culinária Acreana', 'Tradição']
  },
  {
    id: 'bairro-da-base',
    name: 'Bairro da Base (O Berço do Tacacá Acreano)',
    shortDescription: 'Polo gastronômico das lendárias tacacazeiras de Rio Branco servindo tacacá com tucupi e muito jambu.',
    fullDescription: 'Situado próximo ao Rio Acre, o Bairro da Base é conhecido em toda a Amazônia como a capital do tacacá. A partir das 16h, dezenas de quiosques tradicionais começam a exalar o vapor aromático do tucupi fervente temperado com chicória amazônica, alho e pimenta-de-cheiro.',
    category: 'gastronomia',
    lat: -9.9768,
    lng: -67.8115,
    address: 'Rua 24 de Janeiro e adjacências',
    neighborhood: 'Base',
    openingHours: 'Diariamente das 16h às 22h30',
    admission: 'Consumo nos quiosques (Tacacá a partir de R$ 20)',
    imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1000&q=80',
    highlights: [
      'Tacacazeiras com décadas de tradição culinária familiar',
      'Jambu fresquinho que provoca a sensação de formigamento nos lábios',
      'Cuias ornamentadas com palha regional',
      'Vatapá e doces amazônicos também disponíveis'
    ],
    audioGuideText: 'Segure a cuia com o suporte de palha para não queimar as mãos. Dê pequenos goles no tucupi quente, sinta a textura macia da goma e mastigue as folhas de jambu. A sensação de refrescância e formigamento é inigualável!',
    funFact: 'Diferente de Belém e Manaus, o tacacá no Acre costuma vir com tucupi bem encorpado e porção generosa de camarão seco de rio.',
    tags: ['Tacacá', 'Jambu', 'Tucupi', 'Noite Acreana']
  },
  {
    id: 'geoglifos',
    name: 'Rota dos Geoglifos do Acre',
    shortDescription: 'Patrimônio arqueológico mundial: gigantescas formas geométricas esculpidas na terra há mais de 2.000 anos.',
    fullDescription: 'Descobertos após o desmatamento nas décadas de 70 e 80, os Geoglifos do Acre são impressionantes figuras geométricas (círculos, quadrados e octógonos) de até 300 metros de diâmetro esculpidas no solo argiloso amazônico entre 2.000 e 800 anos atrás. Revelam que a Amazônia abrigou sociedades pré-colombianas complexas e organizadas.',
    category: 'cultura',
    lat: -9.9890,
    lng: -67.7200,
    address: 'Rodovias BR-317 e BR-364 (Pontos de sobrevoo e fazendas históricas)',
    neighborhood: 'Entorno metropolitano de Rio Branco',
    openingHours: 'Agendamento prévio com agências de turismo e voos panorâmicos',
    admission: 'Varia conforme tour guiado ou sobrevoo de monomotor',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    highlights: [
      'Mais de 500 estruturas geométricas mapeadas no Acre',
      'Candidato a Patrimônio Mundial da Humanidade pela UNESCO',
      'Passeios de sobrevoo saindo do aeroclube de Rio Branco',
      'Enigma arqueológico da Amazônia pré-colonial'
    ],
    audioGuideText: 'Os geoglifos provaram que a Amazônia não era uma floresta virgem intocada, mas sim o lar de civilizações avançadas com conhecimentos de geometria e astronomia milênios antes da chegada europeia.',
    funFact: 'As valas têm até 4 metros de profundidade e 11 metros de largura, e eram usadas para cerimônias rituais sagradas.',
    tags: ['Arqueologia', 'UNESCO', 'Misterioso', 'Geoglifos']
  }
];

export const ACRE_DISHES: AcreDish[] = [
  {
    id: 'baixaria',
    name: 'Baixaria Acreana',
    subtitle: 'O Café da Manhã dos Campeões de Rio Branco',
    description: 'Prato mais famoso do Acre: base de cuscuz de milho flocão bem macio, coberto com carne moída guisada e úmida bem temperada, cheiro-verde abundante (coentro e cebolinha) e coroado com ovos caipiras fritos com gema mole.',
    story: 'Criada no início dos anos 2000 nos quiosques do Mercado do Bosque para alimentar trabalhadores da madrugada e seresteiros que precisavam de uma refeição farta, saborosa e barata. O nome vem da brincadeira de "fazer uma baixaria no prato". Hoje é Patrimônio Cultural Imaterial de Rio Branco.',
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    whereToEat: [
      {
        place: 'Mercado do Bosque (Vários Boxes)',
        address: 'Rua Cel. Alexandrino, Bosque',
        neighborhood: 'Bosque',
        bestTime: 'Das 05h às 10h da manhã'
      },
      {
        place: 'Quiosque da Tia',
        address: 'Parque da Maternidade',
        neighborhood: 'Centro',
        bestTime: 'A partir das 06h30'
      }
    ],
    ingredients: ['Cuscuz de milho', 'Carne moída refogada com alho e cebola', 'Cheiro-verde picadinho', 'Ovos fritos caipiras (gema mole)', 'Pimenta-de-cheiro'],
    spiceLevel: 'Suave'
  },
  {
    id: 'tacaca',
    name: 'Tacacá Acreano',
    subtitle: 'A Porção Mágica Amazônica que Adormece os Lábios',
    description: 'Servido em cuias tradicionais fumegantes, leva caldo amarelo de tucupi temperado fervente, goma de tapioca hidratada e elástica, folhas frescas de jambu e fartos camarões secos salgados.',
    story: 'Herança direta dos povos originários amazônicos (Tupi-Guarani), aprimorada pelas famílias tradicionais de Rio Branco, especialmente no Bairro da Base. O jambu contém espilantol, substância que causa uma leve e agradável anestesia na boca.',
    imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
    whereToEat: [
      {
        place: 'Tacacá da Base',
        address: 'Rua 24 de Janeiro',
        neighborhood: 'Bairro da Base',
        bestTime: 'A partir das 16h30'
      },
      {
        place: 'Tacacá da Dona Maria',
        address: 'Calçadão da Gameleira',
        neighborhood: 'Segundo Distrito',
        bestTime: 'Final de tarde no pôr do sol'
      }
    ],
    ingredients: ['Tucupi fervido e temperado', 'Goma de mandioca', 'Folhas de jambu fresco', 'Camarões secos', 'Pimenta de cheiro no tucupi'],
    spiceLevel: 'Amortecedor (Jambu)'
  },
  {
    id: 'kibe-arroz-macaxeira',
    name: 'Kibe de Macaxeira e Kibe de Arroz',
    subtitle: 'A Fascinante Fusão Árabe-Amazônica do Acre',
    description: 'Croquetes crocantes e dourados feitos com massa de macaxeira (aipim/mandioca) cozida ou arroz moído, recheados com carne moída bem temperada ou carne-de-sol desfiada e queijo coalho.',
    story: 'O Acre recebeu grande contingente de imigrantes libaneses e sírios durante o ciclo da borracha. Sem trigo para quibe no meio da floresta tropical, as famílias adaptaram a receita usando a macaxeira e o arroz local, criando um dos salgados mais adorados de Rio Branco.',
    imageUrl: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80',
    whereToEat: [
      {
        place: 'Lanchonetes do Mercado Velho',
        address: 'Mercado Municipal dos Colonizadores',
        neighborhood: 'Centro',
        bestTime: 'Manhã e tarde'
      },
      {
        place: 'Pastelarias e Lanches da Gameleira',
        address: 'Rua Cunha Vasconcelos',
        neighborhood: 'Segundo Distrito',
        bestTime: 'Final da tarde'
      }
    ],
    ingredients: ['Macaxeira cozida e amassada', 'Carne moída ou carne de sol', 'Hortelã fresca picada', 'Cebola e alho', 'Queijo coalho (opcional)'],
    spiceLevel: 'Suave'
  },
  {
    id: 'pirarucu-casaca',
    name: 'Pirarucu de Casaca',
    subtitle: 'O Gigante das Águas em Camadas de Sabor',
    description: 'Prato festivo feito com lascas dessalgadas de pirarucu (o bacalhau da Amazônia), banana-da-terra frita em rodelas, farinha de mandioca de Cruzeiro do Sul bem crocante, leite de coco, cheiro-verde e azeitonas.',
    story: 'O Pirarucu é o maior peixe de escamas de água doce do planeta, podendo atingir 3 metros e 200 quilos. No Acre, seu preparo ' + 'de casaca' + ' é tradição em almoços de domingo e festas juninas.',
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    whereToEat: [
      {
        place: 'Restaurantes Regionais na Beira-Rio',
        address: 'Próximo à Passarela Joaquim Macedo',
        neighborhood: 'Centro',
        bestTime: 'Almoço das 11h30 às 15h'
      },
      {
        place: 'Quiosques de Peixe da Via Verde',
        address: 'Estrada Dias Martins',
        neighborhood: 'Jardim Primavera',
        bestTime: 'Finais de semana'
      }
    ],
    ingredients: ['Lombo de Pirarucu seco e desfiado', 'Banana-da-terra frita', 'Farinha de Cruzeiro do Sul', 'Leite de coco', 'Azeite e cheiro-verde'],
    spiceLevel: 'Médio'
  },
  {
    id: 'farinha-cruzeiro',
    name: 'Farinha de Cruzeiro do Sul',
    subtitle: 'A Rainha Crocante com Selo de Indicação Geográfica',
    description: 'Farinha de mandioca artesanal, dourada, ultra crocante e aerada que não empapa, produzida no vale do Juruá e apreciada no Acre inteiro em todas as refeições.',
    story: 'Possui Indicação Geográfica oficial do INPI. O processo de fermentação e torra em tachos de cobre pelos produtores acreanos confere uma textura única no mundo.',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    whereToEat: [
      {
        place: 'Boxes de Farinha do Mercado Velho',
        address: 'Av. Epaminondas Jácome',
        neighborhood: 'Centro',
        bestTime: 'Compre para levar para casa!'
      }
    ],
    ingredients: ['Mandioca amarela selecionada da Amazônia', 'Fermentação natural', 'Torrefação lenta'],
    spiceLevel: 'Suave'
  }
];

export const TOUR_ITINERARIES: TourItinerary[] = [
  {
    id: 'express-1dia',
    title: 'Rio Branco Expresso (1 Dia Perfeito)',
    duration: '1 Dia Inteiro',
    difficulty: 'Fácil',
    summary: 'Roteiro essencial para quem tem pouco tempo e quer vivenciar a história da Revolução Acreana, provar a Baixaria, relaxar no parque e curtir o pôr do sol na Gameleira.',
    recommendedFor: 'Viajantes a negócios, turistas de fim de semana, primeira visita',
    steps: [
      {
        time: '07:30',
        title: 'Café da Manhã com Baixaria no Mercado do Bosque',
        description: 'Comece o dia com a clássica Baixaria acreana quentinha acompanhada de suco natural de cupuaçu ou café com leite.',
        spotId: 'mercado-do-bosque',
        tip: 'Chegue cedo para ver o movimento matinal dos moradores!'
      },
      {
        time: '09:30',
        title: 'Centro Histórico e Palácio Rio Branco',
        description: 'Visite o Palácio Rio Branco e admire o obelisco dos heróis na Praça Eurico Gaspar Dutra. Em seguida, caminhe até a imponente Catedral Nossa Senhora de Nazaré.',
        spotId: 'palacio-rio-branco',
        tip: 'A entrada no palácio é gratuita e os monitores contam curiosidades incríveis.'
      },
      {
        time: '11:00',
        title: 'Visita ao Museu da Borracha',
        description: 'Mergulhe na saga dos seringueiros, admire os fósseis do jacaré pré-histórico Purussaurus e veja o artesanato dos povos indígenas.',
        spotId: 'museu-da-borracha',
        tip: 'Ar-condicionado geladinho no museu, perfeito para descansar do calor do meio-dia.'
      },
      {
        time: '12:30',
        title: 'Almoço Regional com Peixe Amazônico',
        description: 'Prove um delicioso Tambaqui na brasa com farofa de castanha e vinagrete ou um Pirarucu de casaca nos restaurantes do Centro.',
        spotId: 'mercado-velho',
        tip: 'Peça para experimentar a farinha de Cruzeiro do Sul na farofa!'
      },
      {
        time: '15:30',
        title: 'Caminhada Sombreada no Horto Florestal',
        description: 'Respire o ar puro da floresta amazônica nas trilhas sob as seringueiras e samaúmas centenárias.',
        spotId: 'horto-florestal',
        tip: 'Use repelente e tênis confortável para caminhar nas trilhas.'
      },
      {
        time: '17:30',
        title: 'Pôr do Sol na Gameleira & Passarela Joaquim Macedo',
        description: 'Atravesse a passarela a pé sobre o Rio Acre e assista ao entardecer sob a sombra da frondosa Gameleira centenária.',
        spotId: 'gameleira',
        tip: 'O reflexo do sol no Rio Acre rende fotos memoráveis para redes sociais.'
      },
      {
        time: '19:30',
        title: 'Tacacá Quentinho no Bairro da Base',
        description: 'Feche o dia como um autêntico acreano: tomando tacacá com bastante jambu na cuia no tradicional Bairro da Base.',
        spotId: 'bairro-da-base',
        tip: 'Tome o tacacá devagar e saboreie a dormência gostosa nos lábios.'
      }
    ]
  },
  {
    id: 'eco-floresta-2dias',
    title: 'Fim de Semana Ecológico & Memorial Chico Mendes',
    duration: '2 Dias (Sábado e Domingo)',
    difficulty: 'Fácil',
    summary: 'Mergulho na natureza amazônica preservada, conhecendo a história da preservação da Amazônia, fauna local e a cultura seringueira viva.',
    recommendedFor: 'Amantes da natureza, famílias, pesquisadores e amantes do ecoturismo',
    steps: [
      {
        time: 'Sábado 08:30',
        title: 'Parque Ambiental Chico Mendes',
        description: 'Passe a manhã na reserva ecológica de 57 hectares, conheça a réplica do seringal, a casa de Chico Mendes e os animais da floresta.',
        spotId: 'parque-chico-mendes',
        tip: 'Leve garrafinha de água e protetor solar.'
      },
      {
        time: 'Sábado 13:00',
        title: 'Almoço no Mercado Velho',
        description: 'Saboreie galinha picante caipira ou pratos à base de peixes ribeirinhos contemplando as águas do Rio Acre.',
        spotId: 'mercado-velho',
        tip: 'Aproveite para comprar castanhas-do-brasil frescas embaladas a vácuo.'
      },
      {
        time: 'Sábado 16:30',
        title: 'Passeio pelo Parque da Maternidade',
        description: 'Alugue uma bicicleta ou caminhe pelos 6km de áreas verdes e visite a Casa dos Povos da Floresta.',
        spotId: 'parque-maternidade',
        tip: 'Pare no quiosque próximo à Praça Povos da Floresta para beber água de coco.'
      },
      {
        time: 'Domingo 08:00',
        title: 'Observação da Rota dos Geoglifos',
        description: 'Conheça a história e veja os misteriosos círculos e quadrados de terra esculpidos por civilizações antigas há mais de 1000 anos.',
        spotId: 'geoglifos',
        tip: 'Sobrevoos de pequeno porte podem ser agendados no aeroclube local.'
      },
      {
        time: 'Domingo 16:00',
        title: 'Calçadão da Gameleira e Noite Cultural',
        description: 'Feirinha de artesanato acreano, música ao vivo e gastronomia de rua no berço da cidade.',
        spotId: 'gameleira',
        tip: 'Experimente o Kibe de macaxeira frito na hora.'
      }
    ]
  },
  {
    id: 'rota-sabores-acreanos',
    title: 'Tour Gastronômico: O Sabor da Floresta',
    duration: '1 Dia Gastronômico',
    difficulty: 'Fácil',
    summary: 'Roteiro desenhado para os paladares curiosos: dos cafés da manhã generosos aos quitutes árabes-amazônicos e o incomparável tacacá.',
    recommendedFor: 'Foodies, apreciadores de culinária regional e chefs de viagem',
    steps: [
      {
        time: '07:00',
        title: 'Café com Baixaria no Mercado do Bosque',
        description: 'Prove a baixaria tradicional e um copão de mingau de milho ou suco de açaí puro.',
        spotId: 'mercado-do-bosque',
        tip: 'Misture a gema de ovo caipira no cuscuz com carne antes da primeira garfada.'
      },
      {
        time: '10:30',
        title: 'Degustação de Castanhas e Doces no Mercado Velho',
        description: 'Visite as bancas de produtos extrativistas: castanhas recém-coletadas, bombons de cupuaçu e farinha de tapioca.',
        spotId: 'mercado-velho',
        tip: 'Peça para experimentar as diferentes gradações da farinha de Cruzeiro do Sul.'
      },
      {
        time: '12:30',
        title: 'Almoço Ribeirinho: Pirarucu e Tambaqui',
        description: 'Pratos de peixes assados na brasa com molho de tucupi e castanha ralada.',
        spotId: 'mercado-velho',
        tip: 'Harmonize com guaraná da Amazônia gelado.'
      },
      {
        time: '16:30',
        title: 'Festival de Kibe de Macaxeira',
        description: 'A tarde pede salgados com a massa aveludada de macaxeira recheada com carne moída e hortelã.',
        spotId: 'gameleira',
        tip: 'Coloque umas gotinhas de pimenta de cheiro no kibe.'
      },
      {
        time: '18:30',
        title: 'O Sagrado Tacacá do Bairro da Base',
        description: 'O ritual de tomar tacacá na cuia com jambu formigante e camarões secos.',
        spotId: 'bairro-da-base',
        tip: 'Não use colher! O tacacá é tomado diretamente sorvendo da cuia.'
      }
    ]
  }
];

export const ACRE_SLANGS: AcreSlang[] = [
  {
    term: 'Telezé!',
    meaning: 'Expressão de espanto, surpresa ou discordância ("Você está é louco! / Tá doido, é?").',
    example: 'Telezé que tu vai sair nesse sol de rachar sem chapéu, mano!',
    category: 'expressao'
  },
  {
    term: 'Parente',
    meaning: 'Forma carinhosa e respeitosa de chamar qualquer pessoa, vizinho ou amigo, de origem indígena.',
    example: 'E aí, meu parente, tudo bom contigo?',
    category: 'costume'
  },
  {
    term: 'Bocó',
    meaning: 'Pessoa distraída, ingênua, boba ou sem malícia.',
    example: 'Deixa de ser bocó e presta atenção no caminho pro Mercado Velho!',
    category: 'giria'
  },
  {
    term: 'Dar o papoco',
    meaning: 'Fazer sucesso estrondoso, estourar, causar uma impressão marcante.',
    example: 'Esse restaurante novo na Gameleira deu o maior papoco na cidade!',
    category: 'giria'
  },
  {
    term: 'Pisa',
    meaning: 'Uma surra, derrota grande ou goleada esportiva.',
    example: 'O time levou uma pisa no campeonato no estádio Florestão.',
    category: 'expressao'
  },
  {
    term: 'Cheirando a leite',
    meaning: 'Pessoa muito jovem, inexperiente ou novata.',
    example: 'Esse motorista tá cheirando a leite, não conhece nem o Bairro da Base.',
    category: 'giria'
  },
  {
    term: 'Arrepiado / Na bronca',
    meaning: 'Chateado, irritado ou nervoso com uma situação.',
    example: 'O maninho ficou arrepiado porque o tacacá já tinha acabado.',
    category: 'expressao'
  },
  {
    term: 'Goma',
    meaning: 'Fécula ou amido da mandioca usado para preparar tapioca e o tacacá.',
    example: 'Coloca um pouco mais de goma na cuia pra encorpar o tacacá!',
    category: 'culinaria'
  },
  {
    term: 'Baixaria',
    meaning: 'O cuscuz de milho com carne moída, cheiro-verde e ovo frito. O prato patrimônio de Rio Branco.',
    example: 'Bora ali no Mercado do Bosque bater uma baixaria?',
    category: 'culinaria'
  },
  {
    term: 'Poronga',
    meaning: 'Lamparina de querosene presa na cabeça usada pelos seringueiros para cortar a seringueira na escuridão da mata.',
    example: 'O seringueiro acendia a poronga às 3 da madrugada para sangrar o látex.',
    category: 'costume'
  }
];

export const ACRE_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: 'Qual é o prato considerado Patrimônio Cultural Imaterial de Rio Branco servido no café da manhã?',
    options: ['Tacacá com tucupi', 'Baixaria de cuscuz com carne moída e ovo', 'Pão de queijo com carne-de-sol', 'Acarajé da floresta'],
    correctIndex: 1,
    explanation: 'A Baixaria é o prato icônico matinal de Rio Branco, feito com cuscuz de milho, carne moída refogada, cheiro-verde e ovos caipiras com gema mole fritos por cima.'
  },
  {
    id: 2,
    question: 'Em que ano Rio Branco foi fundada sob a copa da lendária Gameleira centenária?',
    options: ['1500', '1882', '1962', '1920'],
    correctIndex: 1,
    explanation: 'Em 1882, o desbravador cearense Neutel Maia desembarcou na margem direita do Rio Acre e instalou o seringal Empresa, marco inicial de Rio Branco.'
  },
  {
    id: 3,
    question: 'Qual é o nome da ponte estaiada exclusiva para pedestres que conecta o Primeiro e Segundo Distrito de Rio Branco?',
    options: ['Ponte Rio-Niterói', 'Passarela Joaquim Macedo', 'Ponte Estaiada JK', 'Passarela Chico Mendes'],
    correctIndex: 1,
    explanation: 'A Passarela Joaquim Macedo foi inaugurada em 2006, medindo 200m sobre o Rio Acre, unindo o Mercado Velho ao Calçadão da Gameleira.'
  },
  {
    id: 4,
    question: 'Qual substância presente na folha de Jambu causa a famosa dormência nos lábios ao tomar tacacá?',
    options: ['Cafeína', 'Espilantol', 'Capsaicina', 'Glúten'],
    correctIndex: 1,
    explanation: 'O espilantol é o composto químico natural encontrado nas folhas e flores do jambu, que estimula as glândulas salivares e provoca um formigamento elétrico agradável.'
  },
  {
    id: 5,
    question: 'Quem foi o líder seringueiro mundialmente famoso nascido no Acre que lutou pela preservação da Amazônia?',
    options: ['Plácido de Castro', 'Chico Mendes', 'Neutel Maia', 'José Guiomard'],
    correctIndex: 1,
    explanation: 'Francisco Alves Mendes Filho, o Chico Mendes, foi o patrono do meio ambiente brasileiro e idealizador das Reservas Extrativistas para manter a floresta em pé.'
  },
  {
    id: 6,
    question: 'Qual tratado internacional assinado em 1903 oficializou a anexação do Acre ao território brasileiro?',
    options: ['Tratado de Tordesilhas', 'Tratado de Petrópolis', 'Tratado de Madri', 'Tratado do Rio de Janeiro'],
    correctIndex: 1,
    explanation: 'O Tratado de Petrópolis, negociado pelo Barão do Rio Branco, garantiu a compra do Acre da Bolívia por 2 milhões de libras esterlinas e a construção da ferrovia Madeira-Mamoré.'
  }
];

export const USEFUL_CONTACTS = [
  { name: 'SAMU (Emergência Médica)', number: '192', desc: 'Atendimento móvel de urgência 24h' },
  { name: 'Polícia Militar', number: '190', desc: 'Central de segurança pública' },
  { name: 'Corpo de Bombeiros', number: '193', desc: 'Resgate e emergências' },
  { name: 'Defesa Civil Municipal (Rio Acre)', number: '199', desc: 'Monitoramento de cheias e apoio' },
  { name: 'Aeroporto Internacional Plácido de Castro', number: '(68) 3211-1000', desc: 'BR-364, km 18' },
  { name: 'Terminal Rodoviário Internacional', number: '(68) 3224-6998', desc: 'Av. Uirapuru, Conjunto Universitário' },
  { name: 'Delegacia de Proteção ao Turista', number: '(68) 3224-2010', desc: 'Plantão de atendimento especializado' }
];
