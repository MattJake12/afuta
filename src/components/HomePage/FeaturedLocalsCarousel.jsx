// src/components/HomePage/FeaturedLocalsCarousel.jsx
import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const colors = {
  black: '#121212', darkGrey: '#1a1a1a', mediumGrey: '#2c2c2c',
  lightGreyText: '#a0a0a0', silver: '#c0c0c0', white: '#ffffff',
  accentShine: 'rgba(200, 200, 220, 0.08)', overlayStart: 'rgba(10, 10, 15, 0.85)',
  overlayEnd: 'rgba(20, 20, 25, 0)', starYellow: '#FFD700',
};

const SectionWrapper = styled(motion.section)`
  max-width: 1320px; margin: 80px auto; padding: 0 20px;
`;
const HeaderContent = styled(motion.div)`
  margin-bottom: 40px; text-align: center;
`;
const SectionTitle = styled.h2`
  font-family: 'Poppins', sans-serif; font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 700; color: ${colors.black}; margin-bottom: 12px;
`;
const SectionSubtitle = styled.p`
  font-family: 'Inter', sans-serif; font-size: clamp(0.95rem, 2vw, 1.1rem);
  color: ${colors.lightGreyText}; max-width: 600px; margin: 0 auto;
`;
const CarouselWrapper = styled.div`
  position: relative;
  &:before, &:after { content: ''; position: absolute; top: 0; bottom: 0; width: 60px; z-index: 2; pointer-events: none; }
  &:before { left: 0; background: linear-gradient(to right, ${colors.white} 0%, rgba(255,255,255,0) 100%); opacity: ${({ $showPrevButton }) => ($showPrevButton ? 1 : 0)}; transition: opacity 0.3s ease; @media (max-width: 768px) { display: none; } }
  &:after { right: 0; background: linear-gradient(to left, ${colors.white} 0%, rgba(255,255,255,0) 100%); opacity: ${({ $showNextButton }) => ($showNextButton ? 1 : 0)}; transition: opacity 0.3s ease; @media (max-width: 768px) { display: none; } }
`;
const CarouselTrack = styled(motion.div)`
  display: flex; gap: 25px; overflow-x: auto; scroll-behavior: smooth;
  padding: 10px 0 30px 0; -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar { height: 6px; } &::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 3px; }
  &::-webkit-scrollbar-thumb { background: ${colors.silver}; border-radius: 3px; }
  &::-webkit-scrollbar-thumb:hover { background: ${colors.mediumGrey}; }
`;

const LocalCarouselCard = styled(motion(Link))`
  min-width: 280px; height: 380px; border-radius: 16px;
  background-size: cover; background-position: center;
  position: relative; flex-shrink: 0; cursor: pointer;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); overflow: hidden;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  text-decoration: none;

  &:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 992px) { min-width: 260px; height: 360px; }
  @media (max-width: 768px) { min-width: 240px; height: 340px; scroll-snap-align: center; }
`;

const ImageOverlay = styled.div`
  position: absolute; inset: 0; z-index: 1;
  background: linear-gradient(180deg, ${colors.overlayEnd} 40%, ${colors.overlayStart} 100%);
  transition: background 0.4s ease;
  ${LocalCarouselCard}:hover & {
    background: linear-gradient(180deg, rgba(0,0,0,0.1) 20%, rgba(0,0,0,0.9) 100%);
  }
`;

const CardContent = styled(motion.div)`
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: 20px; z-index: 2; color: ${colors.white};
`;

const CardTitle = styled.h3`
  font-family: 'Poppins', sans-serif; font-size: 1.4rem; font-weight: 600;
  margin-bottom: 6px; text-shadow: 0 1px 5px rgba(0,0,0,0.5);
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
  overflow: hidden; text-overflow: ellipsis;
`;

const CardSubtitleText = styled.p`
  font-family: 'Inter', sans-serif; font-size: 0.85rem; color: ${colors.lightGreyText};
  margin-bottom: 10px; opacity: 0.9;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
  overflow: hidden; text-overflow: ellipsis;
`;

const StarRating = styled.div`
  display: flex; align-items: center; gap: 4px;
`;

const StarIcon = styled(motion.span)`
  color: ${colors.starYellow}; font-size: 0.9rem; filter: drop-shadow(0 1px 1px rgba(0,0,0,0.4));
`;

