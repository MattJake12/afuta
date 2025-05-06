// src/components/HotelReviewSection.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaStar, FaRegStar, FaUserCircle } from 'react-icons/fa';

const ReviewsWrapper = styled.section`
  margin-bottom: 30px;
  padding-top: 20px; // Espaço acima se vier após a descrição
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1c1c1c;
  margin-bottom: 20px;
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const ReviewCard = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 15px;
  background-color: #fff;
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const AuthorInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const AuthorName = styled.span`
    font-weight: 600;
    color: #333;
    font-size: 0.95rem;
`;

const ReviewRating = styled.div`
  display: flex;
  gap: 3px;
  color: #FFC107; // Amarelo estrela
  font-size: 0.9rem;
  margin-top: 2px;
`;

const ReviewText = styled.p`
  font-size: 0.9rem;
  color: #555;
  line-height: 1.6;
`;

const NoReviewsMessage = styled.p`
    color: #555;
    font-style: italic;
`;

// --- Formulário de Nova Review ---
const WriteReviewContainer = styled.div`
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 20px;
`;

const LoginPrompt = styled.p`
    color: #555;
    font-size: 0.95rem;
    button {
        background: none;
        border: none;
        color:rgb(0, 0, 0);
        font-weight: 600;
        cursor: pointer;
        text-decoration: underline;
        padding: 0 4px;
    }
`;

const ReviewForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const RatingInputContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    span { font-weight: 600; }
`;

const StarInputButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5rem; // Tamanho das estrelas clicáveis
    color: #ccc; // Cor padrão (vazia)
    padding: 2px;
    transition: color 0.2s ease;

    &.active, &:hover {
        color: #FFC107; // Cor preenchida
    }
`;


const ReviewTextarea = styled.textarea`
    width: 100%;
    min-height: 100px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 0.95rem;
    resize: vertical;
    font-family: inherit;

    &:focus {
        outline: none;
        border-color:rgb(36, 36, 36);
        box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
    }
`;

const SubmitButton = styled.button`
    background-color:rgb(0, 0, 0);
    color: white;
    font-weight: 600;
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    align-self: flex-start; // Alinha à esquerda

    &:hover {
        background-color:rgb(0, 0, 0);
    }
     &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;


// Helper para estrelas (pode ser movido para utils)
const renderReviewStars = (rating) => {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;
  return (
    <>
      {[...Array(fullStars)].map((_, i) => <FaStar key={`full-${i}`} />)}
      {[...Array(emptyStars)].map((_, i) => <FaRegStar key={`empty-${i}`} />)}
    </>
  );
};


function HotelReviewSection({ reviews = [], hotelId, isLoggedIn }) {
    const [newReviewText, setNewReviewText] = useState('');
    const [newReviewRating, setNewReviewRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0); // Para efeito hover nas estrelas

    const handleLoginClick = () => {
        alert("Redirecionar para a página de login");
        // Implementar navegação para login
    }

    const handleSubmitReview = (e) => {
        e.preventDefault();
        if (newReviewRating === 0 || !newReviewText.trim()) {
            alert("Por favor, selecione uma avaliação e escreva seu comentário.");
            return;
        }
        const newReview = {
            id: Date.now(), // ID temporário
            author: "Você (Usuário Logado)", // Pegar nome do usuário real
            rating: newReviewRating,
            text: newReviewText,
        };
        console.log("Enviando review:", newReview, "para hotel ID:", hotelId);
        alert("Review enviado com sucesso! (Simulação)");
        // Aqui você enviaria para a API
        // E talvez atualizaria a lista de reviews localmente
        setNewReviewText('');
        setNewReviewRating(0);
    };

    return (
        // Adiciona ID para permitir scroll até aqui
        <ReviewsWrapper id="review-section">
            <SectionTitle>Avaliações</SectionTitle>
            {reviews.length > 0 ? (
                <ReviewList>
                    {reviews.map((review) => (
                        <ReviewCard key={review.id}>
                            <ReviewHeader>
                                <FaUserCircle size={32} color="#ccc" />
                                <AuthorInfo>
                                     <AuthorName>{review.author}</AuthorName>
                                      <ReviewRating>
                                        {renderReviewStars(review.rating)}
                                      </ReviewRating>
                                </AuthorInfo>
                            </ReviewHeader>
                            <ReviewText>{review.text}</ReviewText>
                        </ReviewCard>
                    ))}
                </ReviewList>
            ) : (
                <NoReviewsMessage>Este hotel ainda não possui avaliações.</NoReviewsMessage>
            )}

            {/* Seção para escrever review */}
            <WriteReviewContainer>
                <SectionTitle style={{fontSize: '1.3rem', marginBottom: '15px'}}>Escreva uma avaliação</SectionTitle>
                {isLoggedIn ? (
                    <ReviewForm onSubmit={handleSubmitReview}>
                        <RatingInputContainer>
                            <span>Sua Avaliação:</span>
                            <div>
                                {[1, 2, 3, 4, 5].map(star => (
                                    <StarInputButton
                                        key={star}
                                        type="button" // Impede submit do form
                                        className={(hoverRating || newReviewRating) >= star ? 'active' : ''}
                                        onClick={() => setNewReviewRating(star)}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        aria-label={`Avaliação ${star} estrelas`}
                                    >
                                        ★
                                    </StarInputButton>
                                ))}
                            </div>
                        </RatingInputContainer>
                        <ReviewTextarea
                            placeholder="Compartilhe sua experiência..."
                            value={newReviewText}
                            onChange={(e) => setNewReviewText(e.target.value)}
                            rows={4}
                            required
                        />
                        <SubmitButton type="submit" disabled={newReviewRating === 0 || !newReviewText.trim()}>
                            Enviar Avaliação
                        </SubmitButton>
                    </ReviewForm>
                ) : (
                    <LoginPrompt>
                        Você precisa <button onClick={handleLoginClick}>fazer login</button> para escrever uma avaliação.
                    </LoginPrompt>
                )}
            </WriteReviewContainer>
        </ReviewsWrapper>
    );
}

export default HotelReviewSection;