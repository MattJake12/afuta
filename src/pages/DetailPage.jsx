// src/pages/DetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

import LocalCover from '../components/HotelDetailPage/LocalCover';
import HotelImageGallery from '../components/HotelDetailPage/HotelImageGallery'; // Mantendo nome antigo por compatibilidade
import HotelDetailHeader from '../components/HotelDetailPage/HotelDetailHeader'; // Mantendo nome antigo
import HotelDescriptionSection from '../components/HotelDetailPage/HotelDescriptionSection'; // Mantendo nome antigo
import HotelReviewSection from '../components/HotelDetailPage/HotelReviewSection'; // Mantendo nome antigo
import HotelLocationSection from '../components/HotelDetailPage/HotelLocationSection'; // Mantendo nome antigo
import HotelContactSection from '../components/HotelDetailPage/HotelContactSection'; // Mantendo nome antigo (ou importe LocalContactSection se renomeou)
import LocalOpeningHours from '../components/HotelDetailPage/LocalOpeningHours';
import LocalFeaturesSection from '../components/HotelDetailPage/LocalFeaturesSection'; // <-- Importar novo componente

import LocalLocationMapSection from '../components/HotelDetailPage/LocalLocationMapSection'; // Importado o componente de mapa


const colors = { black: '#0A0A0A', silver: '#CCCCCC' };

const DetailPageWrapper = styled.div``;
const MainDetailContentContainer = styled.div`
  max-width: 1200px; margin: 0 auto 60px auto; padding: 0 20px;
  @media (max-width: 768px) { padding: 0 15px; margin-bottom: 40px; }
`;
const LoadingMessage = styled.p` text-align: center; font-size: 1.2rem; padding: 50px; color: #555; `;
const ErrorMessage = styled.div`
  text-align: center; font-size: 1.2rem; padding: 50px; color: #c00;
  button { margin-left: 10px; padding: 5px 10px; cursor: pointer; background-color: #f0f0f0; border: 1px solid #ccc; border-radius: 4px; &:hover { background-color: #e0e0e0; } }
`;
const MainContentLayout = styled.div`
  display: grid; grid-template-columns: 2fr 1fr; gap: 40px;
  @media (max-width: 992px) { grid-template-columns: 1fr; gap: 30px; }
`;
const LeftColumn = styled.div` display: flex; flex-direction: column; gap: 30px; `;
const RightColumn = styled.div` display: flex; flex-direction: column; gap: 30px; `;

function DetailPage({ allLocais }) {
  const { localId } = useParams();
  const navigate = useNavigate();
  const [localData, setLocalData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulação

  useEffect(() => {
    if (!allLocais || allLocais.length === 0) { setIsLoading(true); return; }
    setIsLoading(true); setError(null);
    const foundLocal = allLocais.find(loc => loc.id.toString() === localId);
    if (foundLocal) {
      setLocalData(foundLocal);
    } else {
      setError(`Local com ID "${localId}" não encontrado.`);
    }
    setIsLoading(false);
  }, [localId, allLocais]);

  if (isLoading) return <LoadingMessage>Carregando detalhes do local...</LoadingMessage>;
  if (error) return <ErrorMessage>{error} <button onClick={() => navigate('/')}>Voltar para Home</button></ErrorMessage>;
  if (!localData) return <ErrorMessage>Dados do local não disponíveis. <button onClick={() => navigate('/')}>Voltar para Home</button></ErrorMessage>;

  // Mapeamento de dados para os componentes
  const firstImageForCover = localData.imagens && localData.imagens.length > 0 ? localData.imagens[0] : null;
  const galleryImagesForComponent = localData.imagens?.map((imgPath, index) => ({ id: `${localData.id}-img-${index}`, url: imgPath, caption: `${localData.nome} - Imagem ${index + 1}` })) || [];
  const headerComponentData = { id: localData.id, name: localData.nome, rating: localData.estrelas || 0, reviewsCount: localData.reviews?.length || 0, location: localData.localizacao_texto, category: localData.categoria };
  const contactComponentData = localData.contactos || {};
  const featuresComponentData = localData.recursos || [];
  
  // Mapeamento específico para o componente de localização/mapa
  const locationMapData = {
    address: localData.localizacao_texto,
    lat: localData.coordenadas?.latitude,
    lng: localData.coordenadas?.longitude,
  };

  return (
    <DetailPageWrapper>
      <LocalCover
        backgroundImage={firstImageForCover}
        localName={localData.nome}
        categoryName={localData.categoria}
      />
      <MainDetailContentContainer>
        <HotelImageGallery images={galleryImagesForComponent} hotelName={localData.nome} />
        <HotelDetailHeader hotel={headerComponentData} />
        <MainContentLayout>
            <LeftColumn>
                <HotelDescriptionSection description={localData.descricao_longa || localData.descricao_curta || "Nenhuma descrição disponível."} />
                <HotelReviewSection
                    reviews={localData.reviews || []}
                    hotelId={localData.id}
                    isLoggedIn={isLoggedIn}
                />
            </LeftColumn>
            <RightColumn>
                <LocalOpeningHours
                    horarios={localData.horario_funcionamento || []}
                    localName={localData.nome}
                />
                 <LocalFeaturesSection recursos={featuresComponentData} />
                 <LocalLocationMapSection // Componente de mapa atualizado
                     location={locationMapData}
                     localName={localData.nome}
                 />
                <HotelContactSection contact={contactComponentData} />
            </RightColumn>
        </MainContentLayout>
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link to="/" style={{ textDecoration: 'none', color: colors.black, fontWeight: '600', padding: '10px 20px', border: `1px solid ${colors.silver}`, borderRadius: '20px', transition: 'background-color 0.2s, color 0.2s' }}
              onMouseEnter={(e) => { e.target.style.backgroundColor = colors.black; e.target.style.color = '#fff';}}
              onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = colors.black;}}
          >
              Voltar para a Página Inicial
          </Link>
        </div>
      </MainDetailContentContainer>
    </DetailPageWrapper>
  );
}

export default DetailPage;