const NavButton = styled(motion.button)`
  position: absolute; top: 50%; transform: translateY(-50%);
  background-color: ${colors.white}; color: ${colors.black};
  border: 1px solid rgba(0,0,0,0.1); border-radius: 50%;
  width: 50px; height: 50px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  cursor: pointer; z-index: 3; display: flex; align-items: center;
  justify-content: center; transition: all 0.3s ease;
  &:hover { background-color: ${colors.black}; color: ${colors.white}; transform: translateY(-50%) scale(1.05); box-shadow: 0 8px 20px rgba(0,0,0,0.15); }
  &:disabled { opacity: 0.3; cursor: not-allowed; }
  svg { font-size: 24px; }
  &.prev { left: -25px; @media (max-width: 1380px) { left: 10px; } }
  &.next { right: -25px; @media (max-width: 1380px) { right: 10px; } }
  @media (max-width: 768px) { display: none; }
`;

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1 } },
};

const contentVariants = {
  initial: { opacity: 0, y: 20 },
  hover: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const navButtonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
};

const cardEnterVariant = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const renderStars = (rating) => {
  const ratingNum = Number(rating);
  if (isNaN(ratingNum) || ratingNum <= 0) return null;
  const fullStars = Math.floor(ratingNum);
  const emptyStars = 5 - fullStars;
  return (
    <StarRating>
      {[...Array(fullStars)].map((_, i) => (
        <StarIcon key={`fs-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 + i * 0.05 }}><FaStar /></StarIcon>
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <StarIcon key={`es-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 + fullStars * 0.05 + i * 0.05 }}><FaRegStar style={{ opacity: 0.5 }} /></StarIcon>
      ))}
    </StarRating>
  );
};

export default function FeaturedLocalsCarousel({ title, subtitle, locais = [] }) {
  const carouselRef = useRef(null);
  const [showPrevButton, setShowPrevButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    const tolerance = 5;
    setShowPrevButton(scrollLeft > tolerance);
    setShowNextButton(scrollWidth - scrollLeft - clientWidth > tolerance);
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (el) {
      const timer = setTimeout(() => {
        handleScroll();
        el.addEventListener('scroll', handleScroll, { passive: true });
      }, 150);
      return () => {
        clearTimeout(timer);
        el.removeEventListener('scroll', handleScroll);
      };
    }
  }, [locais]);

  const scroll = (direction) => {
    if (!carouselRef.current) return;
    const scrollAmount = carouselRef.current.clientWidth * 0.75;
    carouselRef.current.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth'
    });
  };

  if (locais.length === 0) return null;

  return (
    <SectionWrapper variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
      <HeaderContent variants={sectionVariants}>
        <SectionTitle>{title}</SectionTitle>
        <SectionSubtitle>{subtitle}</SectionSubtitle>
      </HeaderContent>

      <CarouselWrapper $showPrevButton={showPrevButton} $showNextButton={showNextButton}>
        <AnimatePresence>
          {showPrevButton && (
            <NavButton key="prev" className="prev" onClick={() => scroll('prev')} aria-label="Anterior" variants={navButtonVariants} initial="hidden" animate="visible" exit="exit">
              <IoChevronBack />
            </NavButton>
          )}
        </AnimatePresence>

        <CarouselTrack ref={carouselRef}>
          {locais.map((local) => {
            const backgroundImageUrl = (local.imagens && local.imagens.length > 0 && local.imagens[0])
              ? local.imagens[0]
              : 'https://via.placeholder.com/300x400/cccccc/888888?text=Sem+Imagem';

            return (
              <LocalCarouselCard
                key={local.id}
                to={`/local/${local.id}`}
                style={{ backgroundImage: `url(${backgroundImageUrl})` }}
                variants={cardEnterVariant}
                whileHover="hover"
                initial="hidden"
                animate="visible"
              >
                <ImageOverlay />
                <CardContent
                  variants={contentVariants}
                  initial="initial"
                  animate="initial"
                  whileHover="hover"
                >
                  <CardTitle>{local.nome}</CardTitle>
                  {local.descricao_curta && <CardSubtitleText>{local.descricao_curta}</CardSubtitleText>}
                  {renderStars(local.estrelas)}
                </CardContent>
              </LocalCarouselCard>
            );
          })}
        </CarouselTrack>

        <AnimatePresence>
          {showNextButton && (
            <NavButton key="next" className="next" onClick={() => scroll('next')} aria-label="Próximo" variants={navButtonVariants} initial="hidden" animate="visible" exit="exit">
              <IoChevronForward />
            </NavButton>
          )}
        </AnimatePresence>
      </CarouselWrapper>
    </SectionWrapper>
  );
}
