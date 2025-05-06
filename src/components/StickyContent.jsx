// src/components/StickyContent.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// ... (Styled Components: StickyContainer, Title, Subtitle, Description - sem mudanças nos estilos)
const StickyContainer = styled.div`
  position: sticky; top: 100px; align-self: flex-start; flex: 1;
  height: fit-content; background-color: #000; padding: 3rem 2rem 3rem 3rem;
  margin-left: auto;
  @media (max-width: 768px) { position: static; height: auto; padding: 1.5rem; }
`;
const Title = styled(motion.h2)`
  font-size: 2.8rem; font-weight: 700; line-height: 1.3; margin-bottom: 1.5rem; // Ajuste margem
  color: #fff; text-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
  @media (max-width: 768px) { font-size: 2.2rem; margin-bottom: 1rem; }
`;
const Subtitle = styled.h3`
  font-size: 1.7rem; font-weight: 600; margin-bottom: 1.2rem; color: #ccc;
  @media (max-width: 768px) { font-size: 1.5rem; }
`;
const Description = styled.p`
  color: #bbb; line-height: 1.8; font-size: 1.05rem; max-width: 520px;
  /* text-align: justify; text-justify: inter-word; */ // Removido justify para alinhamento padrão
  margin-bottom: 1.5rem;
  strong { color: #fff; }
  @media (max-width: 768px) { font-size: 1rem; }
`;

function StickyContent({ title, subtitle, description }) { // Recebe props
  return (
    <StickyContainer>
      <Title
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Usa título da prop */}
        {title || "Descubra Lugares Incríveis!"}
      </Title>
      {/* Usa subtítulo da prop */}
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      {/* Usa descrição da prop */}
      <Description>
        {description || " Transformamos a sua busca por diversão, gastronomia e bem-estar em uma experiência fácil e inspiradora, com opções cuidadosamente selecionadas para tornar cada momento mais prazeroso e especial.."}
      </Description>
      {/* Pode adicionar mais conteúdo aqui se necessário */}
    </StickyContainer>
  );
}

export default StickyContent;