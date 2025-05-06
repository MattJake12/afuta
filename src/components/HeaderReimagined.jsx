// src/components/HeaderAura.jsx
import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom'; // Ou NavLink se preferir classe ativa automática
import { IoSearchOutline, IoClose, IoPersonCircleOutline } from 'react-icons/io5';
import { MdOutlineHotel, MdOutlineAttractions, MdOutlineRestaurant, MdFlightTakeoff, MdOutlineHouse } from 'react-icons/md';
// Se precisar de mais ícones, importe-os aqui

// --- Paleta de Cores (Aura) ---
const colors = {
  black: '#0A0A0A',
  white: '#FFFFFF',
  silver: '#CCCCCC',          // Linhas, bordas sutis
  greyLight: '#F5F5F5',       // Fundos alternativos, hover
  greyMedium: '#888888',      // Placeholders, texto inativo
  greyDark: '#333333',        // Texto hover, botões secundários
  // Glassmorphism / Transparência
  whiteTransparentSoft: 'rgba(255, 255, 255, 0.80)', // Fundo sticky glass
  whiteTransparentMedium: 'rgba(255, 255, 255, 0.60)',// Fundo painel glass
  blackTransparentSoft: 'rgba(10, 10, 10, 0.08)',    // Bordas/sombras sutis
};

// --- Breakpoints ---
const breakpoints = {
  tablet: '992px',
  mobile: '768px',
};

// --- Styled Components (Aura Header) ---

// ** Wrappers Principais **
const HeaderWrapper = styled(motion.header)`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: ${({ $isSticky }) => $isSticky ? colors.whiteTransparentSoft : colors.white};
  /* Efeito Glassmorphism Opcional */
  @supports (backdrop-filter: blur(10px)) or (-webkit-backdrop-filter: blur(10px)) {
      backdrop-filter: ${({ $isSticky }) => $isSticky ? 'blur(12px)' : 'none'};
      -webkit-backdrop-filter: ${({ $isSticky }) => $isSticky ? 'blur(12px)' : 'none'};
  }
  border-bottom: 1px solid ${({ $isSticky }) => $isSticky ? colors.blackTransparentSoft : 'transparent'};
  transition: background 0.4s ease, backdrop-filter 0.4s ease, -webkit-backdrop-filter 0.4s ease, border-color 0.4s ease;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1440px; // Um pouco mais largo
  margin: 0 auto;
  padding: 0 30px; // Mais padding lateral
  height: 70px;
  position: relative;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 0 20px;
    height: 65px;
  }
`;

// ** Logo e Ações do Usuário **
const LogoLink = styled(Link)`
  text-decoration: none;
  color: ${colors.black};
  font-weight: 900;
  font-size: 34px; // Um pouco maior
  font-family: 'Montserrat', sans-serif; // Fonte moderna
  letter-spacing: -1.8px;
  flex-shrink: 0;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 28px;
  }
`;

const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: 18px; // Um pouco mais de espaço
  flex-shrink: 0;
`;

const SignInButton = styled(motion.button)`
  background: ${colors.black};
  color: ${colors.white};
  border: none;
  padding: 10px 28px; // Mais padding
  border-radius: 30px; // Mais arredondado
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.2s ease;
  white-space: nowrap;

  &:hover { background: ${colors.greyDark}; }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 8px 18px;
    font-size: 14px;
  }
`;

// ** Área Central Dinâmica **
const CentralActionArea = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  min-width: 150px; // Garante espaço mínimo
  justify-content: center;
`;

const ExploreButton = styled(motion.button)`
  background: transparent;
  color: ${colors.black};
  border: 1px solid ${colors.silver}; // Outline
  padding: 10px 22px;
  border-radius: 30px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  white-space: nowrap;

  svg { font-size: 18px; }

  &:hover {
    background: ${colors.greyLight};
    border-color: ${colors.greyMedium};
  }

  &.close-button { // Estilo específico para botão fechar
    border: none;
    background: ${colors.greyLight};
    padding: 8px; // Menor se for só ícone
    width: 40px;
    height: 40px;
    justify-content: center;
    svg { font-size: 22px; }
    &:hover { background: ${colors.silver}; }
  }
`;

