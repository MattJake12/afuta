// src/components/DetailPageComponents/LocalCover.jsx
import React from 'react';
import styled, { keyframes } from 'styled-components'; // Importar keyframes se usar animações CSS
import { motion } from 'framer-motion';

// Definir cores (pode vir de um tema ou ser passado via props)
const colors = {
  white: '#FFFFFF',
  black: '#0A0A0A',
  primaryAccent: '#FF5722', // Exemplo de cor primária para elementos visuais
  secondaryAccent: '#2196F3', // Exemplo de cor secundária
  darkOverlay: 'rgba(0, 0, 0, 0.7)', // Gradiente mais escuro
  lightOverlay: 'rgba(0, 0, 0, 0.3)', // Gradiente mais claro
  subtleOverlay: 'rgba(0, 0, 0, 0.1)', // Quase transparente
};

// Opcional: Animação sutil para o elemento abstrato
const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.9;
  }
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
`;

const CoverWrapper = styled(motion.div)`
  height: 45vh;
  min-height: 300px;
  max-height: 600px; /* Ajustando max-height para um valor mais razoável */
  position: relative;
  background-size: cover;
  background-position: center center;
  background-image: url(${props => props.$backgroundImage});
  color: ${colors.white};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  text-align: center;
  padding: 40px 20px;
  margin-bottom: 30px;
  border-radius: 0 0 12px 12px;
  overflow: hidden;

  /* Camada 1: Gradiente Escuro para Legibilidade */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top, ${colors.darkOverlay} 0%, ${colors.lightOverlay} 50%, ${colors.subtleOverlay} 100%);
    z-index: 1; /* Abaixo dos elementos abstratos e texto */
  }
`;

// Camada 2: Elemento Visual Abstrato (Exemplo: um gradiente angular ou forma)
const AbstractVisualElement = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%; /* Pode cobrir toda a altura ou só uma parte */
  /* Exemplo 1: Gradiente Angular */
   background: conic-gradient(from 270deg at 50% 100%, ${colors.primaryAccent} 0%, transparent 40%, transparent 60%, ${colors.secondaryAccent} 100%);
  /* Opção 2: Forma de Onda ou Diagonal (mais complexo, pode usar SVG ou clip-path)
     Para simplicidade, vamos usar um gradiente angular ou radial semi-transparente */
  /* Exemplo 3: Gradiente Radial */
  // background: radial-gradient(ellipse at bottom, ${colors.primaryAccent} 0%, transparent 60%);

  opacity: 0.6; /* Semi-transparente */
  z-index: 1.5; /* Entre o gradiente de legibilidade e o conteúdo */
  mix-blend-mode: screen; /* Experimente blend modes para efeitos interessantes */
  pointer-events: none; /* Garante que não interfira com interações */

  /* Opcional: Aplica a animação CSS */
  // animation: ${pulse} 4s ease-in-out infinite;

   /* Ajustes de posicionamento/tamanho responsivos, se o elemento tiver forma fixa */
   @media (max-width: 768px) {
      /* Ajustes aqui se necessário */
   }
`;


const CoverContent = styled(motion.div)`
  position: relative;
  z-index: 2; /* Acima de todos os elementos visuais */
  max-width: 800px;
  padding-bottom: 20px; /* Ajuste o padding para não colar na borda */
`;

const CategoryName = styled.p`
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 8px;
  opacity: 0.9;
  /* Efeitos de badge/tag modernos */
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px); /* Efeito de vidro fosco opcional */
  padding: 4px 12px;
  border-radius: 20px;
  display: inline-block;
`;

const LocalName = styled.h1`
  font-size: 3.2rem; /* Aumentado ligeiramente */
  font-weight: 800; /* Mais bold */
  line-height: 1.1;
  margin-bottom: 0;
  text-shadow: 1px 1px 6px rgba(0,0,0,0.6); /* Sombra sutil */

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const coverVariants = {
  hidden: { opacity: 0 }, // Começa totalmente transparente
  visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }, // Fade in mais suave
};

const abstractVariants = {
  hidden: { opacity: 0, scale: 0.9 }, // Começa menor e transparente
  visible: { opacity: 0.6, scale: 1, transition: { duration: 1.2, delay: 0.2, ease: "easeOut" } }, // Revela e escala suavemente
};

const contentVariants = {
  hidden: { opacity: 0, y: 30 }, // Começa abaixo e transparente
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.5, ease: "easeOut" } }, // Desliza para cima e fade in
};


function LocalCover({ backgroundImage, localName, categoryName, accentColor }) {
  // Pode usar a prop accentColor para personalizar AbstractVisualElement
  // Ex: style={{ background: `conic-gradient(...)`, opacity: ... }}

  const defaultImage = "https://via.placeholder.com/1200x400/cccccc/808080?text=Local+Sem+Imagem";
  const imageToUse = backgroundImage || defaultImage;

  return (
    <CoverWrapper
      $backgroundImage={imageToUse}
      variants={coverVariants}
      initial="hidden"
      animate="visible"
      exit="hidden" // Importante para animações de saída se a rota mudar
    >
      {/* Elemento visual abstrato animado */}
      <AbstractVisualElement
        variants={abstractVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      />

      {/* Conteúdo (Texto) animado */}
      <CoverContent variants={contentVariants}>
        {categoryName && <CategoryName>{categoryName}</CategoryName>}
        {localName && <LocalName>{localName}</LocalName>}
      </CoverContent>
    </CoverWrapper>
  );
}

export default LocalCover;