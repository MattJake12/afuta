// src/components/HeaderAura.jsx
import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation as useRouterLocation, useNavigate } from 'react-router-dom';
import {
  IoSearchOutline, IoClose, IoPersonCircleOutline,
  IoRestaurantOutline, IoHappyOutline, IoSparklesOutline,
  IoGameControllerOutline, IoPawOutline, IoLocationSharp
} from 'react-icons/io5';

// --- Paleta de Cores (Aura) ---
const colors = {
  black: '#0A0A0A', white: '#FFFFFF', silver: '#CCCCCC', greyLight: '#F5F5F5',
  greyMedium: '#888888', greyDark: '#333333',
  whiteTransparentSoft: 'rgba(255, 255, 255, 0.80)',
  whiteTransparentMedium: 'rgba(255, 255, 255, 0.60)',
  blackTransparentSoft: 'rgba(10, 10, 10, 0.08)',
};
// --- Breakpoints ---
const breakpoints = { tablet: '992px', mobile: '768px' };

// --- STYLED COMPONENTS DEFINITIONS ---
const HeaderWrapper = styled(motion.header)`
  position: sticky; top: 0; left: 0; width: 100%; z-index: 1000;
  background: ${({ $isSticky }) => $isSticky ? colors.whiteTransparentSoft : colors.white};
  @supports (backdrop-filter: blur(10px)) or (-webkit-backdrop-filter: blur(10px)) {
    backdrop-filter: ${({ $isSticky }) => $isSticky ? 'blur(12px)' : 'none'};
    -webkit-backdrop-filter: ${({ $isSticky }) => $isSticky ? 'blur(12px)' : 'none'};
  }
  border-bottom: 1px solid ${({ $isSticky }) => $isSticky ? colors.blackTransparentSoft : 'transparent'};
  transition: background 0.4s ease, backdrop-filter 0.4s ease, -webkit-backdrop-filter 0.4s ease, border-color 0.4s ease;
`;
const TopBar = styled.div`
  display: flex; justify-content: space-between; align-items: center;
  max-width: 1440px; margin: 0 auto; padding: 0 30px; height: 70px; position: relative;
  @media (max-width: ${breakpoints.tablet}) { padding: 0 20px; height: 65px; }
`;
const LogoLink = styled(Link)`
  text-decoration: none; color: ${colors.black}; font-weight: 900; font-size: 34px;
  font-family: 'Montserrat', sans-serif; letter-spacing: -1.8px; flex-shrink: 0;
  @media (max-width: ${breakpoints.mobile}) { font-size: 28px; }
`;
const UserActions = styled.div`
  display: flex; align-items: center; gap: 18px; flex-shrink: 0;
`;
const MotionLink = motion(Link);
const SignInButton = styled(MotionLink)`
  background: ${colors.black}; color: ${colors.white}; border: none;
  padding: 10px 28px; border-radius: 30px; font-weight: 700; font-size: 15px;
  cursor: pointer; transition: background 0.2s ease; white-space: nowrap; text-decoration: none;
  display: inline-flex; align-items: center; justify-content: center;
  &:hover { background: ${colors.greyDark}; }
  @media (max-width: ${breakpoints.mobile}) { padding: 8px 18px; font-size: 14px; }
`;
const CentralActionArea = styled(motion.div)`
  position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
  display: flex; align-items: center; min-width: 150px; justify-content: center;
`;
const ExploreButton = styled(motion.button)`
  background: transparent; color: ${colors.black}; border: 1px solid ${colors.silver};
  padding: 10px 22px; border-radius: 30px; font-weight: 600; font-size: 15px;
  cursor: pointer; display: flex; align-items: center; gap: 8px;
  transition: all 0.2s ease; white-space: nowrap;
  svg { font-size: 18px; }
  &:hover { background: ${colors.greyLight}; border-color: ${colors.greyMedium}; }
  &.close-button {
    border: none; background: ${colors.greyLight}; padding: 8px; width: 40px; height: 40px;
    justify-content: center; svg { font-size: 22px; }
    &:hover { background: ${colors.silver}; }
  }
`;
const UnderlineInputContainer = styled(motion.div)`
  position: relative; width: 100%; padding-bottom: 8px;
`;
const StyledUnderlineInput = styled.input`
  width: 100%; border: none; background: transparent; outline: none; color: ${colors.black};
  font-size: ${({ fontSize }) => fontSize || '16px'}; padding: 8px 45px 8px 35px;
  position: relative; z-index: 1;
  &::placeholder { color: ${colors.greyMedium}; transition: all 0.3s ease; opacity: 1; }
  &:focus::placeholder { opacity: 0; }
`;
const Underline = styled(motion.div)`
  position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
  background-color: ${colors.silver}; transform-origin: center;
  transition: height 0.3s ease, background-color 0.3s ease; z-index: 0;
  ${UnderlineInputContainer}:focus-within & { height: 2px; background-color: ${colors.black}; }
`;
const InputIconWrapper = styled(motion.div)`
  position: absolute; top: 50%; transform: translateY(-50%); margin-top: 4px;
  color: ${colors.greyMedium}; font-size: 20px; z-index: 2; pointer-events: none;
  &.left { left: 5px; }
`;
const FloatingSearchButton = styled(motion.button)`
  position: absolute; right: -5px; top: 50%; transform: translateY(-50%); margin-top: 4px;
  width: 42px; height: 42px; border-radius: 50%; background: ${colors.black}; color: ${colors.white};
  border: none; display: flex; align-items: center; justify-content: center; cursor: pointer;
  z-index: 3; box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
  transition: background 0.2s ease, transform 0.2s ease;
  svg { font-size: 22px; }
  &:hover { background: ${colors.greyDark}; transform: translateY(-50%) scale(1.08); }
`;
const ExplorationPanel = styled(motion.div)`
  position: absolute; top: 100%; left: 0; right: 0;
  background: ${colors.whiteTransparentMedium};
  @supports (backdrop-filter: blur(10px)) or (-webkit-backdrop-filter: blur(10px)) {
    backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px);
  }
  border-top: 1px solid ${colors.whiteTransparentSoft};
  box-shadow: 0 8px 32px 0 ${colors.blackTransparentSoft};
  padding: 50px 30px 40px 30px; z-index: 999; overflow: hidden; border-radius: 0 0 20px 20px;
  @media (max-width: ${breakpoints.tablet}) { padding: 40px 20px 30px 20px; }
`;
const PanelContent = styled.div`
  max-width: 800px; margin: 0 auto; display: flex; flex-direction: column;
  align-items: center; gap: 30px;
`;
const CategoryNav = styled.nav`
  display: flex; justify-content: center; flex-wrap: wrap;
  gap: 20px 30px; width: 100%;
`;
const CategoryButton = styled.button`
  background: none; border: none; cursor: pointer; display: flex; flex-direction: column;
  align-items: center; gap: 8px; padding: 5px; text-align: center;
  color: ${({ $isActive }) => $isActive ? colors.black : colors.greyMedium};
  font-weight: ${({ $isActive }) => $isActive ? '700' : '500'};
  font-size: 14px; transition: color 0.2s ease, transform 0.2s ease; position: relative;
  svg { font-size: 28px; margin-bottom: 2px; transition: transform 0.2s ease; }
  &:hover { color: ${colors.black}; transform: translateY(-3px); svg { transform: scale(1.05); } }
  &::after {
    content: ''; display: block; width: 5px; height: 5px; border-radius: 50%;
    background-color: ${colors.black}; position: absolute; bottom: -10px; left: 50%;
    transform: translateX(-50%) scale(${({ $isActive }) => $isActive ? 1 : 0});
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  @media (max-width: ${breakpoints.mobile}) { font-size: 13px; svg { font-size: 24px; } gap: 5px 15px; }
`;
const StickySecondaryNavWrapper = styled(motion.div)`
  background: ${colors.white}; border-bottom: 1px solid ${colors.greyLight}; padding: 0 30px;
  width: 100%; overflow-x: auto; -ms-overflow-style: none; scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;
const StickySecondaryNav = styled.nav`
  max-width: 1440px; margin: 0 auto; display: flex; justify-content: center;
  gap: 40px; height: 45px; align-items: center;
  @media (max-width: ${breakpoints.tablet}) { justify-content: flex-start; gap: 30px; }
