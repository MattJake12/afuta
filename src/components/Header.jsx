// src/components/Header.jsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom'; // Importar Link

// --- Ícones ---
import { IoSearchOutline } from 'react-icons/io5';
import { MdOutlineHotel, MdOutlineAttractions, MdOutlineRestaurant, MdFlightTakeoff, MdOutlineHouse, MdOutlineHome } from 'react-icons/md';
import { GoGlobe } from "react-icons/go";
// import { FiMenu } from 'react-icons/fi'; // Ícone para menu mobile (descomentar se usar)

// --- Breakpoints ---
const breakpoints = {
  tablet: '992px',
  mobile: '768px',
  smallMobile: '480px',
};

// --- Styled Components (Definições completas) ---

const HeaderStickyWrapper = styled(motion.header)`
  position: sticky;
  top: 0;
  background: white;
  z-index: 1000;
  width: 100%;
  box-shadow: ${({ $isSticky }) => $isSticky ? '0 1px 4px rgba(0,0,0,0.08)' : 'none'};
  transition: box-shadow 0.3s ease-in-out;
`;

const TopBarContainer = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  max-width: 1320px;
  margin: 0 auto;
  height: 70px;
  position: relative;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 0 15px;
    height: 65px;
  }
   @media (max-width: ${breakpoints.mobile}) {
    height: 60px;
  }
`;

const LogoLink = styled(Link)` // Usando Link
  text-decoration: none;
  color: #000;
  flex-shrink: 0;
`;

const LogoText = styled.span`
  font-weight: 900;
  font-size: 30px;
  font-family: 'Arial Black', 'Impact', sans-serif;
  letter-spacing: -1px;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 26px;
  }
`;

const InitialNav = styled(motion.nav)`
  display: flex;
  gap: 30px;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;

  @media (max-width: ${breakpoints.tablet}) {
     gap: 20px;
  }

  @media (max-width: ${breakpoints.mobile}) {
     display: none;
  }
`;

const NavLink = styled(Link)` // Usando Link
  text-decoration: none;
  color: #333;
  font-weight: 700; // Negrito
  font-size: 15px; // Maior
  padding: 8px 4px;
  position: relative;
  transition: color 0.2s ease;

  &:hover {
    color: #000;
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #000;
    transition: width 0.3s ease;
  }

  &:hover:after {
    width: 100%;
  }
`;

const UserActions = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;

  @media (max-width: ${breakpoints.mobile}) {
     gap: 10px;
  }
`;

const CurrencyButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 15px;
  font-weight: 600;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 20px;
  transition: background-color 0.2s ease;

  svg {
    font-size: 18px;
  }

  &:hover {
    background-color: #f0f0f0;
  }

  @media (max-width: ${breakpoints.mobile}) {
     display: none;
  }
`;

const SignInButton = styled.button`
  background-color: #000;
  color: white;
  font-weight: 700;
  font-size: 15px;
  padding: 12px 20px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  white-space: nowrap;

  &:hover {
    background-color: #333;
  }

   @media (max-width: ${breakpoints.mobile}) {
     padding: 10px 15px;
     font-size: 14px;
   }
`;

const SearchSectionContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px 40px 20px;
  max-width: 1320px;
  margin: 0 auto;
  background-color: white;
  overflow: hidden;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 40px 15px 30px 15px;
  }
`;

const Title = styled(motion.h1)`
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 30px;
  color: #000;
  text-align: center;
  font-family: 'Trip Sans', 'Arial Black', sans-serif;
  letter-spacing: -1.5px;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 42px;
    min-height: 55px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 32px;
    margin-bottom: 20px;
    min-height: 45px;
  }
`;

const TabsContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
  width: 100%;
  overflow-x: auto;
  padding-bottom: 10px;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: ${breakpoints.mobile}) {
     gap: 15px;
     justify-content: flex-start;
  }
`;

const TabButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 10px 15px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: ${({ $isActive }) => $isActive ? '800' : '600'};
  color: ${({ $isActive }) => $isActive ? '#000' : '#444'};
  position: relative;
  border-radius: 10px;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    background-color: #f5f5f5;
    color: #000;
  }

  &:after {
    content: '';
    display: block;
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: ${({ $isActive }) => $isActive ? 'calc(100% - 20px)' : '0'};
    height: 3px;
    background-color: #000;
    transition: width 0.3s ease-in-out;
    border-radius: 1px;
  }

  svg {
    font-size: 26px;
    margin-bottom: 4px;
  }

  @media (max-width: ${breakpoints.mobile}) {
     font-size: 15px;
     padding: 8px 12px;
     svg { font-size: 24px; }
  }
`;

