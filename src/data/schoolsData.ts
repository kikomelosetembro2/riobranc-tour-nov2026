export interface School {
  id: string;
  nome: string;
  rede: 'Municipal' | 'Estadual' | 'Federal' | 'Privada';
  endereco: string;
  bairro?: string;
  maps_url: string;
  lat: number;
  lng: number;
  telefone?: string;
  destaques?: string[];
  etapas?: string;
}

export const RIO_BRANCO_SCHOOLS: School[] = [
  // Escolas enviadas pelo usuário
  {
    id: "ChIJI-11n1WMf5ERyifsnTU8nVg",
    nome: "Colégio de Aplicação - UFAC",
    rede: "Federal",
    endereco: "Estr. Dias Martins, 894 - Jardim Primavera, Rio Branco - AC, 69919-600",
    bairro: "Jardim Primavera",
    maps_url: "https://www.google.com/maps/place//data=!4m2!3m1!19sChIJI-11n1WMf5ERyifsnTU8nVg",
    lat: -9.9654,
    lng: -67.8485,
    telefone: "(68) 3901-2500",
    etapas: "Ensino Fundamental e Médio",
    destaques: ["Vinculado à Universidade Federal do Acre", "Referência em formação pedagógica e olimpíadas do conhecimento"]
  },
  {
    id: "ChIJYRXiMv6Mf5ERc9pZ30CSZVU",
    nome: "Colégio Acreano",
    rede: "Estadual",
    endereco: "R. Benjamin Constant, 687 - Centro, Rio Branco - AC, 69900-064",
    bairro: "Centro",
    maps_url: "https://www.google.com/maps/place//data=!4m2!3m1!19sChIJYRXiMv6Mf5ERc9pZ30CSZVU",
    lat: -9.9723,
    lng: -67.8108,
    telefone: "(68) 3224-1188",
    etapas: "Ensino Fundamental II e Ensino Médio",
    destaques: ["Escola centenária histórica no Centro de Rio Branco", "Uma das instituições de ensino mais tradicionais do estado do Acre"]
  },
  {
    id: "ChIJlVejThqNf5ERrHt_So3ggTk",
    nome: "Escola Ayrton Senna da Silva",
    rede: "Estadual",
    endereco: "Rua Zacarias, 130 - Ayrton Senna, Rio Branco - AC, 69911-836",
    bairro: "Ayrton Senna",
    maps_url: "https://www.google.com/maps/place//data=!4m2!3m1!19sChIJlVejThqNf5ERrHt_So3ggTk",
    lat: -9.9328,
    lng: -67.8286,
    telefone: "(68) 3229-3012",
    etapas: "Ensino Fundamental I e II",
    destaques: ["Forte atuação comunitária na Baixada da Sobral / Ayrton Senna", "Projetos esportivos e culturais integrados"]
  },
  {
    id: "ChIJHSlHPUyMf5ERBn4x1wAkePA",
    nome: "Centro Educacional e Cultural Meta",
    rede: "Privada",
    endereco: "R. Maj. Ladislau Ferreira, 544 - Jardim Nazle, Rio Branco - AC, 69918-117",
    bairro: "Jardim Nazle",
    maps_url: "https://www.google.com/maps/place//data=!4m2!3m1!19sChIJHSlHPUyMf5ERBn4x1wAkePA",
    lat: -9.9576,
    lng: -67.8284,
    telefone: "(68) 3224-2100",
    etapas: "Educação Infantil, Fundamental e Médio",
    destaques: ["Estrutura pedagógica moderna", "Preparatório para vestibulares e ENEM em Rio Branco"]
  },
  {
    id: "ChIJ28E_UDmMf5ERhY5lhuUSkPY",
    nome: "Escola SESI",
    rede: "Privada",
    endereco: "R. Isaura Parente, 2710 - Isaura Parente, Rio Branco - AC, 69919-015",
    bairro: "Isaura Parente",
    maps_url: "https://www.google.com/maps/place//data=!4m2!3m1!19sChIJ28E_UDmMf5ERhY5lhuUSkPY",
    lat: -9.9602,
    lng: -67.8427,
    telefone: "(68) 3212-4274",
    etapas: "Ensino Fundamental, Médio e Técnico",
    destaques: ["Educação tecnológica e robótica", "Integração com o Sistema FIEAC da indústria acreana"]
  },
  {
    id: "ChIJUdmqpu-Mf5ERDLzQUjQZ2Aw",
    nome: "Colégio Lato Sensu",
    rede: "Privada",
    endereco: "R. Palmeiras, 536 - Jardim Tropical, Rio Branco - AC, 69901-230",
    bairro: "Jardim Tropical",
    maps_url: "https://www.google.com/maps/place//data=!4m2!3m1!19sChIJUdmqpu-Mf5ERDLzQUjQZ2Aw",
    lat: -9.9682,
    lng: -67.8223,
    telefone: "(68) 3223-5000",
    etapas: "Educação Infantil, Ensino Fundamental e Médio",
    destaques: ["Excelência acadêmica e aprovações", "Desenvolvimento integral com programas bilíngues e esportivos"]
  },

  // Escolas Municipais de Rio Branco
  {
    id: "esc-mun-neutel-maia",
    nome: "Escola Municipal Neutel Maia",
    rede: "Municipal",
    endereco: "Rua Cel. Alexandrino, s/n - Bosque, Rio Branco - AC, 69900-692",
    bairro: "Bosque",
    maps_url: "https://www.google.com/maps/search/?api=1&query=Escola+Municipal+Neutel+Maia+Rio+Branco+AC",
    lat: -9.9610,
    lng: -67.8175,
    telefone: "(68) 3224-5544",
    etapas: "Educação Infantil e Ensino Fundamental I",
    destaques: ["Homenagem ao fundador de Rio Branco, Neutel Maia", "Localizada no tradicional Bairro Bosque"]
  },
  {
    id: "esc-mun-anice-dib",
    nome: "Escola Municipal Anice Dib Jatene",
    rede: "Municipal",
    endereco: "Rua Belém, 305 - Geraldo Fleming, Rio Branco - AC, 69918-400",
    bairro: "Geraldo Fleming",
    maps_url: "https://www.google.com/maps/search/?api=1&query=Escola+Municipal+Anice+Dib+Jatene+Rio+Branco+AC",
    lat: -9.9482,
    lng: -67.8250,
    telefone: "(68) 3227-1422",
    etapas: "Ensino Fundamental I",
    destaques: ["Destaque no IDEB da rede municipal de Rio Branco", "Projetos de leitura e preservação ambiental"]
  },
  {
    id: "esc-mun-ilson-ribeiro",
    nome: "Escola Municipal Ilson Ribeiro",
    rede: "Municipal",
    endereco: "Av. Juracy Moura, s/n - Conj. Cidade do Povo, Rio Branco - AC, 69902-860",
    bairro: "Cidade do Povo",
    maps_url: "https://www.google.com/maps/search/?api=1&query=Escola+Municipal+Ilson+Ribeiro+Cidade+do+Povo+Rio+Branco+AC",
    lat: -9.9980,
    lng: -67.7510,
    telefone: "(68) 3226-7890",
    etapas: "Educação Infantil e Ensino Fundamental",
    destaques: ["Principal polo educacional da Cidade do Povo", "Quadra poliesportiva coberta e biblioteca comunitária"]
  },
  {
    id: "esc-mun-maria-lucia",
    nome: "Escola Municipal Profª Maria Lúcia Moura Marin",
    rede: "Municipal",
    endereco: "Rua Rio Grande do Sul, 1200 - Morada do Sol, Rio Branco - AC, 69901-010",
    bairro: "Morada do Sol",
    maps_url: "https://www.google.com/maps/search/?api=1&query=Escola+Municipal+Maria+Lucia+Moura+Marin+Rio+Branco+AC",
    lat: -9.9635,
    lng: -67.8290,
    telefone: "(68) 3223-9988",
    etapas: "Educação Infantil e Séries Iniciais",
    destaques: ["Espaço de convivência infantil acolhedor", "Projetos de artes e musicalização"]
  }
];
