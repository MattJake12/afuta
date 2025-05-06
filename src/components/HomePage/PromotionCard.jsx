import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// --- Breakpoints ---
const breakpoints = {
  tablet: '992px',
  mobile: '768px',
};

// --- Styled Components ---

const PromotionWrapper = styled(motion.div)`
  max-width: 1320px;
  margin: 60px auto; // Espaçamento consistente
  padding: 25px; // Padding interno
  background-color: #f8f8f7; // Cor de fundo off-white/bege claro
  border-radius: 20px; // Bordas arredondadas
  display: flex;
  align-items: center; // Alinha itens verticalmente
  gap: 30px; // Espaço entre imagem e conteúdo

  @media (max-width: ${breakpoints.tablet}) {
    margin: 50px 15px;
    padding: 20px;
    gap: 20px;
  }
    @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column; // Empilha no mobile
    align-items: stretch; // Estica os itens
    padding: 15px;
    gap: 15px;
  }
`;

// Container para a imagem, aplicando a rotação
const ImageContainer = styled.div`
  width: 220px; // Largura fixa para a imagem
  height: 150px; // Altura fixa
  flex-shrink: 0; // Impede que encolha
  border-radius: 16px; // Bordas arredondadas da imagem
  overflow: hidden; // Garante que a imagem não vaze
  transform: rotate(-4deg); // Leve rotação anti-horária
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-out;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover; // Garante que a imagem cubra o espaço
  }

  &:hover {
     transform: rotate(-2deg) scale(1.03); // Suaviza a rotação e aumenta no hover
  }

  @media (max-width: ${breakpoints.tablet}) {
    width: 180px;
    height: 120px;
  }
   @media (max-width: ${breakpoints.mobile}) {
    width: 100%; // Largura total no mobile
    height: 180px; // Ajusta altura no mobile
    transform: rotate(0deg); // Remove rotação no mobile
    margin-bottom: 10px; // Espaço abaixo da imagem quando empilhado

     &:hover {
       transform: scale(1.02); // Apenas escala no mobile
     }
  }
`;

// Container para o conteúdo textual
const ContentContainer = styled.div`
  flex: 1; // Ocupa o espaço restante
  display: flex;
  flex-direction: column;
  align-items: flex-start; // Alinha itens à esquerda

  @media (max-width: ${breakpoints.mobile}) {
    align-items: center; // Centraliza no mobile
    text-align: center;
  }
`;

// Tag "Sponsored by"
const SponsoredTag = styled.span`
  display: inline-block;
  background-color: #ebebeb; // Cinza claro
  color: #555;
  font-size: 12px;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 6px;
  margin-bottom: 12px;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 11px;
    margin-bottom: 8px;
  }
`;

// Título da Promoção
const PromoTitle = styled.h3`
  font-size: 26px;
  font-weight: 700;
  color: #1c1c1c;
  margin-bottom: 8px;
  line-height: 1.3;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 22px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 20px;
  }
`;

// Descrição da Promoção
const PromoDescription = styled.p`
  font-size: 16px;
  color: #555;
  line-height: 1.5;
  margin-bottom: 15px; // Espaço antes do botão (se estiver no mesmo container)

   @media (max-width: ${breakpoints.mobile}) {
    font-size: 15px;
    margin-bottom: 20px; // Mais espaço antes do botão no mobile
  }
`;

// Botão de Exploração (estilo outline)
const ExploreButton = styled.button`
  background-color: transparent;
  color: #1c1c1c;
  border: 1.5px solid #aeaeae; // Borda cinza
  font-weight: 600;
  font-size: 15px;
  padding: 10px 25px;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.2s ease-out;
  margin-left: auto; // Empurra o botão para a direita
  white-space: nowrap;

  &:hover {
    background-color: #1c1c1c;
    color: white;
    border-color: #1c1c1c;
  }

  @media (max-width: ${breakpoints.mobile}) {
     margin-left: 0; // Remove margem automática no mobile
     align-self: center; // Centraliza o botão
     padding: 12px 30px; // Aumenta um pouco o padding no mobile
  }
`;

// --- Variantes de Animação ---
const cardAppearVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
    }
};

// --- Componente Funcional ---
// Aceita props para tornar reutilizável, com valores padrão
export default function PromotionCard({
    imageUrl = "https://images.unsplash.com/photo-1600518464441-9154a4dea22c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Imagem padrão
    sponsor = "!TGUIA Tourism",
    title = "Descubra !TGUIA City",
    description = "Veja porque viajantes como você estão adorando esta cidade vibrante.",
    buttonText = "Explore agora",
    buttonLink = "#", // Link do botão
}) {
  return (
    <PromotionWrapper
      variants={cardAppearVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} // Anima quando 20% está visível
    >
      <ImageContainer>
        <img src={imageUrl} alt={title} />
      </ImageContainer>

      <ContentContainer>
        {sponsor && <SponsoredTag>Patrocinado por {sponsor}</SponsoredTag>}
        <PromoTitle>{title}</PromoTitle>
        <PromoDescription>{description}</PromoDescription>
      </ContentContainer>

      {/* Botão fica fora do ContentContainer para usar margin-left: auto */}
      <ExploreButton onClick={() => window.location.href = buttonLink}>
        {buttonText}
      </ExploreButton>
    </PromotionWrapper>
  );
}