const LargeSearchBar = styled(motion.div)`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 35px;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  overflow: hidden;
  width: 850px;
  max-width: 95%;
  height: 60px;
  position: relative;

  @media (max-width: ${breakpoints.tablet}) {
    width: 90%;
    height: 55px;
  }
   @media (max-width: ${breakpoints.mobile}) {
    height: 50px;
  }
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  left: 25px;
  top: 50%;
  transform: translateY(-50%);
  color: #555;
  font-size: 22px;
  display: flex;
  align-items: center;

   @media (max-width: ${breakpoints.mobile}) {
      left: 20px;
      font-size: 20px;
   }
`;

const SearchInput = styled.input`
  padding: 18px 25px 18px 65px; /* Padding para LargeSearchBar */
  flex: 1;
  border: none;
  outline: none;
  font-size: 17px;
  background: transparent;
  color: #333;
  &::placeholder {
    color: #888;
  }

  @media (max-width: ${breakpoints.mobile}) {
     font-size: 16px;
     padding: 15px 20px 15px 55px;
  }
`;

const SearchButton = styled.button`
  padding: 0 30px;
  height: 100%;
  background: #34e0a1; // Cor exemplo TripAdvisor
  color: #004f32; // Cor exemplo TripAdvisor
  font-weight: 700;
  font-size: 17px;
  border: none;
  border-radius: 0 35px 35px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: #2dbf8b; // Cor exemplo TripAdvisor (hover)
  }

  @media (max-width: ${breakpoints.mobile}) {
     font-size: 16px;
     padding: 0 25px;
  }
`;

const IntegratedSearchBar = styled(motion.div)`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 30px;
  background-color: #f7f7f7;
  overflow: hidden;
  width: 450px;
  height: 44px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  /* Reutiliza SearchIconWrapper e SearchInput, mas ajusta estilos */
  ${SearchIconWrapper} {
    left: 18px;
    font-size: 20px;
  }

  ${SearchInput} {
    padding: 10px 15px 10px 45px; /* Padding ajustado */
    font-size: 15px;
  }

  ${SearchButton} {
    display: none; /* Botão não aparece na barra integrada */
  }

  @media (max-width: ${breakpoints.tablet}) {
    width: 350px;
    height: 40px;
     ${SearchInput} { font-size: 14px; }
     ${SearchIconWrapper} { font-size: 18px; left: 15px; }
  }
   @media (max-width: ${breakpoints.mobile}) {
     width: calc(100% - 140px);
     left: 70px;
     transform: translateY(-50%);
     max-width: 300px;
   }
   @media (max-width: ${breakpoints.smallMobile}) {
      width: calc(100% - 120px);
      left: 60px;
   }
`;

const StickySecondaryNavContainer = styled(motion.div)`
  background: white;
  border-top: 1px solid #eee;
  padding: 10px 20px;
  max-width: 1320px;
  margin: 0 auto;
  overflow-x: auto;
  white-space: nowrap;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }

  @media (max-width: ${breakpoints.tablet}) {
    padding: 8px 15px;
  }
`;

const StickyNavLinks = styled.nav`
  display: flex;
  justify-content: center;
  gap: 30px;

  @media (max-width: ${breakpoints.mobile}) {
     justify-content: flex-start;
     gap: 25px;
  }
`;

const StickyNavLink = styled(Link)` // Usando Link
  text-decoration: none;
  color: #555; // Cor padrão
  font-weight: 600; // Peso padrão
  font-size: 16px;
  padding: 8px 0;
  position: relative;
  transition: color 0.2s ease;
  flex-shrink: 0;

  &:hover {
    color: #000; // Muda no hover
  }

   @media (max-width: ${breakpoints.mobile}) {
      font-size: 15px;
   }

   /* Estilo para link ativo (opcional, requer lógica adicional ou NavLink do react-router) */
   &.active {
        color: #000;
        font-weight: 700;
   }
   &:after { /* Underline para ativo - pode ser feito com NavLink também */
      content: '';
      position: absolute;
      bottom: -2px; /* Ajuste conforme necessário */
      left: 0;
      width: 0%; /* Começa sem largura */
      height: 2px;
      background-color: #000;
      transition: width 0.3s ease;
   }
    &.active:after {
       width: 100%; /* Largura total quando ativo */
   }
`;

