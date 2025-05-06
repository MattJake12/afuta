// src/components/DetailPageComponents/LocalFeaturesSection.jsx
import React from 'react';
import styled from 'styled-components';
import { FaCheckCircle } from 'react-icons/fa'; // Ícone de exemplo

// Paleta de cores (pode importar de um tema compartilhado)
const colors = {
  textPrimary: '#1c1c1c',
  textSecondary: '#555',
  iconColor: '#d4af37', // Cor para o ícone de recurso
  borderLight: '#eee',
  backgroundLight: '#ffffff', // Fundo branco ou sutil
};

const FeaturesWrapper = styled.section`
  margin-bottom: 30px;
  background-color: ${colors.backgroundLight};
  border-radius: 12px;
  padding: 20px;
  border: 1px solid ${colors.borderLight};
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin-bottom: 15px; // Mais espaço abaixo do título
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  column-count: 2; // Divide em duas colunas se houver espaço
  column-gap: 20px;

  @media (max-width: 500px) {
    column-count: 1; // Uma coluna em telas muito pequenas
  }
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  color: ${colors.textSecondary};
  margin-bottom: 10px; // Espaço entre itens
  break-inside: avoid-column; // Tenta evitar que itens quebrem entre colunas

  svg {
    color: ${colors.iconColor};
    flex-shrink: 0;
    font-size: 1.1em; // Ícone um pouco maior
  }
`;

function LocalFeaturesSection({ recursos = [] }) { // Default para array vazio
  if (!recursos || recursos.length === 0) {
    return null; // Não renderiza a seção se não houver recursos
  }

  return (
    <FeaturesWrapper>
      <SectionTitle>Recursos e Comodidades</SectionTitle>
      <FeaturesList>
        {recursos.map((recurso, index) => (
          <FeatureItem key={index}>
            <FaCheckCircle /> {/* Ou outro ícone de sua preferência */}
            {recurso}
          </FeatureItem>
        ))}
      </FeaturesList>
    </FeaturesWrapper>
  );
}

export default LocalFeaturesSection;