`;
const StickyNavLink = styled(Link)`
  text-decoration: none; color: ${colors.greyMedium}; font-weight: 600; font-size: 15px;
  padding: 10px 0; position: relative; white-space: nowrap; transition: color 0.2s ease;
  &:hover { color: ${colors.black}; }
  &.active { color: ${colors.black}; font-weight: 700; }
  &.active::after {
    content: ''; position: absolute; bottom: 0; left: 0; width: 100%; height: 2px;
    background-color: ${colors.black}; transform-origin: left;
    animation: underlineGrow 0.3s ease-out;
  }
  @keyframes underlineGrow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
`;
const SearchResultsDropdown = styled(motion.div)`
  position: absolute; top: calc(100% + 10px); left: 0; right: 0;
  background: ${colors.white}; border: 1px solid ${colors.greyLight}; border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1); max-height: 300px; overflow-y: auto; z-index: 1001;
`;
const SearchResultItemStyled = styled.div`
  display: flex; align-items: center; padding: 12px 15px; gap: 12px; cursor: pointer;
  text-decoration: none; color: ${colors.black}; border-bottom: 1px solid ${colors.greyLight};
  transition: background-color 0.2s ease;
  &:last-child { border-bottom: none; }
  &:hover { background-color: ${colors.greyLight}; }
  img, .placeholder-icon {
    width: 40px; height: 40px; border-radius: 4px; object-fit: cover; flex-shrink: 0;
  }
  .placeholder-icon {
    display: flex; align-items: center; justify-content: center;
    background-color: ${colors.greyLight}; /* Para dar um fundo ao ícone */
  }
  .placeholder-icon svg { width: 24px; height: 24px; color: ${colors.greyMedium}; }
  .info { display: flex; flex-direction: column; overflow: hidden; }
  .name { font-weight: 600; font-size: 15px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .category-tag { font-size: 12px; color: ${colors.greyMedium}; }
`;
const NoResultsMessage = styled.div`
  padding: 20px; text-align: center; color: ${colors.greyMedium}; font-size: 14px;
`;

// --- Dados das Categorias ---
const categoriesConfig = [
  { id: 'alimentacao', label: 'Alimentação', icon: IoRestaurantOutline, path: '/alimentacao' },
  { id: 'infantil',    label: 'Infantil',    icon: IoHappyOutline,        path: '/infantil' },
  { id: 'beleza',      label: 'Beleza',      icon: IoSparklesOutline,     path: '/beleza' },
  { id: 'lazer',       label: 'Lazer',       icon: IoGameControllerOutline, path: '/lazer' },
  { id: 'pets',        label: 'Pets',        icon: IoPawOutline,          path: '/pets' },
];

// --- Animações Framer Motion ---
const panelVariants = { hidden: { opacity: 0, y: -20, height: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } }, visible: { opacity: 1, y: 0, height: 'auto', transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1], staggerChildren: 0.1 } } };
const itemFadeIn = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } } };
const centralAreaVariants = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } }, exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } } };
const stickyNavVariants = { hidden: { opacity: 0, y: -15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }, exit: { opacity: 0, y: -15, transition: { duration: 0.3, ease: "easeIn" } } };
const dropdownVariants = { hidden: { opacity: 0, y: -10, transition: { duration: 0.2 } }, visible: { opacity: 1, y: 0, transition: { duration: 0.2 } } };

// --- Componente Principal HeaderAura ---
export default function HeaderAura({ allLocais = [] }) {
  const [isSticky, setIsSticky] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(categoriesConfig[0].id);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResultsDropdown, setShowResultsDropdown] = useState(false);

  const routerLocation = useRouterLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 30);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      setShowResultsDropdown(false);
      return;
    }
    const RSLimit = 7;
    const filtered = allLocais.filter(local => {
      const localCategoriaNorm = local.categoria.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const activeCategoriaNorm = activeCategory.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const categoriaMatch = localCategoriaNorm === activeCategoriaNorm;
      
      const termNormalized = searchTerm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const nameMatch = local.nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(termNormalized);
      const descMatch = local.descricao_curta && local.descricao_curta.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(termNormalized);
      const tagsMatch = local.tags && local.tags.some(tag => tag.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(termNormalized));
      const termMatch = nameMatch || descMatch || tagsMatch;
      
      return categoriaMatch && termMatch;
    }).slice(0, RSLimit);

    setSearchResults(filtered);
    setShowResultsDropdown(true); // Mostrar se houver termo
  }, [searchTerm, activeCategory, allLocais]);

  const togglePanel = () => {
    const newPanelState = !isPanelOpen;
    setIsPanelOpen(newPanelState);
    if (!newPanelState) { setSearchTerm(''); setShowResultsDropdown(false); }
  };
  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId); setSearchTerm(''); setShowResultsDropdown(false);
  };
  const handleSearchInputChange = (event) => setSearchTerm(event.target.value);
  const handleSearchSubmit = () => {
    console.log("Busca submetida para:", searchTerm, "na categoria:", activeCategory);
    // Aqui poderia navegar para uma página de resultados de busca mais completa se o dropdown não for suficiente
    // Ex: navigate(`/busca?q=${searchTerm}&cat=${activeCategory}`);
    setSearchTerm(''); setShowResultsDropdown(false);
    if (searchResults.length === 1) { // Se só um resultado, navega direto
        handleResultItemClick(searchResults[0]);
    }
  };
  const handleKeyDownSearch = (event) => { if (event.key === 'Enter') handleSearchSubmit(); };
  const handleResultItemClick = (local) => {
    navigate(`/local/${local.id}`);
    setSearchTerm(''); setShowResultsDropdown(false); setIsPanelOpen(false);
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showResultsDropdown && 
          !event.target.closest('.search-input-container-class') &&
          !event.target.closest('.search-results-dropdown-class')) {
        setShowResultsDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showResultsDropdown]);

  const showCompactSearch = isSticky && !isPanelOpen;
  const showExploreButton = !isSticky && !isPanelOpen;
  const showCloseButton = isPanelOpen;
  const currentCategoryConfig = useMemo(() => categoriesConfig.find(c => c.id === activeCategory) || categoriesConfig[0], [activeCategory]);
  const mainSearchPlaceholder = `Buscar em ${currentCategoryConfig.label}...`;
  const compactSearchPlaceholder = "Buscar destinos...";

  return (
    <HeaderWrapper $isSticky={isSticky}>
      <TopBar>
        <LogoLink to="/">!TGUIA</LogoLink>
        <CentralActionArea>
          <AnimatePresence mode="wait">
            {showExploreButton && <ExploreButton key="explore-btn" onClick={togglePanel} variants={centralAreaVariants} initial="initial" animate="animate" exit="exit"><IoSearchOutline /> Explorar</ExploreButton>}
            {showCompactSearch && (
               <motion.div key="compact-search" variants={centralAreaVariants} initial="initial" animate="animate" exit="exit" style={{ width: '100%', maxWidth: '400px', position: 'relative' }} onClick={togglePanel}>
                 <UnderlineInputContainer>
                    <InputIconWrapper className="left"><IoSearchOutline /></InputIconWrapper>
                    <StyledUnderlineInput placeholder={compactSearchPlaceholder} fontSize="15px" readOnly />
                    <Underline />
                 </UnderlineInputContainer>
               </motion.div>
            )}
            {showCloseButton && <ExploreButton key="close-btn" className="close-button" onClick={togglePanel} variants={centralAreaVariants} initial="initial" animate="animate" exit="exit"><IoClose /></ExploreButton>}
          </AnimatePresence>
        </CentralActionArea>
        <UserActions>
          <SignInButton to="/login" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Entrar</SignInButton>
        </UserActions>
      </TopBar>

      <AnimatePresence>
        {isPanelOpen && (
          <ExplorationPanel key="exploration-panel" variants={panelVariants} initial="hidden" animate="visible" exit="hidden">
            <PanelContent>
              <motion.div variants={itemFadeIn} style={{ width: '100%', maxWidth: '700px', position: 'relative' }} className="search-input-container-class">
                 <UnderlineInputContainer>
                    <InputIconWrapper className="left"><IoSearchOutline /></InputIconWrapper>
                    <StyledUnderlineInput
                       placeholder={mainSearchPlaceholder} fontSize="18px" value={searchTerm}
                       onChange={handleSearchInputChange} onKeyDown={handleKeyDownSearch}
                       onFocus={() => (searchTerm.trim() !== '' || searchResults.length > 0) && setShowResultsDropdown(true)}
                    />
                    <Underline />
                 </UnderlineInputContainer>
                 <FloatingSearchButton onClick={handleSearchSubmit} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}><IoSearchOutline /></FloatingSearchButton>
                 
                 <AnimatePresence>
                    {showResultsDropdown && (searchResults.length > 0 || searchTerm.trim() !== '') && (
                      <SearchResultsDropdown
                        key={searchResults.length > 0 ? "search-results" : "no-results"}
                        className="search-results-dropdown-class"
                        variants={dropdownVariants} initial="hidden" animate="visible" exit="hidden"
                      >
                        {searchResults.length > 0 ? (
                          searchResults.map(local => (
                            <SearchResultItemStyled key={local.id} onClick={() => handleResultItemClick(local)}>
                              {local.imagens && local.imagens.length > 0 && local.imagens[0] ? (
                                <img src={local.imagens[0]} alt={local.nome}
                                  onError={(e) => { 
                                    e.target.style.display = 'none'; 
                                    const placeholder = e.target.nextElementSibling; 
                                    if(placeholder && placeholder.classList.contains('placeholder-icon')) placeholder.style.display = 'flex'; 
                                  }}/>
                              ) : null}
                              <div className="placeholder-icon" style={{ display: (local.imagens && local.imagens.length > 0 && local.imagens[0]) ? 'none' : 'flex' }}>
                                  <IoLocationSharp />
                              </div>
                              <div className="info">
                                <span className="name">{local.nome}</span>
                                <span className="category-tag">{local.categoria}</span>
                              </div>
                            </SearchResultItemStyled>
                          ))
                        ) : (
                          <NoResultsMessage>Nenhum resultado para "{searchTerm}" em {currentCategoryConfig.label}.</NoResultsMessage>
                        )}
                      </SearchResultsDropdown>
                    )}
                  </AnimatePresence>
              </motion.div>

              <motion.div variants={itemFadeIn}>
                <CategoryNav>
                  {categoriesConfig.map((cat) => {
                    const Icon = cat.icon;
                    const isActive = activeCategory === cat.id;
                    return <CategoryButton key={cat.id} $isActive={isActive} onClick={() => handleCategoryClick(cat.id)} aria-pressed={isActive}><Icon /> {cat.label}</CategoryButton>;
                  })}
                </CategoryNav>
              </motion.div>
            </PanelContent>
          </ExplorationPanel>
        )}
      </AnimatePresence>

      <AnimatePresence>
         {isSticky && !isPanelOpen && (
             <StickySecondaryNavWrapper key="sticky-nav" variants={stickyNavVariants} initial="hidden" animate="visible" exit="exit">
                 <StickySecondaryNav>
                    {categoriesConfig.map(cat => (
                        <StickyNavLink key={cat.id} to={cat.path} className={routerLocation.pathname.startsWith(cat.path) ? 'active' : ''}>
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