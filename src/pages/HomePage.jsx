// src/pages/HomePage.jsx
import React, { useMemo } from 'react';
import styled from 'styled-components'; // É comum ter um wrapper para a página

// Importe os COMPONENTES específicos da HomePage
import HeroCard from '../components/HomePage/HeroCard'; // Assumindo que existe
import FeaturedLocalsCarousel from '../components/HomePage/FeaturedLocalsCarousel'; // Carrossel de Locais em Destaque (ex-CategoryCarousel)
import CategoryHighlightBanner from '../components/HomePage/CategoryHighlightBanner'; // Banner de Destaque de Categoria (ex-AwardsBanner)
import PromotionCard from '../components/HomePage/PromotionCard'; // Assumindo que existe
import AboutSection from '../components/HomePage/AboutSection'; // Seção "Sobre" adaptada para categorias

// Importar ícones e imagens necessários para os banners/componentes
import { IoRestaurantOutline, IoGameControllerOutline } from 'react-icons/io5'; // Exemplo de ícones

// --- AJUSTE OS CAMINHOS E NOMES DOS ARQUIVOS DAS IMAGENS CONFORME SUA ESTRUTURA DE PASTAS! ---
// Imagens que já estavam importadas:
import alimentacaoBannerImg from '../assets/category-covers/comida1.png'; // Exemplo banner alimentação
import lazerBannerImg from '../assets/category-covers/lazer2.avif'; // Exemplo banner lazer

// --- NOVO: Importe as imagens para os PromotionCards AQUI ---
// SUBSTITUA 'promo-oferta.jpg' PELO NOME REAL DO ARQUIVO DA SUA IMAGEM DE PROMOÇÃO 1
import promoOfertaImg from '../assets/category-covers/infantil1.avif';
// SUBSTITUA 'promo-novidades.png' PELO NOME REAL DO ARQUIVO DA SUA IMAGEM DE PROMOÇÃO 2
import promoNovidadesImg from '../assets/category-covers/tguia.jpg';
// ------------------------------------------------------------------------------------------


// Estilo opcional para o wrapper da página, se necessário
const HomePageWrapper = styled.div`
  /* Pode adicionar estilos globais para a homepage aqui, se necessário */
  /* Exemplo: espaçamento entre seções */
  & > section, & > div { // Adiciona margem abaixo de cada seção direta filha
     margin-bottom: 60px; // Espaçamento padrão entre seções

     @media (max-width: 768px) {
         margin-bottom: 40px;
     }
  }
  /* Remove a margem do último elemento para não ter espaço extra antes do footer */
  & > *:last-child {
      margin-bottom: 0;
  }
`;

// HomePage recebe allLocais como prop do App.jsx
function HomePage({ allLocais = [] }) {

  // Filtra e seleciona locais da categoria "Lazer" para o carrossel (memoizado)
  const locaisDeLazer = useMemo(() => {
    if (!Array.isArray(allLocais)) return [];
    return allLocais
      .filter(local => local.categoria?.toLowerCase() === 'lazer') // Filtra por categoria 'lazer'
      .sort((a, b) => (b.estrelas || 0) - (a.estrelas || 0)) // Ordena por estrelas desc
      .slice(0, 10); // Pega os 10 melhores ou primeiros
  }, [allLocais]);

  // Você pode criar filtros semelhantes para outras categorias se precisar para outros componentes

  return (
    // Envolve o conteúdo em um Wrapper se precisar de estilos gerais para a página
    <HomePageWrapper>
      {/* 1. Seção Hero Principal */}
      <HeroCard />

      {/* 2. Carrossel de Locais de Lazer em Destaque */}
      {/* Renderiza apenas se houver locais de lazer */}
      {locaisDeLazer.length > 0 && (
        <FeaturedLocalsCarousel
          title="Tenha os Melhores Momentos de Lazer"
          subtitle="Explore resorts, hotéis e atrações incríveis selecionados para você."
          locais={locaisDeLazer} // Passa os locais de lazer filtrados
        />
      )}

      {/* 3. Banner de Destaque para Alimentação */}
      <CategoryHighlightBanner
        icon={IoRestaurantOutline} // Ícone para alimentação
        title="Está com Fome?"
        description="Venha conhecer os melhores restaurantes mais perto de si. Sabores incríveis esperam por você!"
        buttonText="Descobrir Restaurantes" // Texto mais chamativo
        buttonLink="/alimentacao" // Link correto para a categoria
        imageUrl={alimentacaoBannerImg} // Imagem específica (importada)
        highlightColor="#E64A19" // Cor Laranja (Exemplo)
        hoverBgColor="#BF360C" // Laranja mais escuro (Exemplo)
      />

       {/* 4. Card Promocional: Oferta Imperdível! */}
       <PromotionCard
  imageUrl={promoOfertaImg}
  title="Procurando lugares divertidos para as crianças?"
  description="Descubra lugares incríveis e tenha momentos de diversão com toda família!"
  buttonText="Veja aqui!"
  buttonLink="/infantil"
/>


      {/* 5. Seção "Sobre Nós" adaptada para Categorias */}
      <AboutSection />

      {/* 6. Banner de Destaque para Lazer (Exemplo de como reutilizar) */}
      {/* Você pode ter múltiplos banners destacando categorias diferentes */}
       <CategoryHighlightBanner
        icon={IoGameControllerOutline} // Ícone para Lazer
        title="Diversão Garantida!"
        description="Encontre parques, cinemas, hotéis e muito mais para relaxar e se divertir."
        buttonText="Explorar Lazer"
        buttonLink="/lazer" // Link para a categoria Lazer
        imageUrl={lazerBannerImg} // Imagem específica (importada)
        highlightColor="#0D47A1" // Cor Azul (Exemplo)
        hoverBgColor="#0B3A80" // Azul mais escuro (Exemplo)
      />

       {/* 7. Card Promocional: Fique por Dentro das Novidades */}
       <PromotionCard
  imageUrl={promoNovidadesImg}
  title="Fique por Dentro das Novidades"
  description="Nos siga no Instagram para acompanhar tudo em primeira mão."
  buttonText="Confira as Novidades"
  buttonLink="https://www.instagram.com/grupo_tguia/"
/>


    </HomePageWrapper>
  );
}

export default HomePage;