// ** Estilos do Input Sublinhado **
const UnderlineInputContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  padding-bottom: 8px; // Espaço abaixo da linha
`;

const StyledUnderlineInput = styled.input`
  width: 100%;
  border: none;
  background: transparent;
  outline: none;
  color: ${colors.black};
  font-size: ${({ fontSize }) => fontSize || '16px'};
  padding: 8px 45px 8px 35px; // Padding: top | right (espaço p/ botão) | bottom | left (espaço p/ ícone)
  position: relative;
  z-index: 1;

  &::placeholder {
    color: ${colors.greyMedium};
    transition: all 0.3s ease;
    opacity: 1;
  }

  &:focus::placeholder {
    opacity: 0; // Some ao focar
  }
`;

const Underline = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background-color: ${colors.silver};
  transform-origin: center; // Para animação de escala se usada
  transition: height 0.3s ease, background-color 0.3s ease;
  z-index: 0;

  ${UnderlineInputContainer}:focus-within & { // Aplica quando qualquer filho tem foco
    height: 2px;
    background-color: ${colors.black};
  }
`;

const InputIconWrapper = styled(motion.div)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin-top: 4px; // Ajuste fino vertical por causa do padding-bottom do container
  color: ${colors.greyMedium};
  font-size: 20px;
  z-index: 2;
  pointer-events: none;

  &.left { left: 5px; }
`;

// ** Botão de Busca Flutuante **
const FloatingSearchButton = styled(motion.button)`
  position: absolute;
  right: -5px; // Levemente para fora
  top: 50%;
  transform: translateY(-50%);
  margin-top: 4px; // Alinhar com ícone esquerdo
  width: 42px; // Um pouco maior
  height: 42px;
  border-radius: 50%;
  background: ${colors.black};
  color: ${colors.white};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 3;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
  transition: background 0.2s ease, transform 0.2s ease;

  svg { font-size: 22px; }

  &:hover {
    background: ${colors.greyDark};
    transform: translateY(-50%) scale(1.08); // Efeito hover mais pronunciado
  }
`;

// ** Painel de Exploração (Glassmorphism) **
const ExplorationPanel = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  /* Efeito Glass */
  background: ${colors.whiteTransparentMedium};
  @supports (backdrop-filter: blur(10px)) or (-webkit-backdrop-filter: blur(10px)) {
      backdrop-filter: blur(15px);
      -webkit-backdrop-filter: blur(15px);
  }
  border-top: 1px solid ${colors.whiteTransparentSoft};
  box-shadow: 0 8px 32px 0 ${colors.blackTransparentSoft};
  padding: 50px 30px 40px 30px; // Ajuste padding
  z-index: 999;
  overflow: hidden;
  border-radius: 0 0 20px 20px; // Mais arredondado

  @media (max-width: ${breakpoints.tablet}) {
    padding: 40px 20px 30px 20px;
  }
`;

const PanelContent = styled.div`
  max-width: 800px; // Largura máxima interna
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px; // Mais espaço entre elementos
`;

// ** Navegação por Categorias (Painel) **
const CategoryNav = styled.nav`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 25px 35px; // Mais espaçamento
  width: 100%;
`;

const CategoryButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px; // Mais espaço ícone/texto
  padding: 5px;
  text-align: center;
  color: ${({ $isActive }) => $isActive ? colors.black : colors.greyMedium};
  font-weight: ${({ $isActive }) => $isActive ? '700' : '500'};
  font-size: 15px; // Um pouco maior
  transition: color 0.2s ease, transform 0.2s ease;
  position: relative;

  svg {
    font-size: 30px; // Ícones maiores
    margin-bottom: 2px;
    transition: transform 0.2s ease;
  }

  &:hover {
    color: ${colors.black};
    transform: translateY(-3px); // Leve elevação no hover
    svg { transform: scale(1.05); }
  }

  /* Indicador Ativo (Ponto) */
  &::after {
    content: '';
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${colors.black};
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%) scale(${({ $isActive }) => $isActive ? 1 : 0});
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); // Efeito elástico
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 14px;
    svg { font-size: 26px; }
  }
`;


// ** Navegação Secundária Sticky **
const StickySecondaryNavWrapper = styled(motion.div)`
  background: ${colors.white}; // Fundo sólido para contraste
  border-bottom: 1px solid ${colors.greyLight};
  padding: 0 30px;
  width: 100%;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

const StickySecondaryNav = styled.nav`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 45px; // Mais espaço
  height: 50px; // Um pouco mais alta
  align-items: center;

  @media (max-width: ${breakpoints.tablet}) {
    justify-content: flex-start;
    gap: 35px;
  }
`;

