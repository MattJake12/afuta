// src/components/HomePage/CategoryHighlightBanner.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { IoRestaurantOutline } from 'react-icons/io5'; // Ícone de exemplo para Alimentação
import { useNavigate } from 'react-router-dom'; // Para navegação no botão

// --- Paleta de Cores (Mantida, pode ajustar) ---
const colors = {
  background: '#f8f9fa', // Fundo um pouco diferente, mais neutro
  textPrimary: '#212529', // Texto principal mais escuro
  textSecondary: '#6c757d', // Texto secundário cinza
  highlightColor: '#E64A19', // Cor de destaque (ex: Laranja para Alimentação)
  black: '#121212',
  white: '#ffffff',
};

// --- Breakpoints (Mantidos) ---
const breakpoints = { desktop: '1024px', mobile: '768px' };

// --- Styled Components (Ajustes para generalizar) ---
const BannerWrapper = styled(motion.section)`
  background-color: ${colors.background};
  padding: 5rem 2rem;
  margin: 80px auto;
  max-width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 420px; // Altura um pouco menor

  @media (max-width: ${breakpoints.desktop}) { padding: 4rem 1.5rem; min-height: 380px; }
  @media (max-width: ${breakpoints.mobile}) { padding: 3rem 1rem; min-height: auto; flex-direction: column; text-align: center; }
`;

const ContentContainer = styled(motion.div)`
  max-width: 1320px; width: 100%; display: flex; align-items: center;
  justify-content: space-between; gap: 3rem; position: relative; z-index: 2;
  @media (max-width: ${breakpoints.mobile}) { flex-direction: column-reverse; justify-content: center; gap: 2rem; }
`;

const TextContent = styled(motion.div)`
  flex: 1; max-width: 550px; // Um pouco mais de espaço para texto
  @media (max-width: ${breakpoints.desktop}) { max-width: 48%; }
  @media (max-width: ${breakpoints.mobile}) {
    max-width: 100%; display: flex; flex-direction: column; align-items: center;
  }
`;

// Ícone da Categoria (Substitui AwardBadge)
const CategoryIconBadge = styled(motion.div)`
  display: inline-flex; align-items: center; justify-content: center;
  /* Cor de fundo baseada na cor de destaque */
  background-color: ${props => props.$highlightColor || colors.highlightColor}20; /* Fundo com opacidade */
  color: ${props => props.$highlightColor || colors.highlightColor}; /* Cor do ícone */
  border: 1.5px solid ${props => props.$highlightColor || colors.highlightColor}50; /* Borda com opacidade */
  border-radius: 50%; width: 60px; height: 60px; margin-bottom: 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  svg { font-size: 28px; }

  @media (max-width: ${breakpoints.mobile}) {
    width: 50px; height: 50px; margin-bottom: 1rem;
    svg { font-size: 24px; }
  }
`;

const HighlightTitle = styled(motion.h2)` // Renomeado de AwardTitle
  font-family: 'Poppins', sans-serif;
  font-size: clamp(2.2rem, 5vw, 2.8rem); // Ajuste de tamanho
  font-weight: 700; color: ${colors.textPrimary}; line-height: 1.25;
  margin-bottom: 1rem;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const HighlightDescription = styled(motion.p)` // Renomeado de AwardDescription
  font-family: 'Inter', sans-serif;
  font-size: clamp(1rem, 2.5vw, 1.05rem); // Ajuste de tamanho
  color: ${colors.textSecondary}; line-height: 1.7;
  margin-bottom: 2rem; max-width: 500px;
  @media (max-width: ${breakpoints.mobile}) { font-size: 0.95rem; margin-bottom: 1.5rem; max-width: 95%; }
`;

const ActionButton = styled(motion.button)` // Renomeado de SeeWinnersButton
  /* Cor de fundo e texto baseados na cor de destaque */
  background-color: ${props => props.$highlightColor || colors.highlightColor};
  color: ${colors.white};
  font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 1rem;
  padding: 14px 32px; border: none; /* Removida borda inicial */
  border-radius: 30px; cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 12px ${props => props.$highlightColor || colors.highlightColor}40; /* Sombra da cor */

  &:hover {
    background-color: ${props => props.$hoverBgColor || colors.black}; /* Cor de hover customizável ou padrão */
    color: ${colors.white};
    transform: translateY(-3px);
    box-shadow: 0 8px 20px ${props => props.$highlightColor || colors.highlightColor}50;
  }
  &:active { transform: translateY(-1px); box-shadow: 0 4px 10px ${props => props.$highlightColor || colors.highlightColor}30; }
  @media (max-width: ${breakpoints.mobile}) { font-size: 0.9rem; padding: 12px 28px; }
