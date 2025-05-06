// src/components/HomePage/AboutSection.jsx
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

import ScrollCard from '../../../src/components/ScrollCard'; // Ajuste o caminho se necessário
import StickyContent from '../../../src/components/StickyContent'; // Ajuste o caminho se necessário

// --- IMPORTAR IMAGENS PARA AS CATEGORIAS ---
// Substitua pelos caminhos reais das suas imagens representativas
import imagemLazer from '../../assets/category-covers/leisure.jpg'; // Exemplo
import imagemPets from '../../assets/category-covers/pets2.jpg';   // Exemplo
import imagemAlimentacao from '../../assets/category-covers/comida1.png'; // Exemplo
import imagemInfantil from '../../assets/category-covers/Infantil.jpg'; // Exemplo
// ------------------------------------------

const breakpoints = { mobile: '768px' };

const AboutWrapper = styled.section`
  background-color: #000; // Fundo escuro mantido
  color: #fff;
  padding: 5rem 2.5rem;
  @media (max-width: ${breakpoints.mobile}) { padding: 3.75rem 1rem; }
`;

const SectionTitleContainer = styled.div`
  max-width: 1320px; margin: 0 auto 2.5rem auto; text-align: center;
  @media (max-width: ${breakpoints.mobile}) { margin-bottom: 2rem; }
`;

const SectionLabel = styled.span`
  display: inline-block; background-color: #222; color: #ccc;
  padding: 0.4rem 0.9rem; border-radius: 24px; font-size: 0.85rem;
  text-transform: uppercase; margin-bottom: 1.8rem; border: 1px solid #333;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const MainTitle = styled.h1` // Título Principal Atualizado
  font-family: 'Poppins', sans-serif; font-size: 3.5rem; font-weight: 700;
  line-height: 1.2; color: #fff; text-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
  @media (max-width: ${breakpoints.mobile}) { font-size: 2.5rem; }
`;

const SectionContainer = styled.div`
  display: flex; align-items: flex-start; max-width: 1320px; margin: 0 auto; gap: 2.5rem;
  @media (max-width: ${breakpoints.mobile}) { flex-direction: column; gap: 0; }
`;

const CardsContainer = styled.div`
  flex: 1.5; display: grid;
  /* Mantém 2 colunas por padrão, ajustável */
  grid-template-columns: repeat(2, 1fr); 
  grid-gap: 1.5rem;
  @media (max-width: ${breakpoints.mobile}) {
    flex: none; width: 100%; grid-template-columns: 1fr; grid-gap: 1rem; order: 2;
  }
  /* Remover a classe 'wide', não precisamos mais dela aqui */
`;

const CardWrapper = styled.div`
  /* Remover estilos da classe 'wide' se houver */
`;

function AboutSection() {
  const navigate = useNavigate(); // Hook para navegação

  // --- DADOS DOS CARDS ATUALIZADOS PARA CATEGORIAS ---
  const categoryCardsData = [
    {
      categorySlug: "lazer", // ID/Slug para a URL
      imageUrl: imagemLazer,
      title: "Lazer",
      description: "Hotéis, resorts, parques e diversão para todos os gostos.", // Descrição da categoria
      height: "350px", // Ajuste altura se necessário
      width: "100%",
    },
    {
      categorySlug: "pets",
      imageUrl: imagemPets,
      title: "Pets",
      description: "Pet shops, clínicas veterinárias e locais pet-friendly.",
      height: "300px",
    },
    {
      categorySlug: "alimentacao",
      imageUrl: imagemAlimentacao,
      title: "Alimentação",
      description: "Restaurantes, cafés, bares e experiências gastronômicas.",
      height: "300px",
    },
    {
      categorySlug: "infantil",
      imageUrl: imagemInfantil,
      title: "Infantil",
      description: "Atividades, parques, lojas e serviços para os pequenos.",
      height: "350px",
      // style: { marginTop: '-11%' }, // Remover ou ajustar estilo de posicionamento se não for mais necessário
    },
  ];
  // --------------------------------------------------

  // Função para navegar para a página da categoria
  const handleCardClick = (categorySlug) => {
    navigate(`/${categorySlug}`); // Navega para /lazer, /pets, etc.
  };

  return (
    <AboutWrapper>
      <SectionTitleContainer>
        <SectionLabel>Explore Categorias</SectionLabel> {/* Label Atualizado */}
        <MainTitle>TGUIA | Lazer e Entretenimento</MainTitle> {/* Título Atualizado */}
      </SectionTitleContainer>

      <SectionContainer>
        <CardsContainer>
          {categoryCardsData.map((card, index) => (
            <CardWrapper key={index}>
              {/* Passa a função de clique e o slug da categoria */}
              <ScrollCard
                imageUrl={card.imageUrl}
                title={card.title}
                description={card.description}
                height={card.height}
                width={card.width}
                style={card.style || {}} // Passa style se existir
                // Adiciona onClick para o card inteiro (será tratado dentro de ScrollCard)
                onClick={() => handleCardClick(card.categorySlug)}
                // Adiciona prop para o link (será usado no ScrollCard modificado)
                linkTo={`/${card.categorySlug}`}
              />
            </CardWrapper>
          ))}
        </CardsContainer>
        {/* O StickyContent foi atualizado abaixo para refletir a nova mensagem */}
        <StickyContent
            title="Descubra Lugares Incríveis!" // Novo título
            subtitle="🧭 Perto de si!" // Novo subtítulo
            description="📍Transformamos a sua busca por diversão, gastronomia e bem-estar em uma experiência fácil e inspiradora, com opções cuidadosamente selecionadas para tornar cada momento mais prazeroso e especial." // Novo texto
        />
      </SectionContainer>
    </AboutWrapper>
  );
}

export default AboutSection;