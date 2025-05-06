// src/components/HotelDescriptionSection.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';


const DescriptionWrapper = styled.section`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1c1c1c;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;

const DescriptionContent = styled(motion.div)`
  color: #333;
  font-size: 0.95rem;
  line-height: 1.7;
  white-space: pre-line; // Preserva quebras de linha do texto original
  overflow: hidden; // Necessário para animar max-height
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color:rgb(0, 0, 0); // Verde TripAdvisor
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  padding: 8px 0; // Aumenta área de clique
  margin-top: 10px;
  display: inline-flex;
  align-items: center;
  gap: 4px;

  &:hover {
    color:rgb(0, 0, 0); // Verde mais escuro
  }

  svg {
      transition: transform 0.2s ease-out;
  }
`;

// Calcula uma altura aproximada para as primeiras linhas
const collapsedHeight = '7em'; // Ajuste conforme necessário (aprox. 4-5 linhas)

function HotelDescriptionSection({ description }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Verifica se a descrição é longa o suficiente para precisar de "Mostrar mais"
  // (Isso é uma heurística, pode precisar de ajuste ou cálculo mais preciso)
  const needsTruncation = description && description.length > 350; // Ajuste o número de caracteres

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <DescriptionWrapper>
      <SectionTitle>Sobre</SectionTitle>
      <AnimatePresence initial={false}>
        <DescriptionContent
            initial={false} // Não anima na montagem inicial
            animate={{ maxHeight: isExpanded || !needsTruncation ? '2000px' : collapsedHeight }} // Anima altura
            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }} // Cubic bezier para ease suave
        >
          {description || "Nenhuma descrição disponível."}
        </DescriptionContent>
      </AnimatePresence>

      {needsTruncation && (
        <ToggleButton onClick={toggleExpand} aria-expanded={isExpanded}>
          {isExpanded ? 'Mostrar menos' : 'Mostrar mais'}
          {isExpanded ? <IoChevronUp /> : <IoChevronDown />}
        </ToggleButton>
      )}
    </DescriptionWrapper>
  );
}

export default HotelDescriptionSection;