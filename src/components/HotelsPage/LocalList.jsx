// src/components/ListPageComponents/LocalList.jsx
import React from 'react';
import styled from 'styled-components';
import LocalCard from './LocalCard';
import { motion } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa'; // Usar FaSpinner

// --- Paleta e Styled Components (sem mudanças significativas, exceto LocationStatus) ---
const colors = { textPrimary: '#1a1a1a', textSecondary: '#555', borderLight: '#eee', selectBorder: '#ccc', selectBorderHover: '#888', selectBorderFocus: '#a0a0a0', selectFocusShadow: 'rgba(160, 160, 160, 0.2)', errorRed: '#dc3545', infoGray: '#6c757d' };
const ListWrapper = styled.div` padding-top: 20px; `; // Ajuste padding se ListContentContainer já tiver
const ListHeader = styled.div`
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid ${colors.borderLight};
  @media (max-width: 550px) { flex-direction: column; align-items: stretch; gap: 15px; border-bottom: none; margin-bottom: 15px; }
`;
const ListTitle = styled.h2`
  font-family: 'Poppins', sans-serif; font-size: 1.7rem; font-weight: 600; color: ${colors.textPrimary}; margin: 0;
  @media (max-width: 550px) { font-size: 1.5rem; text-align: center; }
`;
const SortContainer = styled.div`
  display: flex; align-items: center; gap: 10px;
   @media (max-width: 550px) { justify-content: center; }
`;
const SortLabel = styled.label`
  font-family: 'Inter', sans-serif; font-size: 0.9rem; color: ${colors.textSecondary};
  font-weight: 500; white-space: nowrap;
`;
const SortSelect = styled.select`
  font-family: 'Inter', sans-serif; padding: 9px 35px 9px 15px; font-size: 0.9rem;
  border: 1px solid ${colors.selectBorder}; border-radius: 8px; background-color: white;
  cursor: pointer; appearance: none;
  background-image: url('data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="%23555" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/></svg>');
  background-repeat: no-repeat; background-position: right 12px center; background-size: 14px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease; min-width: 180px;
  &:hover { border-color: ${colors.selectBorderHover}; }
  &:focus { outline: none; border-color: ${colors.selectBorderFocus}; box-shadow: 0 0 0 3px ${colors.selectFocusShadow}; }
`;
const LocalGrid = styled(motion.div)`
  display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px 25px; // Ajuste minmax/gap conforme necessário
  @media (max-width: 768px) { grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }
  @media (max-width: 480px) { grid-template-columns: 1fr; gap: 20px; }
`;
const LocationStatus = styled.div`
  font-size: 0.8rem; color: ${colors.infoGray}; margin-top: 5px; margin-bottom: 20px;
  text-align: right; display: flex; align-items: center; justify-content: flex-end; gap: 5px;
  min-height: 1.2em; /* Para evitar pulos de layout */
  @media (max-width: 550px) { justify-content: center; text-align: center; margin-top: 10px; }
  &.error { color: ${colors.errorRed}; font-weight: 500; }
  svg { animation: spin 1.5s linear infinite; } /* Animação do spinner */
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
`;
// --- Fim Styled Components ---

const gridVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08, duration: 0.4 } } }; // Stagger mais rápido

function LocalList({ locais = [], currentSort, onSortChange, categoryName, userLocationAvailable, locationLoading, locationError }) { // Default locais to empty array

  if (locais.length === 0 && !locationLoading) { // Só mostra 'nenhum encontrado' se não estiver carregando localização também
    return <p style={{textAlign: 'center', padding: '40px 20px', color: colors.textSecondary}}> Nenhum local encontrado para "{categoryName}". </p>;
  }

  return (
    <ListWrapper>
       <ListHeader>
            <ListTitle>{categoryName || "Locais"}</ListTitle>
            <SortContainer>
                <SortLabel htmlFor="sort-select">Ordenar por:</SortLabel>
                <SortSelect id="sort-select" value={currentSort} onChange={(e) => onSortChange(e.target.value)}>
                    <option value="rating-desc">Melhor Avaliados</option>
                    {/* Mostra opção de distância apenas se disponível e não estiver carregando */}
                    {userLocationAvailable && !locationLoading && (
                        <option value="distance-asc">Mais Próximos</option>
                    )}
                    <option value="rating-asc">Pior Avaliados</option>
                    <option value="name-asc">Nome (A-Z)</option>
                    <option value="name-desc">Nome (Z-A)</option>
                </SortSelect>
            </SortContainer>
       </ListHeader>

        {/* Mensagem de Status da Geolocalização */}
        <LocationStatus className={locationError ? 'error' : ''}>
             {locationLoading && <><FaSpinner /> Obtendo localização...</>}
             {locationError && locationError}
             {!userLocationAvailable && !locationLoading && !locationError && "(Permita localização para ordenar por distância)"}
        </LocationStatus>


      <LocalGrid variants={gridVariants} initial="hidden" animate="visible">
        {locais.map((local) => (
          // Passa a distância para o Card. local.distance será null se userLocation não estiver disponível
          <LocalCard key={local.id} local={local} distance={local.distance}/>
        ))}
      </LocalGrid>
    </ListWrapper>
  );
}

export default LocalList;