// src/components/HeroCard.jsx
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { IoSparkles } from 'react-icons/io5';
import bgImage from '../../assets/category-covers/lazer3.jpg'; // <-- Sua imagem local

// --- Keyframes (opcional, para brilhos sutis) ---
const subtleShine = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

// --- Breakpoints ---
const breakpoints = {
  tablet: '992px',
  mobile: '768px',
};

// --- Paleta de Cores Sugerida ---
const colors = {
  black: '#121212',
  darkGrey: '#1a1a1a',
  mediumGrey: '#2c2c2c',
  lightGrey: '#cccccc',
  silver: '#c0c0c0',
  white: '#ffffff',
  accentShine: 'rgba(200, 200, 220, 0.1)',
};

// --- Styled Components ---

const CardWrapper = styled(motion.div)`
  max-width: 1320px;
  margin: 60px auto;
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  min-height: 500px;
  background-color: ${colors.darkGrey};
  background-image: ${({ background }) => `url(${background})`};
  background-size: cover;
  background-position: center;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);

  @media (max-width: ${breakpoints.tablet}) {
    margin: 40px 20px;
    min-height: 450px;
    border-radius: 20px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    margin: 30px 15px;
    min-height: 400px;
    border-radius: 16px;
  }
`;

const ContentOverlay = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(10, 10, 15, 0.85) 0%,
    rgba(20, 20, 25, 0.7) 45%,
    rgba(30, 30, 35, 0.3) 70%,
    rgba(50, 50, 55, 0) 100%
  );
  display: flex;
  align-items: center;
  padding: 40px 60px;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 35px 50px;
    background: linear-gradient(90deg, rgba(10,10,15,0.9) 0%, rgba(20,20,25,0.75) 60%, rgba(50,50,55,0.1) 100%);
  }
  @media (max-width: ${breakpoints.mobile}) {
    padding: 30px 25px;
    align-items: flex-end;
    background: linear-gradient(180deg, rgba(10,10,15,0.9) 10%, rgba(20,20,25,0.7) 50%, rgba(50,50,55,0) 100%);
  }
`;

const TextContent = styled(motion.div)`
  color: ${colors.white};
  max-width: 60%;
  z-index: 1;

  @media (max-width: ${breakpoints.tablet}) {
    max-width: 75%;
  }
  @media (max-width: ${breakpoints.mobile}) {
    max-width: 100%;
    text-align: center;
    margin-bottom: 20px;
  }
`;

const Headline = styled(motion.h2)`
  font-family: 'Poppins', sans-serif;
  font-size: clamp(2.5rem, 5vw, 3.8rem);
  font-weight: 700;
  line-height: 1.15;
  margin-bottom: 20px;
  color: ${colors.white};
  text-shadow: 0 2px 10px rgba(0,0,0,0.5);
`;

const Description = styled(motion.p)`
  font-family: 'Inter', sans-serif;
  font-size: clamp(1rem, 2.5vw, 1.15rem);
  line-height: 1.65;
  margin-bottom: 35px;
  color: ${colors.lightGrey};
  max-width: 550px;

  @media (max-width: ${breakpoints.mobile}) {
     max-width: 100%;
     margin-bottom: 30px;
  }
`;

const CTAButton = styled(motion.button)`
  background-color: ${colors.white};
  color: ${colors.black};
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  padding: 16px 35px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease, color 0.3s ease;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  letter-spacing: 0.5px;

  &:hover {
    background-color: ${colors.silver};
    color: ${colors.black};
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 10px 25px rgba(0,0,0,0.3);
  }

  &:active {
    transform: translateY(-1px) scale(0.99);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 14px 30px;
    font-size: 0.95rem;
  }
`;

const Badge = styled(motion.div)`
  position: absolute;
  top: 30px;
  right: 30px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  color: ${colors.white};
  padding: 10px 18px;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.9rem;
  z-index: 1;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);

  svg {
    color: ${colors.silver};
    font-size: 1.1rem;
  }

  @media (max-width: ${breakpoints.tablet}) {
    top: 25px;
    right: 25px;
    font-size: 0.85rem;
    padding: 8px 15px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    top: 20px;
    right: 20px;
    font-size: 0.8rem;
    padding: 7px 12px;
  }
`;

// --- Framer Motion Variants ---
const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// --- Componente Funcional ---
export default function HeroCard() {
  return (
    <CardWrapper
      background={bgImage}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <Badge variants={itemVariants} initial="hidden" animate="visible" transition={{ delay: 0.8, duration: 0.5 }}>
        <IoSparkles /> !TGUIA
      </Badge>

      <ContentOverlay>
        <TextContent variants={contentVariants}>
          <Headline variants={itemVariants}>
            TGUIA | Lazer e Entretenimento
          </Headline>
          <Description variants={itemVariants}>
            Descubra lugares incríveis e experiências inesquecíveis perto de você. Com a TGUIA, encontrar diversão ficou fácil, rápido e muito mais interessante.
          </Description>

        </TextContent>
      </ContentOverlay>
    </CardWrapper>
  );
}
