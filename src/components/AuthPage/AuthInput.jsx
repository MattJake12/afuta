// src/components/AuthPage/AuthInput.jsx
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

// Cores passadas via props `colors` do AuthForm

const InputWrapper = styled(motion.div)`
  position: relative;
  width: 100%;
  margin-bottom: 35px; // Mais espaço
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 18px; // Ajustar para alinhar com o texto do input
  left: 0;
  color: ${({ colors }) => colors.lightGrey || '#CCCCCC'};
  font-size: 1.2rem;
  pointer-events: none;
  transition: color 0.2s ease;

  ${({ $isFocused, colors }) =>
    $isFocused &&
    css`
      color: ${colors.black || '#0A0A0A'};
    `}
`;

const StyledInput = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid ${({ colors }) => colors.lightGrey || '#CCCCCC'}; // Linha base
  padding: 18px 0 10px ${({ hasIcon }) => (hasIcon ? '35px' : '0')}; // Padding: top | right | bottom | left (se ícone)
  font-size: 1rem;
  color: ${({ colors }) => colors.black || '#0A0A0A'};
  background-color: transparent;
  transition: border-color 0.3s ease;
  outline: none;

  &::placeholder {
    color: transparent; // Placeholder real é escondido, usamos o Label
  }

  &:focus {
    border-bottom-color: ${({ colors }) => colors.black || '#0A0A0A'};
  }

  // Remove setas de inputs numéricos (se aplicável)
  &[type=number]::-webkit-inner-spin-button,
  &[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type=number] {
    -moz-appearance: textfield;
  }
`;

const Label = styled(motion.label)`
  position: absolute;
  left: ${({ hasIcon }) => (hasIcon ? '35px' : '0')};
  top: 18px; // Alinhar com o input
  font-size: 1rem;
  color: ${({ colors }) => colors.mediumGrey || '#888888'};
  pointer-events: none;
  transition: all 0.2s ease-out;
  transform-origin: left top;
`;

// Animação do Label
const labelFloatingVariants = {
  inactive: (hasValue, hasIcon) => ({ // (customProp, hasIcon)
    top: '18px',
    left: hasIcon ? '35px' : '0px',
    scale: 1,
    opacity: 1,
    color: '#888888', // Cor padrão do placeholder/label
  }),
  active: (hasValue, hasIcon) => ({
    top: '-5px', // Move para cima
    left: hasIcon ? '35px' : '0px', // Mantém o X se tiver ícone
    scale: 0.85, // Diminui
    opacity: 1,
    color: '#0A0A0A', // Cor do label focado
  }),
};


function AuthInput({ type, placeholder, value, onChange, icon, name, required = true, colors }) {
  const [isFocused, setIsFocused] = useState(false);
  const IconComponent = icon;
  const inputId = name || `input-${Math.random().toString(36).substr(2, 9)}`;

  const hasValue = value && value.length > 0;

  return (
    <InputWrapper variants={{/* Adicionar variantes se animar o wrapper todo */}}>
      {IconComponent && (
        <IconWrapper colors={colors} $isFocused={isFocused || hasValue}>
          <IconComponent />
        </IconWrapper>
      )}
      <StyledInput
        type={type}
        id={inputId}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        name={name}
        hasIcon={!!IconComponent}
        required={required}
        colors={colors}
        placeholder={placeholder} // Ainda útil para acessibilidade, mas visualmente gerenciado pelo Label
      />
      <Label
        htmlFor={inputId}
        colors={colors}
        hasIcon={!!IconComponent}
        variants={labelFloatingVariants}
        initial="inactive"
        animate={(isFocused || hasValue) ? "active" : "inactive"}
        custom={{ hasValue, hasIcon: !!IconComponent }} // Passa props customizadas para as variantes
      >
        {placeholder}
      </Label>
    </InputWrapper>
  );
}

export default AuthInput;