const StickyNavLink = styled(Link)` // Ou NavLink
  text-decoration: none;
  color: ${colors.greyMedium};
  font-weight: 600;
  font-size: 16px;
  padding: 12px 0; // Padding vertical para área de clique
  position: relative;
  white-space: nowrap;
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.black};
  }

  /* Estilo Ativo - Requer lógica ou NavLink */
  &.active {
    color: ${colors.black};
    font-weight: 700;
  }

  /* Underline Ativo */
  &.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${colors.black};
    transform-origin: left; // Animação da esquerda para direita (opcional)
    animation: underlineGrow 0.3s ease-out;
  }

  @keyframes underlineGrow {
    from { transform: scaleX(0); }
    to { transform: scaleX(1); }
  }
`;

// --- Dados das Categorias/Navegação ---
const categories = [
  { id: 'hotels', label: 'Hotéis', icon: MdOutlineHotel, path: '/hoteis' },
  { id: 'thingsToDo', label: 'Atrações', icon: MdOutlineAttractions, path: '/atracoes' },
  { id: 'restaurants', label: 'Restaurantes', icon: MdOutlineRestaurant, path: '/restaurantes' },
  { id: 'flights', label: 'Voos', icon: MdFlightTakeoff, path: '/voos' },
  { id: 'rentals', label: 'Aluguéis', icon: MdOutlineHouse, path: '/alugueis' },
];

// --- Animações Framer Motion ---
const panelVariants = {
  hidden: { opacity: 0, y: -20, height: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
  visible: { opacity: 1, y: 0, height: 'auto', transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1], staggerChildren: 0.1 } }, // Adicionado stagger
};

const itemFadeIn = { // Para itens dentro do painel
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const centralAreaVariants = { // Para animação suave da área central
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
};

const stickyNavVariants = {
    hidden: { opacity: 0, y: -15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.3, ease: "easeIn" } }
};


