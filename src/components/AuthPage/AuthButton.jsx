// src/components/AuthPage/AuthButton.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Cores passadas via props `colors` do AuthForm

const StyledButton = styled(motion.button)`
  width: 100%;
  padding: 16px 25px; // Mais padding vertical
  background: ${({ colors }) => colors.black || '#0A0A0A'};
  color: ${({ colors }) => colors.white || '#FFFFFF'};
  border: 1px solid transparent; // Para manter o layout no hover
  border-radius: 8px; // Cantos mais sharp
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px; // Mais espaçamento
  cursor: pointer;
  transition: background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease, transform 0.1s ease;
  outline: none;

  &:hover:not(:disabled) {
    background: ${({ colors }) => colors.white || '#FFFFFF'};
    color: ${({ colors }) => colors.black || '#0A0A0A'};
    border-color: ${({ colors }) => colors.black || '#0A0A0A'}; // Borda preta no hover
    transform: translateY(-2px);
  }

  &:active:not(:disabled) {
    transform: translateY(0px);
  }

  &:disabled {
    background: ${({ colors }) => colors.lightGrey || '#CCCCCC'};
    color: ${({ colors }) => colors.mediumGrey || '#888888'};
    cursor: not-allowed;
    border-color: transparent;
    transform: none;
  }
`;

function AuthButton({ children, type = "submit", onClick, disabled, colors, whileHoverScale = 1.02, whileTapScale = 0.98 }) {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      colors={colors}
      whileHover={disabled ? {} : { scale: whileHoverScale, transition: { type: "spring", stiffness: 300 } }}
      whileTap={disabled ? {} : { scale: whileTapScale }}
    >
      {children}
    </StyledButton>
  );
}

export default AuthButton;