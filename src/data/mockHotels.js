// src/data/mockHotels.js

// Função auxiliar simples para gerar IDs
let reviewIdCounter = 0;
const generateReviewId = () => reviewIdCounter++;

export const mockHotelData = [
  {
    id: 1,
    name: 'Secrets Akumal Riviera Maya',
    rating: 4.8,
    reviewsCount: 13770,
    location: 'Akumal, Quintana Roo', // Localização breve
    price: 580,
    tags: ['Adults Only', 'Luxury', 'All-inclusive', 'Beachfront', 'Pool', '5 Star'],
    isTravelersChoice: true,
    badgeYear: 2025,
    // --- Novos Campos ---
    images: [
      { id: 'img1-1', url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80', caption: 'Pool View' },
      { id: 'img1-2', url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80', caption: 'Suite Interior' },
      { id: 'img1-3', url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80', caption: 'Beachfront' },
      { id: 'img1-4', url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80', caption: 'Lobby Area' },
      { id: 'img1-5', url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80', caption: 'Restaurant' }
    ],
    description: `Experimente o luxo redefinido no Secrets Akumal Riviera Maya. Este resort apenas para adultos, vencedor do prêmio AAA Four Diamond, combina perfeitamente arquitetura elegante com a beleza natural deslumbrante de Akumal. Desfrute de praias de areia branca, águas cristalinas repletas de tartarugas marinhas e uma experiência Unlimited-Luxury® que cobre tudo, desde refeições gourmet e bebidas premium até serviços de quarto e concierge 24 horas.\n\nCada suíte oferece uma varanda ou terraço privativo, banheira de hidromassagem e vistas magníficas. Relaxe em uma das três piscinas cristalinas, rejuvenesça no Secrets Spa by Pevonia® ou explore as maravilhas subaquáticas com snorkel gratuito. Com nove opções gastronômicas que variam de culinária francesa a mexicana e seis bares e lounges sofisticados, suas papilas gustativas estarão em uma jornada deliciosa.`,
    detailedLocation: {
      address: 'Carretera Federal 307, Km 254 + 600, 77760 Akumal, Q.R., Mexico',
      lat: 20.398, // Coordenadas aproximadas
      lng: -87.319
    },
    contact: {
      phone: '+52 984 875 7600',
      website: 'https://www.amrcollection.com/en/resorts-hotels/secrets/mexico/akumal-riviera-maya/'
    },
    reviews: [
      { id: generateReviewId(), author: 'Maria S.', rating: 5, text: 'Paraíso absoluto! O serviço foi impecável e a praia é linda. Voltarei com certeza.' },
      { id: generateReviewId(), author: 'John D.', rating: 4, text: 'Ótimo resort, comida excelente. A piscina principal poderia ser um pouco menos lotada.' }
    ],
    amenities: ['Pool', 'Spa', 'Fitness Center', 'WiFi', 'Adults Only', 'Beach Access', 'Restaurants', 'Bars']
  },
  {
    id: 2,
    name: 'TRS Yucatan Hotel',
    rating: 4.6,
    reviewsCount: 14174,
    location: 'Akumal, Riviera Maya',
    price: 610,
    tags: ['Adults Only', 'Luxury', 'Butler Service', 'Pool', '5 Star'],
    isTravelersChoice: false,
    // --- Novos Campos ---
    images: [
        // CASO COM APENAS UMA IMAGEM:
       { id: 'img2-1', url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80', caption: 'Deluxe Room' }
    ],
    description: `Parte do complexo Grand Palladium, o TRS Yucatan Hotel oferece uma experiência exclusiva apenas para adultos. Desfrute de suítes luxuosas com serviço de mordomo, acesso a piscinas privativas e uma seleção de restaurantes e bares à la carte exclusivos. Os hóspedes do TRS também têm acesso total às instalações e restaurantes do resort Grand Palladium vizinho.\n\nRelaxe na piscina infinita exclusiva com vista para o mar, mime-se no Zentropia Palladium Spa & Wellness ou aproveite as diversas atividades e entretenimento noturno. O conceito Infinite Indulgence® garante que todas as suas necessidades sejam atendidas com um serviço de alto nível.`,
    detailedLocation: {
        address: 'Carretera Chetumal-Puerto Juárez Km. 256-100, 77710 Kantenah, Q.R., Mexico',
        lat: 20.455,
        lng: -87.272
    },
    contact: {
        phone: '+52 984 877 2100',
        website: 'https://www.palladiumhotelgroup.com/en/hotels/mexico/rivieramaya/trs-yucatan-hotel'
    },
    reviews: [
      { id: generateReviewId(), author: 'Carlos P.', rating: 5, text: 'Serviço de mordomo incrível! As piscinas exclusivas são um grande diferencial.' },
      { id: generateReviewId(), author: 'Emily R.', rating: 4, text: 'Lindo hotel, mas um pouco grande demais para o meu gosto. Preferi os restaurantes TRS.' }
    ],
    amenities: ['Pool', 'Spa', 'Fitness Center', 'WiFi', 'Adults Only', 'Butler Service', 'Restaurants', 'Bars', 'Tennis']
  },
  {
    id: 3,
    name: 'TRS Yucatan Hotel',
    rating: 4.6,
    reviewsCount: 14174,
    location: 'Akumal, Riviera Maya',
    price: 610,
    tags: ['Adults Only', 'Luxury', 'Butler Service', 'Pool', '5 Star'],
    isTravelersChoice: false,
    // --- Novos Campos ---
    images: [
        // CASO COM APENAS UMA IMAGEM:
       { id: 'img2-1', url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80', caption: 'Deluxe Room' }
    ],
    description: `Parte do complexo Grand Palladium, o TRS Yucatan Hotel oferece uma experiência exclusiva apenas para adultos. Desfrute de suítes luxuosas com serviço de mordomo, acesso a piscinas privativas e uma seleção de restaurantes e bares à la carte exclusivos. Os hóspedes do TRS também têm acesso total às instalações e restaurantes do resort Grand Palladium vizinho.\n\nRelaxe na piscina infinita exclusiva com vista para o mar, mime-se no Zentropia Palladium Spa & Wellness ou aproveite as diversas atividades e entretenimento noturno. O conceito Infinite Indulgence® garante que todas as suas necessidades sejam atendidas com um serviço de alto nível.`,
    detailedLocation: {
        address: 'Carretera Chetumal-Puerto Juárez Km. 256-100, 77710 Kantenah, Q.R., Mexico',
        lat: 20.455,
        lng: -87.272
    },
    contact: {
        phone: '+52 984 877 2100',
        website: 'https://www.palladiumhotelgroup.com/en/hotels/mexico/rivieramaya/trs-yucatan-hotel'
    },
    reviews: [
      { id: generateReviewId(), author: 'Carlos P.', rating: 5, text: 'Serviço de mordomo incrível! As piscinas exclusivas são um grande diferencial.' },
      { id: generateReviewId(), author: 'Emily R.', rating: 4, text: 'Lindo hotel, mas um pouco grande demais para o meu gosto. Preferi os restaurantes TRS.' }
    ],
    amenities: ['Pool', 'Spa', 'Fitness Center', 'WiFi', 'Adults Only', 'Butler Service', 'Restaurants', 'Bars', 'Tennis']
  },
  // Adicione os campos novos aos outros hotéis também...
  // ... (restante dos seus dados mock) ...
];