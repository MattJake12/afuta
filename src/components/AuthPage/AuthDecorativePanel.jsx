// src/components/AuthPage/AuthDecorativePanel.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
// import { FiZap } from 'react-icons/fi'; // Exemplo de ícone minimalista para logo, se usar
// Ou use seu SVG de logo aqui

// Cores são passadas via props (`panelBg`, `textColor`, `accentColor`)

const PanelWrapper = styled(motion.div)`
  flex-basis: 40%; // Um pouco menor
  min-width: 400px; // Para não esmagar em telas médias
  background: ${({ panelBg }) => panelBg || '#0A0A0A'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px;
  color: ${({ textColor }) => textColor || '#FFFFFF'};
  text-align: center;
  position: relative; // Para elementos abstratos futuros ou overlays

  // Remover o ::before do círculo antigo

  @media (max-width: 900px) {
    display: none;
  }
`;

const LogoContainer = styled(motion.div)`
  display: flex;
  flex-direction: column; // Logo e texto um abaixo do outro
  align-items: center;
  margin-bottom: 35px; // Mais espaço
`;

const LogoGraphic = styled(motion.div)`
  font-size: 3.5rem; // Se usar um ícone como logo
  color: ${({ accentColor }) => accentColor || '#CCCCCC'};
  margin-bottom: 10px;
  // Exemplo: se for uma imagem SVG
  // img { width: 80px; height: auto; }
`;

const LogoText = styled(motion.h1)`
  font-family: 'Montserrat', sans-serif; // Manter consistência com header
  font-size: 3rem; // Ajustar conforme o design do seu logo
  font-weight: 900;
  letter-spacing: -2px;
  color: ${({ textColor }) => textColor || '#FFFFFF'};
`;

const WelcomeText = styled(motion.h2)`
  font-family: 'Poppins', sans-serif; // Fonte elegante para títulos
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 15px;
  line-height: 1.3;
  max-width: 400px;
  color: ${({ textColor }) => textColor || '#FFFFFF'};
`;

const SubText = styled(motion.p)`
  font-family: 'Roboto', sans-serif; // Fonte limpa para corpo de texto
  font-size: 1rem;
  font-weight: 300; // Mais leve
  max-width: 380px;
  line-height: 1.6;
  color: ${({ textColor, accentColor }) => accentColor || '#CCCCCC'}; // Usar accentColor para subtexto mais claro
  opacity: 0.9;
`;

// Animações
const panelVariants = {
    initial: { x: '-100%', opacity: 0.5 },
    animate: { x: '0%', opacity: 1, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.1 } } // Ease mais suave
};

const itemVariants = (delay = 0) => ({
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut", delay: 0.4 + delay } } // Adiciona delay base
});


function AuthDecorativePanel({ logoText, welcomeText, subText, panelBg, textColor, accentColor }) {
  return (
    <PanelWrapper
        variants={panelVariants}
        panelBg={panelBg}
        textColor={textColor}
        accentColor={accentColor}
    >
      <LogoContainer variants={itemVariants(0)}>
        {/* <LogoGraphic variants={itemVariants(0.1)} accentColor={accentColor}>
          <FiZap /> Ou <img src="/path/to/your/logo-icon-silver.svg" alt="Logo Icon" />
        </LogoGraphic> */}
        <LogoText variants={itemVariants(0.1)} textColor={textColor}>{logoText}</LogoText>
      </LogoContainer>
      <WelcomeText variants={itemVariants(0.2)} textColor={textColor}>
        {welcomeText}
      </WelcomeText>
      <SubText variants={itemVariants(0.3)} textColor={textColor} accentColor={accentColor}>
        {subText}
      </SubText>
    </PanelWrapper>
  );
}

export default AuthDecorativePanel;