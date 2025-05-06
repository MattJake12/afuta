// src/components/ListPageComponents/LocalCard.jsx
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaStar, FaRegStar, FaMapMarkerAlt } from 'react-icons/fa';
import { IoHeartOutline, IoHeart, IoLocationSharp } from "react-icons/io5"; // Adicionado IoLocationSharp para placeholder
import { formatDistance } from '../../utils/geoUtils'; // Importar formatador

// --- Paleta e Styled Components (sem mudanças nos estilos, apenas adição de DistanceText) ---
const colors = { white: '#ffffff', black: '#1a1a1a', greyText: '#555', greyLight: '#a0a0a0', border: '#e0e0e0', shadow: 'rgba(0, 0, 0, 0.08)', shadowHover: 'rgba(0, 0, 0, 0.15)', starYellow: '#FFC107', favoriteRed: '#e60023', buttonBackground: '#1a1a1a', buttonText: '#ffffff', buttonHoverBackground: '#333' };
const ImageContainer = styled.div` position: relative; width: 100%; height: 200px; overflow: hidden; border-radius: 12px 12px 0 0; background-color: ${colors.greyLight}; `;
const LocalImage = styled.img` display: block; width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1); `;
const ContentWrapper = styled.div` padding: 18px; position: relative; overflow: visible; display: flex; flex-direction: column; flex-grow: 1; background-color: ${colors.white}; border-radius: 0 0 12px 12px; `;
const InfoSection = styled.div` margin-bottom: 12px; `;
const LocalName = styled.h3` font-family: 'Poppins', sans-serif; font-size: 1.15rem; font-weight: 600; color: ${colors.black}; margin-bottom: 6px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; min-height: 2.5em; `;
const RatingLocationWrapper = styled.div` display: flex; align-items: center; flex-wrap: wrap; gap: 6px 12px; margin-bottom: 10px; font-size: 0.8rem; color: ${colors.greyText}; font-family: 'Inter', sans-serif; `;
const StarRating = styled.div` display: flex; align-items: center; gap: 4px; color: ${colors.starYellow}; span { color: ${colors.greyText}; font-weight: 600; margin-left: 4px; font-size: 0.95em; } `;
const Location = styled.div` display: flex; align-items: center; gap: 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: ${colors.greyLight}; svg { margin-right: 2px; } `;
const CategoryTag = styled.span` font-size: 0.75rem; font-weight: 500; color: ${colors.greyText}; background-color: #f0f0f0; padding: 2px 6px; border-radius: 4px; margin-left: 10px; `;
const LocalDescription = styled(motion.p)` font-family: 'Inter', sans-serif; font-size: 0.9rem; color: ${colors.greyText}; line-height: 1.6; margin-top: 8px; margin-bottom: 10px; overflow: hidden; cursor: default; opacity: 0; max-height: 0; transition: opacity 0.4s ease-out, max-height 0.5s ease-in-out, transform 0.4s ease-out; ${({ $isHovered, $isFullExpanded }) => $isHovered && !$isFullExpanded && css` opacity: 1; max-height: 4.8em; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; text-overflow: ellipsis; cursor: pointer; `} ${({ $isFullExpanded }) => $isFullExpanded && css` opacity: 1; max-height: 400px; display: block; -webkit-line-clamp: unset; -webkit-box-orient: unset; text-overflow: unset; cursor: default; `}`;
const BottomContent = styled.div` margin-top: auto; padding-top: 15px; border-top: 1px solid ${colors.border}; `;
const ActionButton = styled(Link)` background-color: ${colors.buttonBackground}; color: ${colors.buttonText}; font-family: 'Poppins', sans-serif; font-weight: 500; font-size: 0.9rem; padding: 10px 0; width: 100%; border: none; border-radius: 8px; margin-top: 10px; cursor: pointer; display: block; text-align: center; transition: background-color 0.25s ease, transform 0.1s ease; letter-spacing: 0.3px; text-decoration: none; &:hover { background-color: ${colors.buttonHoverBackground}; transform: scale(1.02); color: ${colors.buttonText}; } &:active { transform: scale(0.99); } `;
const FavoriteButton = styled.button` position: absolute; top: 12px; right: 12px; background-color: rgba(255, 255, 255, 0.85); border: none; border-radius: 50%; width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: ${colors.greyText}; font-size: 20px; backdrop-filter: blur(4px); transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease; z-index: 2; &:hover { background-color: ${colors.white}; color: ${colors.favoriteRed}; transform: scale(1.1); } `;
const CardWrapper = styled(motion.div)` background-color: ${colors.white}; border-radius: 14px; box-shadow: 0 5px 15px ${colors.shadow}; overflow: hidden; transition: box-shadow 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1); display: flex; flex-direction: column; color: inherit; height: 100%; border: 1px solid ${colors.border}; &:hover { box-shadow: 0 12px 30px ${colors.shadowHover}; transform: translateY(-5px); ${LocalImage} { transform: scale(1.06); } } `;
const DistanceText = styled.span` font-size: 0.75rem; color: ${colors.greyText}; font-weight: 500; margin-left: 10px; white-space: nowrap; `;
// --- Fim Styled Components ---

