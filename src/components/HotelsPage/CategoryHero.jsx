// src/components/ListPageComponents/CategoryHero.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Importe a imagem padrão ou imagens específicas aqui, se desejar.
// Para este exemplo, vamos assumir que a imagem é passada como prop.

// Paleta (pode vir de um tema global)
const colors = {
    white: '#ffffff',
    lightGrey: '#f0f0f0', // Para fallback de fundo
};

// Styled Components adaptados do HotelFilterBar
const HeroWrapper = styled(motion.div)`
  position: relative;
  /* Ocupa largura total do container pai */
  margin: 0 auto 40px auto; /* Remove margem lateral, mantém inferior */
  border-radius: 0; // Sem bordas arredondadas para full-width feel
  overflow: hidden;
  min-height: 280px; // Altura base do Hero
  background-color: ${colors.lightGrey}; // Cor caso a imagem não carregue
  display: flex; // Necessário para o overlay funcionar corretamente

  /* Imagem de fundo passada via prop $backgroundImage */
  background-image: url(${props => props.$backgroundImage});
  background-size: cover;
  background-position: center center; // Centraliza a imagem

  @media (max-width: 992px) { min-height: 260px; }
  @media (max-width: 768px) { min-height: 220px; margin-bottom: 30px; }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0; /* Cobre todo o wrapper */
  /* Gradiente sutil para escurecer a imagem e melhorar legibilidade do texto */
  background: linear-gradient(180deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.5) 100%);
  display: flex;
  flex-direction: column;
  justify-content: center; // Centraliza verticalmente
  align-items: center; // Centraliza horizontalmente
  padding: 30px 20px;
  text-align: center;
  z-index: 1; // Garante que fique sobre a imagem mas abaixo de conteúdo absoluto (se houver)
`;

const ContentContainer = styled(motion.div)`
    position: relative; // Garante que o z-index funcione
    z-index: 2; // Conteúdo fica acima do overlay
    color: ${colors.white};
    max-width: 950px;
    width: 100%;
`;

const Title = styled(motion.h1)`
  font-family: 'Poppins', sans-serif;
  font-size: clamp(2.2rem, 6vw, 3.2rem); // Tamanho responsivo
  font-weight: 700;
  color: ${colors.white};
  margin: 0; // Remove margem padrão do h1
  line-height: 1.2;
  text-shadow: 0 3px 10px rgba(0, 0, 0, 0.7); // Sombra mais pronunciada
`;

// Animações (opcional, pode simplificar ou remover)
const heroVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};
const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2, ease: "easeOut" } },
};

function CategoryHero({ title, backgroundImage }) {
  // Fallback caso nenhuma imagem seja passada
  const finalBackgroundImage = backgroundImage || 'https://via.placeholder.com/1200x300/cccccc/808080?text=Categoria';

  return (
    // Passa a prop de imagem com '$' para styled-components
    <HeroWrapper
        $backgroundImage={finalBackgroundImage}
        variants={heroVariants}
        initial="hidden"
        animate="visible"
    >
      <Overlay>
        <ContentContainer variants={contentVariants}>
          <Title>{title}</Title>
          {/* Removido container de filtros */}
        </ContentContainer>
      </Overlay>
    </HeroWrapper>
  );
}

export default CategoryHero;