// --- Componente Principal HeaderAura ---
export default function HeaderAura() {
  const [isSticky, setIsSticky] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('hotels'); // Categoria inicial
  // const [searchTerm, setSearchTerm] = useState(''); // Estado para busca

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeSticky = window.scrollY > 30; // Ponto de ativação menor
      setIsSticky(shouldBeSticky);
      // Comentado: Fechar painel ao rolar - pode ser irritante
      // if (shouldBeSticky && isPanelOpen && window.scrollY > 100) {
      //   setIsPanelOpen(false);
      // }
    };

    handleScroll(); // Define o estado inicial no carregamento
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Dependência vazia para rodar só uma vez no mount/unmount

  const togglePanel = () => setIsPanelOpen(!isPanelOpen);

  // Lógica de exibição
  const showCompactSearch = isSticky && !isPanelOpen;
  const showExploreButton = !isSticky && !isPanelOpen;
  const showCloseButton = isPanelOpen; // Mostra botão fechar sempre que painel está aberto

  // Placeholders dinâmicos
  const currentCategoryLabel = categories.find(c => c.id === activeCategory)?.label || 'Tudo';
  const mainSearchPlaceholder = `Onde você quer ${activeCategory === 'flights' ? 'voar' : (activeCategory === 'restaurants' ? 'comer' : 'ir')}?`; // Mais específico
  const compactSearchPlaceholder = "Buscar destinos...";

  // Funções de exemplo para busca (precisam ser implementadas)
  const handleSearchSubmit = () => {
    console.log("Buscando por:", "termo da busca", "na categoria:", activeCategory);
    // Adicionar lógica de redirecionamento ou chamada de API
  };
  const handleKeyDownSearch = (event) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };


  return (
    <HeaderWrapper $isSticky={isSticky}>
      <TopBar>
        <LogoLink to="/">!TGUIA</LogoLink>

        <CentralActionArea>
          <AnimatePresence mode="wait">
            {showExploreButton && (
              <ExploreButton
                key="explore-btn"
                onClick={togglePanel}
                variants={centralAreaVariants}
                initial="initial" animate="animate" exit="exit"
              >
                <IoSearchOutline /> Explorar
              </ExploreButton>
            )}

            {showCompactSearch && (
               <motion.div
                 key="compact-search"
                 variants={centralAreaVariants}
                 initial="initial" animate="animate" exit="exit"
                 style={{ width: '100%', maxWidth: '400px', position: 'relative' }} // Ajuste de largura
                 onClick={togglePanel} // Clicar na busca compacta abre o painel
               >
                 <UnderlineInputContainer>
                    <InputIconWrapper className="left"><IoSearchOutline /></InputIconWrapper>
                    <StyledUnderlineInput
                       placeholder={compactSearchPlaceholder}
                       fontSize="15px"
                       readOnly // Torna apenas clicável para abrir painel
                    />
                    <Underline />
                 </UnderlineInputContainer>
               </motion.div>
            )}

             {showCloseButton && (
                 <ExploreButton // Reutiliza estilo, mas com classe e ícone diferente
                    key="close-btn"
                    className="close-button" // Aplica estilo de fechar
                    onClick={togglePanel}
                    variants={centralAreaVariants}
                    initial="initial" animate="animate" exit="exit"
                 >
                    <IoClose /> {/* Ícone de Fechar */}
                 </ExploreButton>
             )}
          </AnimatePresence>
        </CentralActionArea>

        <UserActions>
          <SignInButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Entrar
          </SignInButton>
          {/* Exemplo Ícone Usuário:
          <motion.button style={{ background:'none', border:'none', cursor:'pointer', fontSize:'28px', color: colors.greyDark }}>
             <IoPersonCircleOutline />
          </motion.button> */}
        </UserActions>
      </TopBar>

      {/* Painel de Exploração/Busca */}
      <AnimatePresence>
        {isPanelOpen && (
          <ExplorationPanel
            key="exploration-panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <PanelContent>
              {/* Barra de Busca Principal no Painel */}
              <motion.div variants={itemFadeIn} style={{ width: '100%', maxWidth: '700px', position: 'relative' }}>
                 <UnderlineInputContainer>
                    <InputIconWrapper className="left"><IoSearchOutline /></InputIconWrapper>
                    <StyledUnderlineInput
                       placeholder={mainSearchPlaceholder}
                       fontSize="18px"
                       // value={searchTerm}
                       // onChange={(e) => setSearchTerm(e.target.value)}
                       onKeyDown={handleKeyDownSearch}
                    />
                    <Underline />
                 </UnderlineInputContainer>
                 <FloatingSearchButton
                    onClick={handleSearchSubmit}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                 >
                    <IoSearchOutline />
                 </FloatingSearchButton>
              </motion.div>

              {/* Navegação por Categorias no Painel */}
              <CategoryNav variants={itemFadeIn}> {/* Animação nos itens */}
                {categories.map((cat) => {
                   const Icon = cat.icon;
                   const isActive = activeCategory === cat.id;
                   return (
                     <CategoryButton
                       key={cat.id}
                       $isActive={isActive}
                       onClick={() => setActiveCategory(cat.id)}
                       aria-pressed={isActive}
                     >
                       <Icon />
                       {cat.label}
                     </CategoryButton>
                   );
                })}
              </CategoryNav>

              {/* Links de Navegação Principal (Opcional aqui) */}
               {/* <motion.nav variants={itemFadeIn} style={{ display:'flex', gap: '30px', marginTop: '10px' }}>
                  <StickyNavLink to="/descobrir">Descobrir</StickyNavLink>
                  <StickyNavLink to="/viagens">Viagens</StickyNavLink>
               </motion.nav> */}

            </PanelContent>
          </ExplorationPanel>
        )}
      </AnimatePresence>

      {/* Navegação Secundária Sticky (Aparece quando sticky e painel fechado) */}
      <AnimatePresence>
         {isSticky && !isPanelOpen && (
             <StickySecondaryNavWrapper
                key="sticky-secondary-nav"
                variants={stickyNavVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
             >
                 <StickySecondaryNav>
                    {categories.map(cat => (
                        // Use NavLink do react-router-dom aqui para classe 'active' automática se instalado
                        <StickyNavLink
                            key={cat.id}
                            to={cat.path}
                            // Exemplo de classe ativa manual se não usar NavLink:
                            className={location.pathname === cat.path ? 'active' : ''}
                            // Ou use a categoria ativa da busca se preferir:
                            // className={activeCategory === cat.id ? 'active' : ''}
                        >
                            {cat.label}
                        </StickyNavLink>
                    ))}
                 </StickySecondaryNav>
             </StickySecondaryNavWrapper>
         )}
      </AnimatePresence>

    </HeaderWrapper>
  );
}