const renderStars = (rating) => {
    const ratingNum = Number(rating);
    if (isNaN(ratingNum) || ratingNum <= 0) return null;
    const fullStars = Math.floor(ratingNum);
    const emptyStars = 5 - fullStars;
    return ( <StarRating> {[...Array(fullStars)].map((_, i) => <FaStar key={`fs-${i}`} />)} {[...Array(emptyStars)].map((_, i) => <FaRegStar key={`es-${i}`} style={{ opacity: 0.5 }} />)} <span>{ratingNum.toFixed(1)}</span> </StarRating> );
};

const cardVariants = { hidden: { opacity: 0, y: 30, scale: 0.97 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.165, 0.84, 0.44, 1] } }, };

function LocalCard({ local, distance }) { // Recebe 'distance'
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDescriptionFullExpanded, setIsDescriptionFullExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleFavoriteClick = (e) => { e.preventDefault(); e.stopPropagation(); setIsFavorite(!isFavorite); };
  const handleDescriptionClick = (e) => { if (isHovered && local.descricao_curta) { e.stopPropagation(); e.preventDefault(); setIsDescriptionFullExpanded(prev => !prev); } };
  const handleMouseEnter = () => { setIsHovered(true); };
  const handleMouseLeave = () => { setIsHovered(false); setIsDescriptionFullExpanded(false); };

  const imageUrl = (local.imagens && local.imagens.length > 0 && local.imagens[0])
                   ? local.imagens[0]
                   : null; // Deixa nulo se não houver imagem

  const distanceString = formatDistance(distance); // Formata a distância recebida

  return (
    <CardWrapper variants={cardVariants} layout onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <ImageContainer>
        {imageUrl ? (
          <LocalImage src={imageUrl} alt={`Imagem de ${local.nome || 'local'}`} loading="lazy" />
        ) : (
          // Placeholder visual se não houver imagem
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: colors.greyMedium }}>
             <IoLocationSharp size="3em" />
          </div>
        )}
        <FavoriteButton onClick={handleFavoriteClick} title={isFavorite ? "Remover" : "Salvar"}>
            {isFavorite ? <IoHeart style={{ color: colors.favoriteRed }}/> : <IoHeartOutline />}
        </FavoriteButton>
      </ImageContainer>

      <ContentWrapper>
        <InfoSection>
          <LocalName>{local.nome || "Local Sem Nome"}</LocalName>
          <RatingLocationWrapper>
            {renderStars(local.estrelas)}
            {local.localizacao_texto && <Location><FaMapMarkerAlt size={12} /> {local.localizacao_texto.split(',')[0]}</Location>}
            {/* Mostra a distância formatada */}
            {distanceString && <DistanceText>• {distanceString}</DistanceText>}
            {local.categoria && <CategoryTag>{local.categoria}</CategoryTag>}
          </RatingLocationWrapper>
        </InfoSection>

        {local.descricao_curta && ( <LocalDescription $isHovered={isHovered} $isFullExpanded={isDescriptionFullExpanded} onClick={handleDescriptionClick}> {local.descricao_curta} </LocalDescription> )}

        <BottomContent>
           <ActionButton to={`/local/${local.id}`}> Ver Detalhes </ActionButton>
        </BottomContent>
      </ContentWrapper>
    </CardWrapper>
  );
}

export default LocalCard;