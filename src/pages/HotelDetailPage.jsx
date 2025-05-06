// src/pages/HotelDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { mockHotelData } from '../data/mockHotels'; // Importa os dados mock

// Importar os novos componentes que vamos criar
import HotelImageGallery from '../components/HotelDetailPage/HotelImageGallery';
import HotelDetailHeader from '../components/HotelDetailPage/HotelDetailHeader';
import HotelDescriptionSection from '../components/HotelDetailPage/HotelDescriptionSection';
import HotelReviewSection from '../components/HotelDetailPage/HotelReviewSection';
import HotelLocationSection from '../components/HotelDetailPage/HotelLocationSection';
import HotelContactSection from '../components/HotelDetailPage/HotelContactSection';
// import HotelBookingWidget from '../components/HotelBookingWidget'; // Se for criar separado

const DetailPageWrapper = styled.div`
  max-width: 1200px; // Um pouco mais estreito para focar no conteúdo
  margin: 30px auto 60px auto;
  padding: 0 20px;

  @media (max-width: 768px) {
    margin-top: 20px;
    padding: 0 15px;
  }
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  padding: 50px;
  color: #555;
`;

const ErrorMessage = styled(LoadingMessage)`
  color: #c00;
`;

// Layout principal da página de detalhes (ex: duas colunas)
const MainContentLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); // Layout responsivo
  gap: 40px;
  margin-top: 30px;

  @media (max-width: 992px) {
      grid-template-columns: 1fr; // Uma coluna em telas menores
      gap: 30px;
  }
`;

const LeftColumn = styled.div`
  /* Ocupa a primeira coluna */
`;

const RightColumn = styled.div`
  /* Ocupa a segunda coluna, pode ser sticky */
  /* position: sticky; */ // Descomentar se quiser o widget de booking sticky
  /* top: 90px; */ // Ajustar o top baseado na altura do header
  /* align-self: start; */
`;


function HotelDetailPage() {
  const { hotelId } = useParams(); // Pega o ID da URL
  const navigate = useNavigate(); // Para navegação programática (ex: erro)
  const [hotelData, setHotelData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simular login (troque por sua lógica real de autenticação)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    // Simula busca de dados - em um app real, seria uma chamada fetch/axios
    const foundHotel = mockHotelData.find(hotel => hotel.id.toString() === hotelId);

    // Simular um pequeno delay de rede
    const timer = setTimeout(() => {
      if (foundHotel) {
        setHotelData(foundHotel);
      } else {
        setError('Hotel não encontrado.');
        // Opcional: Redirecionar após um tempo
        // setTimeout(() => navigate('/hoteis'), 3000);
      }
      setIsLoading(false);
    }, 300); // Delay de 300ms

    return () => clearTimeout(timer); // Limpa o timer se o componente desmontar

  }, [hotelId, navigate]); // Re-executa se hotelId mudar

  // --- Renderização Condicional ---
  if (isLoading) {
    return <LoadingMessage>Carregando detalhes do hotel...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (!hotelData) {
    // Segurança extra, caso algo dê errado
    return <ErrorMessage>Ocorreu um erro ao carregar os dados.</ErrorMessage>;
  }

  // --- Renderização Principal ---
  return (
    <DetailPageWrapper>
      {/* 1. Galeria de Imagens */}
      <HotelImageGallery images={hotelData.images || []} hotelName={hotelData.name} />

      {/* 2. Cabeçalho com Infos e Ações */}
      <HotelDetailHeader hotel={hotelData} />

      {/* 3. Layout Principal (Descrição, Reviews vs Localização, Contato) */}
      <MainContentLayout>
          <LeftColumn>
              {/* 4. Descrição */}
              <HotelDescriptionSection description={hotelData.description} />

              {/* 5. Reviews */}
              <HotelReviewSection
                  reviews={hotelData.reviews || []}
                  hotelId={hotelData.id}
                  isLoggedIn={isLoggedIn} // Passe o estado de login real
              />
          </LeftColumn>

          <RightColumn>
              {/* 6. Localização/Mapa */}
              <HotelLocationSection location={hotelData.detailedLocation} hotelName={hotelData.name} />

              {/* 7. Contato */}
              <HotelContactSection contact={hotelData.contact} />

              {/* 8. Widget de Booking (Opcional) */}
              {/* <HotelBookingWidget price={hotelData.price} /> */}
          </RightColumn>
      </MainContentLayout>

    </DetailPageWrapper>
  );
}

export default HotelDetailPage;