/* Opcional: Botão de Menu Hambúrguer */
/*
const BurgerMenuButton = styled.button`
  display: none;
  // ... estilos ...
  @media (max-width: ${breakpoints.mobile}) {
    display: block;
  }
`;
*/


// --- Tab Data e Sticky Nav Data ---
const tabsData = [
  { id: 'all', label: 'Search All', icon: MdOutlineHome },
  { id: 'hotels', label: 'Hotels', icon: MdOutlineHotel },
  { id: 'thingsToDo', label: 'Things to Do', icon: MdOutlineAttractions },
  { id: 'restaurants', label: 'Restaurants', icon: MdOutlineRestaurant },
  { id: 'flights', label: 'Flights', icon: MdFlightTakeoff },
  { id: 'rentals', label: 'Vacation Rentals', icon: MdOutlineHouse },
];
const stickyNavData = [
    { id: 'hotels', label: 'Hotels', path: '/hoteis' }, // Use 'path' para o Link
    { id: 'thingsToDo', label: 'Things to Do', path: '/atracoes' },
    { id: 'restaurants', label: 'Restaurants', path: '/restaurantes' },
    { id: 'flights', label: 'Flights', path: '/voos' },
    { id: 'rentals', label: 'Vacation Rentals', path: '/alugueis' },
    // { id: 'cruises', label: 'Cruises', path: '/cruzeiros' },
    // { id: 'cars', label: 'Rental Cars', path: '/carros' },
    // { id: 'forums', label: 'Forums', path: '/foruns' },
];

// --- Mapeamento de Títulos por Aba ---
const tabTitles = {
  all: "Para onde você quer ir?",
  hotels: "Hospede-se em um lugar incrível",
  thingsToDo: "Faça algo divertido",
  restaurants: "Encontre lugares para comer",
  flights: "Encontre seu próximo voo",
  rentals: "Alugue o espaço perfeito",
};

// --- Configuração de Transição Suave ---
const smoothTransition = {
    duration: 0.5,
    ease: [0.4, 0, 0.2, 1]
};

// --- Variantes de Animação ---
const simpleFadeInOut = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3, ease: smoothTransition.ease }
};
const searchSectionCollapse = {
    initial: { opacity: 0, height: 0 },
    animate: {
        opacity: 1,
        height: 'auto',
        transition: { ...smoothTransition, duration: 0.6 }
    },
    exit: {
        opacity: 0,
        height: 0,
        transition: { ...smoothTransition, duration: 0.4 }
    }
};
const stickyNavAppear = {
    initial: { opacity: 0, y: -15 },
    animate: { opacity: 1, y: 0, transition: smoothTransition },
    exit: { opacity: 0, y: -15, transition: { duration: 0.3, ease: smoothTransition.ease } }
};
const titleTextAnimation = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: smoothTransition.ease } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: smoothTransition.ease } }
};


