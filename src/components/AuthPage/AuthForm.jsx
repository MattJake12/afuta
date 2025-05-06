// src/components/AuthPage/AuthForm.jsx
import React, { useState } from 'react';
import styled, { css } from 'styled-components'; // Importar css
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaLock } from 'react-icons/fa';

import AuthInput from './AuthInput';
import AuthButton from './AuthButton';

// Cores são passadas via props `colors`

const FormWrapper = styled(motion.form)`
  width: 100%;
  max-width: 420px; // Um pouco mais largo
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleContainer = styled(motion.div)`
  text-align: center;
  margin-bottom: 40px; // Mais espaço
`;

// Remover FormIcon (não teremos ícone grande no título)

const FormTitle = styled(motion.h2)`
  font-family: 'Poppins', sans-serif;
  font-size: 2rem; // Maior
  font-weight: 600;
  color: ${({ colors }) => colors.black || '#0A0A0A'};
  margin-bottom: 10px;
`;

const FormSubtitle = styled(motion.p)`
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  color: ${({ colors }) => colors.mediumGrey || '#888888'};
`;

const ErrorMessage = styled(motion.p)`
  color: #D32F2F; // Vermelho mais sóbrio
  font-size: 0.9rem;
  margin-bottom: 20px;
  text-align: center;
  width: 100%;
  padding: 10px;
  background-color: #FFEBEE; // Fundo rosa claro para erro
  border: 1px solid #FFCDD2;
  border-radius: 4px;
`;

const SwitchModeContainer = styled(motion.div)`
  margin-top: 30px;
  font-size: 0.95rem;
  color: ${({ colors }) => colors.mediumGrey || '#888888'};

  button {
    background: none;
    border: none;
    color: ${({ colors }) => colors.black || '#0A0A0A'};
    font-weight: 600;
    cursor: pointer;
    text-decoration: none; // Sem sublinhado por padrão
    padding: 0 4px;
    transition: color 0.2s ease;

    &:hover {
      color: ${({ colors }) => colors.deepGrey || '#1A1A1A'}; // Um preto mais suave no hover
      text-decoration: underline; // Sublinhado no hover
    }
  }
`;

// Animações
const formVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.15, delayChildren: 0.2 } }, // Stagger para inputs
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const itemStaggerVariant = { // Para inputs e botões dentro do form
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: -15 }
};


function AuthForm({ isLoginMode, onSwitchMode, onAuthSuccess, colors }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!isLoginMode && password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        setError('Por favor, insira um e-mail válido.');
        return;
    }
    if (password.length < 6) {
        setError('A senha deve ter pelo menos 6 caracteres.');
        return;
    }

    console.log('Enviando dados:', { email, password });
    setTimeout(() => {
        if (email === "error@example.com") {
            setError(isLoginMode ? "E-mail ou senha inválidos." : "Este e-mail já está em uso.");
        } else {
            onAuthSuccess({ email, id: Date.now() });
            if (!isLoginMode) {
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            }
        }
    }, 1000);
  };

  const formTitleText = isLoginMode ? 'Acesse sua Conta' : 'Crie sua Conta';
  const formSubtitleText = isLoginMode ? 'Bem-vindo(a) de volta!' : 'É rápido e fácil.';
  const buttonText = isLoginMode ? 'Entrar' : 'Registrar';
  const switchModeText = isLoginMode ? 'Não tem uma conta?' : 'Já tem uma conta?';
  const switchModeButtonText = isLoginMode ? 'Crie uma agora' : 'Faça Login';

  return (
    <FormWrapper
        key={isLoginMode ? 'login' : 'register'}
        variants={formVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        onSubmit={handleSubmit}
        noValidate
        colors={colors}
    >
        <TitleContainer variants={itemStaggerVariant} colors={colors}>
            {/* Remover FormIcon */}
            <FormTitle variants={itemStaggerVariant} colors={colors}>{formTitleText}</FormTitle>
            <FormSubtitle variants={itemStaggerVariant} colors={colors}>{formSubtitleText}</FormSubtitle>
        </TitleContainer>

      <motion.div style={{width: '100%'}} variants={itemStaggerVariant}>
        <AuthInput
            type="email"
            placeholder="Seu melhor e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={FaEnvelope}
            name="email"
            colors={colors}
        />
      </motion.div>

      <motion.div style={{width: '100%'}} variants={itemStaggerVariant}>
        <AuthInput
            type="password"
            placeholder="Sua senha secreta"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={FaLock}
            name="password"
            colors={colors}
        />
      </motion.div>

      <AnimatePresence>
        {!isLoginMode && (
          <motion.div
            key="confirmPassword"
            style={{width: '100%'}}
            initial={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 0, marginBottom: '35px', transition: {duration: 0.4, ease: "easeOut"} }}
            exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0, transition: {duration: 0.3} }}
          >
            <AuthInput
              type="password"
              placeholder="Confirme a senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={FaLock}
              name="confirmPassword"
              colors={colors}
            />
          </motion.div>
        )}
      </AnimatePresence>

        {error && (
            <ErrorMessage
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {error}
            </ErrorMessage>
        )}

      <motion.div style={{width: '100%', marginTop: error ? '0' : '10px'}} variants={itemStaggerVariant}>
        <AuthButton type="submit" colors={colors}>
          {buttonText}
        </AuthButton>
      </motion.div>

      <SwitchModeContainer variants={itemStaggerVariant} colors={colors}>
        {switchModeText} <button type="button" onClick={onSwitchMode}>{switchModeButtonText}</button>
      </SwitchModeContainer>
    </FormWrapper>
  );
}

export default AuthForm;