`;

const ImageContainer = styled(motion.div)` // Estilo mantido, mas pode ser ajustado
  flex-shrink: 0; width: 50%; height: 450px; position: relative;
  align-self: stretch; clip-path: polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%); // Ajuste leve no clip-path
  border-radius: 10px;

  img { display: block; width: 100%; height: 100%; object-fit: cover; border-radius: 10px; }

  @media (max-width: ${breakpoints.desktop}) { width: 52%; height: 400px; }
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%; height: 280px; clip-path: none; // Remove clip-path no mobile
    order: -1; border-radius: 16px; margin-bottom: 1.5rem; // Adiciona margem
    img { border-radius: 16px; }
  }
`;

// Background Shapes podem ser removidos ou ajustados para combinar com a categoria
const BackgroundShape = styled(motion.div)`
  position: absolute; border-radius: 50%; z-index: 0; filter: blur(90px);
  opacity: 0.15; // Opacidade ajustada

  &.highlight-glow {
    background: ${props => props.$highlightColor || colors.highlightColor};
    width: 450px; height: 450px; top: -120px; right: 35%;
    @media (max-width: ${breakpoints.mobile}) { width: 300px; height: 300px; top: -80px; right: 5%; opacity: 0.1; }
  }
  &.secondary-glow {
    background: ${colors.textSecondary}; // Usar uma cor secundária
    width: 380px; height: 380px; bottom: -150px; left: 5%;
    @media (max-width: ${breakpoints.mobile}) { width: 250px; height: 250px; bottom: -100px; left: -5%; opacity: 0.08; }
  }
`;

// Animações (mantidas, podem ser ajustadas)
const bannerVariants = { /* ... */ };
const contentItemVariants = { /* ... */ };
const imageVariants = { /* ... */ };
const shapeVariants = { /* ... */ };

// --- Componente Funcional Adaptado ---
export default function CategoryHighlightBanner({
  icon: Icon = IoRestaurantOutline, // Ícone padrão (Alimentação), pode ser passado via prop
  title = "Está com Fome?", // Título padrão
  description = "Venha conhecer os melhores restaurantes mais perto de si. Sabores incríveis esperam por você!", // Descrição padrão
  buttonText = "Venha Conhecer", // Texto do botão padrão
  buttonLink = "/alimentacao", // Link padrão (para Alimentação)
  imageUrl, // Imagem de fundo é obrigatória ou terá placeholder
  highlightColor = '#E64A19', // Cor de destaque padrão (Laranja para Alimentação)
  hoverBgColor = '#D32F2F', // Cor hover do botão (Vermelho escuro)
}) {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (buttonLink) {
      navigate(buttonLink); // Usa navigate para navegação interna
    } else {
      console.warn("Link do botão não definido para CategoryHighlightBanner");
    }
  };

  // Imagem de fallback
  const finalImageUrl = imageUrl || `https://via.placeholder.com/600x450/${highlightColor.substring(1)}/ffffff?text=${encodeURIComponent(title)}`;

  return (
    <BannerWrapper
      variants={bannerVariants} initial="hidden"
      whileInView="visible" viewport={{ once: true, amount: 0.2 }}
    >
      {/* Passa a cor de destaque para as formas */}
      <BackgroundShape className="highlight-glow" variants={shapeVariants} $highlightColor={highlightColor} />
      <BackgroundShape className="secondary-glow" variants={shapeVariants} />

      <ContentContainer>
        <TextContent variants={contentItemVariants}>
          {/* Usa ícone e cor de destaque passados via props */}
          <CategoryIconBadge variants={contentItemVariants} $highlightColor={highlightColor}>
            <Icon />
          </CategoryIconBadge>
          <HighlightTitle variants={contentItemVariants}>
            {title} {/* Usa título da prop */}
          </HighlightTitle>
          <HighlightDescription variants={contentItemVariants}>
            {description} {/* Usa descrição da prop */}
          </HighlightDescription>
          <ActionButton
            variants={contentItemVariants}
            onClick={handleButtonClick}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            $highlightColor={highlightColor} // Passa cor para styled component
            $hoverBgColor={hoverBgColor}     // Passa cor hover
          >
            {buttonText} {/* Usa texto do botão da prop */}
          </ActionButton>
        </TextContent>

        <ImageContainer variants={imageVariants}>
          <img src={finalImageUrl} alt={title} />
        </ImageContainer>
      </ContentContainer>
    </BannerWrapper>
  );
}