// --- Componente Header Modificado ---
export default function Header({ mode = 'home' }) { // Recebe a prop 'mode', padrão 'home'
  const [isStickyByScroll, setIsStickyByScroll] = useState(false);
  const [activeSearchTab, setActiveSearchTab] = useState('all');
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Para o Burger Menu

  // Efeito de scroll só é relevante para o modo 'home'
  useEffect(() => {
    if (mode === 'home') {
      const onScroll = () => setIsStickyByScroll(window.scrollY > 10);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    } else {
      setIsStickyByScroll(false); // Garante que não fique sticky por scroll em outros modos
    }
  }, [mode]); // Depende do 'mode'

  // Estado visual final
  const isEffectivelySticky = mode === 'sticky' || (mode === 'home' && isStickyByScroll);

  // Condições de renderização
  const showSearchSection = mode === 'home' && !isEffectivelySticky;
  const showStickyNav = isEffectivelySticky;
  const showIntegratedSearch = isEffectivelySticky;
  const showInitialNav = mode === 'home' && !isEffectivelySticky;

  // Placeholders
  const searchPlaceholder = tabsData.find(tab => tab.id === activeSearchTab)?.label || 'Onde, o quê, hotéis...';
  const stickySearchPlaceholder = "Buscar hotéis, passeios e mais...";
  const currentTitle = tabTitles[activeSearchTab] || tabTitles.all;

  return (
    <HeaderStickyWrapper $isSticky={isEffectivelySticky}> {/* Aplica estilo baseado no estado final */}
      {/* --- Barra Superior --- */}
      <TopBarContainer>
        <LogoLink to="/"> {/* Usando Link */}
          <LogoText>!TGUIA</LogoText>
        </LogoLink>

        {/* Animação Nav/Search */}
        <AnimatePresence initial={false} mode='wait'>
          {showInitialNav && (
            <InitialNav key="initial-nav" {...simpleFadeInOut}>
              {/* Atualize 'to' com suas rotas */}
              <NavLink to="/descobrir">Descobrir</NavLink>
              <NavLink to="/viagens">Viagens</NavLink>
              <NavLink to="/avaliar">Avaliar</NavLink>
              <NavLink to="/mais">Mais</NavLink>
            </InitialNav>
          )}
          {showIntegratedSearch && (
            <IntegratedSearchBar key="integrated-search" {...simpleFadeInOut}>
              <SearchIconWrapper><IoSearchOutline /></SearchIconWrapper>
              <SearchInput placeholder={stickySearchPlaceholder} />
            </IntegratedSearchBar>
          )}
        </AnimatePresence>

        {/* Ações do Usuário */}
        <UserActions>
          <CurrencyButton><GoGlobe /> BRL</CurrencyButton>
          <SignInButton>Entrar</SignInButton>
          {/* <BurgerMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}><FiMenu /></BurgerMenuButton> */}
        </UserActions>
      </TopBarContainer>

      {/* --- Seção de Busca Inicial (Só no modo 'home' e não sticky) --- */}
      <AnimatePresence>
        {showSearchSection && (
          <SearchSectionContainer
            key="search-section" variants={searchSectionCollapse}
            initial="initial" animate="animate" exit="exit"
            style={{ overflow: 'hidden' }}
          >
            {/* Título Dinâmico */}
            <Title>
              <AnimatePresence mode='wait'>
                <motion.span
                  key={activeSearchTab}
                  variants={titleTextAnimation}
                  initial="initial" animate="animate" exit="exit"
                  style={{ display: 'inline-block' }}
                >
                  {currentTitle}
                </motion.span>
              </AnimatePresence>
            </Title>

            {/* Abas de Busca */}
            <TabsContainer>
              {tabsData.map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeSearchTab === tab.id;
                return (
                  <TabButton
                    key={tab.id}
                    $isActive={isActive}
                    onClick={() => setActiveSearchTab(tab.id)}
                    aria-pressed={isActive}
                  >
                    <IconComponent /> {tab.label}
                  </TabButton>
                );
              })}
            </TabsContainer>

            {/* Barra de Busca Grande */}
            <LargeSearchBar>
              {/* Reutiliza o SearchInput e SearchIconWrapper, mas com estilos diferentes */}
              <SearchIconWrapper><IoSearchOutline /></SearchIconWrapper>
              <SearchInput placeholder={searchPlaceholder} />
              <SearchButton>Buscar</SearchButton>
            </LargeSearchBar>
          </SearchSectionContainer>
        )}
      </AnimatePresence>

      {/* --- Navegação Secundária Sticky (Sempre visível no modo 'sticky', ou no 'home' quando scrollado) --- */}
      <AnimatePresence>
        {showStickyNav && (
          <StickySecondaryNavContainer
            key="sticky-nav" variants={stickyNavAppear}
            initial="initial" animate="animate" exit="exit"
          >
            <StickyNavLinks>
              {stickyNavData.map((link) => (
                // Usar o 'path' definido nos dados para o 'to' do Link
                // Para o estilo ativo, você pode usar NavLink do react-router-dom ou lógica com useLocation
                <StickyNavLink key={link.id} to={link.path}>
                  {link.label}
                </StickyNavLink>
              ))}
            </StickyNavLinks>
          </StickySecondaryNavContainer>
        )}
      </AnimatePresence>

      {/* --- Menu Mobile Opcional --- */}
      {/* <AnimatePresence> {isMobileMenuOpen && <MobileMenuOverlay onClose={() => setIsMobileMenuOpen(false)} />} </AnimatePresence> */}
    </HeaderStickyWrapper>
  );
}