// src/pages/AuthPage.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoArrowBackOutline } from 'react-icons/io5'; // Ícone mais clean para voltar

import AuthForm from '../components/AuthPage/AuthForm';
import AuthDecorativePanel from '../components/AuthPage/AuthDecorativePanel';

// --- Paleta Monochrome Elegance ---
const colors = {
  black: '#0A0A0A',
  white: '#FFFFFF',
  deepGrey: '#1A1A1A',    // Para gradiente escuro
  mediumGrey: '#888888',  // Texto secundário, placeholders
  lightGrey: '#CCCCCC',   // Linhas, bordas sutis
  silverMist: '#E0E0E0',  // Fundo de input inativo, hover sutil
  panelBackground: 'linear-gradient(145deg, #1C1C1C, #0D0D0D)', // Gradiente escuro para o painel
  // panelBackground: '#0A0A0A', // Ou preto sólido
};

const PageWrapper = styled(motion.div)`
  display: flex;
  min-height: 100vh;
  width: 100%;
  background-color: ${colors.white};
  overflow: hidden;
`;

const FormContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 60px; // Mais padding
  position: relative;

  @media (max-width: 900px) {
    flex-basis: 100%;
    padding: 40px 30px;
  }
  @media (max-width: 600px) {
    padding: 30px 20px;
  }
`;

const GoHomeButton = styled(Link)`
  position: absolute;
  top: 40px;
  left: 40px;
  display: inline-flex; // Para alinhar ícone e texto corretamente
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: ${colors.mediumGrey};
  font-weight: 500;
  font-size: 0.95rem;
  padding: 10px 15px;
  border-radius: 8px; // Menos arredondado
  transition: background-color 0.2s ease, color 0.2s ease;
  z-index: 10; // Acima de outros elementos

  svg {
    font-size: 1.4rem;
    color: ${colors.lightGrey};
    transition: color 0.2s ease;
  }

  &:hover {
    background-color: ${colors.silverMist}33; // Fundo prateado bem sutil
    color: ${colors.black};
    svg {
      color: ${colors.mediumGrey};
    }
  }

  @media (max-width: 600px) {
    top: 20px;
    left: 20px;
    font-size: 0.9rem;
    padding: 8px 12px;
    svg { font-size: 1.2rem; }
  }
`;


function AuthPage() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const navigate = useNavigate();

  const handleSwitchMode = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };

  const handleAuthSuccess = (userData) => {
    console.log('Autenticação bem-sucedida:', userData);
    alert(isLoginMode ? 'Login bem-sucedido!' : 'Cadastro realizado com sucesso! Faça o login.');

    if (isLoginMode) {
        navigate('/');
    } else {
        setIsLoginMode(true);
    }
  };

  const pageVariants = {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.6, ease: "easeInOut" } },
      exit: { opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } }
  };

  return (
    <PageWrapper
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
    >
      <AuthDecorativePanel
          logoText="!TGUIA"
          welcomeText={isLoginMode ? "Bem-vindo(a) de Volta!" : "Crie Sua Conta"}
          subText={isLoginMode ? "Continue sua jornada conosco." : "Rápido e fácil. Junte-se à comunidade."}
          panelBg={colors.panelBackground} // Passa a cor/gradiente do painel
          textColor={colors.white}
          accentColor={colors.lightGrey} // Para detalhes como ícone do logo
      />

      <FormContainer>
        <GoHomeButton to="/">
            <IoArrowBackOutline />
            Voltar
        </GoHomeButton>
        <AuthForm
          isLoginMode={isLoginMode}
          onSwitchMode={handleSwitchMode}
          onAuthSuccess={handleAuthSuccess}
          colors={colors} // Passa a paleta para o formulário
        />
      </FormContainer>
    </PageWrapper>
  );
}

export default AuthPage;