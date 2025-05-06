// src/components/HotelDetailHeader.jsx
import React from 'react';
import styled from 'styled-components';
import { FaStar, FaRegStar, FaMapMarkerAlt, FaShareSquare, FaHeart, FaRegHeart } from 'react-icons/fa'; // Usar FaRegHeart
import { IoSparklesOutline } from 'react-icons/io5'; // Para AI Summary

// --- Helper para Estrelas (pode mover para um arquivo utils) ---
const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;
  return (
    <>
      {[...Array(fullStars)].map((_, i) => <FaStar key={`full-${i}`} />)}
      {[...Array(emptyStars)].map((_, i) => <FaRegStar key={`empty-${i}`} />)}
    </>
  );
};

const HeaderWrapper = styled.div`
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  flex-wrap: wrap; // Permite quebrar linha em telas menores
  justify-content: space-between;
  align-items: flex-start; // Alinha itens ao topo
  gap: 15px;
`;

const InfoColumn = styled.div`
  flex: 1 1 60%; // Ocupa mais espaço, permite encolher
  min-width: 300px; // Largura mínima antes de quebrar
`;

const ActionColumn = styled.div`
  flex: 0 0 auto; // Não cresce, não encolhe, tamanho automático
  display: flex;
  align-items: center;
  gap: 15px;
  padding-top: 5px; // Pequeno ajuste de alinhamento visual

   @media (max-width: 500px) {
      width: 100%; // Ocupa largura total abaixo das infos
      justify-content: flex-end; // Alinha botões à direita
      padding-top: 0;
      gap: 10px;
  }
`;

const HotelName = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 10px;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 1.9rem;
  }
`;

const RatingReviewRow = styled.div`
  display: flex;
  flex-wrap: wrap; // Quebra linha se necessário
  align-items: center;
  gap: 10px 15px; // Espaço vertical e horizontal
  margin-bottom: 10px;
`;

const StarRating = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: rgb(255, 215, 0); // Dourado para estrelas preenchidas
  font-size: 1rem;

  span { // Nota numérica
    color: #1a1a1a;
    font-weight: 700;
    font-size: 1.1rem;
    margin-left: 5px;
  }
`;

const ReviewsLink = styled.a`
  font-size: 0.9rem;
  font-weight: 600;
  color: #555;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    color: #111;
  }
`;

const AiSummaryButton = styled.button`
    background: #f7f7f7;
    border: 1px solid #e0e0e0;
    color: #333;
    font-size: 0.8rem;
    font-weight: 500;
    padding: 4px 10px;
    border-radius: 6px;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #eee;
    }
`;


const LocationRankRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 15px;
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 10px;

  svg {
      margin-right: 2px; // Espaço após ícone
      flex-shrink: 0; // Impede que o ícone encolha
  }
`;

const LocationText = styled.span`
    /* Estilos se necessário */
`;

const RankText = styled.span`
    font-weight: 600;
    color: #333;
`;

const WriteReviewLink = styled.a`
    font-size: 0.9rem;
    color: #555;
    cursor: pointer;
     &:hover {
        text-decoration: underline;
        color: #111;
    }
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem; // Tamanho do ícone
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: #f0f0f0;
  }

  &.save-btn:hover {
      color: #e60023; // Vermelho no hover do salvar
  }
`;

const CheckAvailabilityButton = styled.button`
    background-color: #00aa6c; // Verde TripAdvisor
    color: white;
    font-weight: 700;
    font-size: 0.95rem;
    padding: 10px 20px;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    transition: background-color 0.2s ease;
     white-space: nowrap;

    &:hover {
        background-color:rgb(0, 0, 0); // Verde mais escuro
    }
      @media (max-width: 500px) {
        padding: 8px 15px;
        font-size: 0.9rem;
     }
`;


function HotelDetailHeader({ hotel }) {
  // Estado simples para favorito
  const [isSaved, setIsSaved] = React.useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: hotel.name,
        text: `Confira este hotel: ${hotel.name}`,
        url: window.location.href,
      }).catch((error) => console.log('Erro ao compartilhar:', error));
    } else {
      // Fallback para copiar link (simples)
      navigator.clipboard.writeText(window.location.href).then(() => {
          alert("Link copiado para a área de transferência!");
      }).catch(err => {
          alert("Não foi possível copiar o link.");
          console.error('Erro ao copiar link: ', err);
      });
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    // Adicionar lógica para persistir o estado salvo (API, localStorage, etc.)
  };

   const handleCheckAvailability = () => {
     alert(`Redirecionar para verificar disponibilidade de ${hotel.name}`);
     // Lógica de redirecionamento ou scroll para widget de booking
   }

   const handleReviewsClick = (e) => {
       e.preventDefault();
       const reviewsSection = document.getElementById('review-section');
       if (reviewsSection) {
           reviewsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
       }
   }

   const handleWriteReviewClick = (e) => {
       e.preventDefault();
        // Adicionar lógica para scroll ou mostrar formulário de review
        handleReviewsClick(e); // Scroll para a seção por enquanto
        // Se tiver um formulário específico:
        // const writeReviewElement = document.getElementById('write-review-form');
        // if (writeReviewElement) writeReviewElement.focus();
   }

   const handleAiSummaryClick = () => {
       alert("Mostrar resumo gerado por IA (funcionalidade futura)");
   }


  return (
    <HeaderWrapper>
      <InfoColumn>
        <HotelName>{hotel.name}</HotelName>

        <RatingReviewRow>
          <StarRating>
            <span>{hotel.rating.toFixed(1)}</span>
            {renderStars(hotel.rating)}
          </StarRating>
          <ReviewsLink href="#review-section" onClick={handleReviewsClick}>
            ({hotel.reviewsCount.toLocaleString('pt-BR')} reviews)
          </ReviewsLink>
           {/* Botão placeholder para AI Summary */}
          <AiSummaryButton onClick={handleAiSummaryClick}>
              <IoSparklesOutline /> AI Summary (beta)
          </AiSummaryButton>
        </RatingReviewRow>

        <LocationRankRow>
          <FaMapMarkerAlt size={14} />
          <LocationText>{hotel.detailedLocation?.address || hotel.location}</LocationText>
          {/* Adicionar ranking se disponível nos dados */}
          {/* <RankText>#1 of 60 hotels in Kovalam</RankText> */}
        </LocationRankRow>

         <WriteReviewLink href="#review-section" onClick={handleWriteReviewClick}>
             Write a review
         </WriteReviewLink>

      </InfoColumn>

      <ActionColumn>
        <ActionButton onClick={handleShare} title="Compartilhar">
          <FaShareSquare />
        </ActionButton>
        <ActionButton
            onClick={handleSave}
            title={isSaved ? "Remover dos Salvos" : "Salvar"}
            className="save-btn"
            aria-pressed={isSaved}
        >
          {isSaved ? <FaHeart style={{ color: '#e60023' }} /> : <FaRegHeart />}
        </ActionButton>
       
      </ActionColumn>
    </HeaderWrapper>
  );
}

export default HotelDetailHeader;