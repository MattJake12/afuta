// src/components/ScrollCard.jsx
import React from 'react';
import styled from 'styled-components'; // Mantém styled-components
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Importar Link

// --- Styled Components (ESTILOS REVERTIDOS PARA O ORIGINAL) ---

const CardImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1); /* Transição original */
  z-index: 0; 
`;

const CardText = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem; /* Padding original */
  z-index: 2; 
  color: #fff;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1); /* Transição original */
`;

const CardTitle = styled.h3`
  font-size: 1.4rem; /* Tamanho original */
  font-weight: 700; /* Peso original */
  margin-bottom: 0.3rem; /* Margem original */
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5); /* Sombra original */
  line-height: 1.3;
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1); /* Transição original */
`;

const CardDescription = styled.p`
  font-size: 0.95rem; /* Tamanho original */
  color: #e0e0e0; /* Cor original */
  line-height: 1.5; /* Altura de linha original */
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5); /* Sombra original */
  opacity: 0;
  transform: translateY(10px); 
  max-height: 0; 
  overflow: hidden;
  transition: opacity 0.4s ease-out 0.1s, 
              transform 0.4s ease-out 0.1s,
              max-height 0.5s ease-in-out; /* Transições originais */
`;

// Container é um Link, mas mantém os estilos originais
const CardContainer = styled(motion(Link))`
  position: relative;
  display: block; // Para Link se comportar como bloco
  text-decoration: none; // Remove sublinhado do link
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '300px'};
  border-radius: 1rem; /* Raio original */
  overflow: hidden;
  background-color: #1a1a1a; /* Fundo original */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2); /* Sombra original */
  cursor: pointer;
  
  /* Overlay Gradiente Original */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0) 70%); /* Gradiente original */
    z-index: 1;
  }

  /* Estilos HOVER Originais */
  &:hover {
    ${CardImage} {
      transform: scale(1.05); /* Zoom original */
    }

    ${CardDescription} {
      opacity: 1; /* Torna a descrição visível */
      transform: translateY(0); /* Move para a posição final */
      max-height: 100px; /* Altura máxima original */
    }
  }

  /* Aplica estilos inline passados pela prop 'style' */
  ${({ style }) => style}
`;


// --- Componente React Funcional ---
// Recebe linkTo, usa o 'to' do Link
function ScrollCard({ title, description, height, width, imageUrl, style, linkTo }) {
  return (
    <CardContainer
      to={linkTo || '#'} // Usa o linkTo passado como destino do Link
      // Animações Framer Motion originais
      whileHover={{ scale: 1.03 }} 
      whileTap={{ scale: 0.99 }} 
      height={height}
      width={width}
      style={style}
    >
      <CardImage src={imageUrl} alt={title} loading="lazy" />
      <CardText>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardText>
    </CardContainer>
  );
}

export default ScrollCard;