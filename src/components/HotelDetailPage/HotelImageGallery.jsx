// src/components/HotelImageGallery.jsx
import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { IoImagesOutline } from 'react-icons/io5';

// --- Estilos Globais do Componente ---
const GalleryWrapper = styled(motion.div)`
  margin-bottom: 30px;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background-color: #f0f0f0;
`;

const ImageGridContainer = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 1fr;
  gap: 6px;
  height: 550px;
  max-height: 75vh;

  @media (max-width: 992px) {
    height: 480px;
    max-height: 70vh;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    height: auto;
    max-height: none;
  }
`;

// --- Imagem Principal ---
const MainImageWrapper = styled(motion.div)`
  position: relative;
  overflow: hidden;
  cursor: pointer;
  height: 100%;
  background-color: #e0e0e0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  &:hover img {
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    height: 300px;
    max-height: 50vh;
    border-radius: 6px;
    margin-bottom: 6px;
  }
`;

const SeeAllButtonMain = styled.button`
  position: absolute;
  bottom: 12px;
  left: 12px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  backdrop-filter: blur(3px);
  transition: background-color 0.2s ease, transform 0.2s ease;
  z-index: 10;

  &:hover {
    background-color: rgba(0, 0, 0, 0.85);
    transform: scale(1.03);
  }

  @media (max-width: 768px) {
    bottom: 8px;
    left: 8px;
    padding: 6px 12px;
    font-size: 0.8rem;
  }
`;

// --- Coluna de Thumbnails Scrollável ---
const ThumbnailsColumn = styled.div`
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 4px;
  display: flex;
  flex-direction: column;
  gap: 6px;

  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 3px; }
  &::-webkit-scrollbar-thumb { background: #ccc; border-radius: 3px; }
  &::-webkit-scrollbar-thumb:hover { background: #aaa; }

  @media (max-width: 768px) {
    flex-direction: row;
    overflow-y: hidden;
    overflow-x: auto;
    height: 90px;
    padding-right: 0;
    padding-bottom: 5px;

    &::-webkit-scrollbar { height: 4px; width: auto; }
    & > * {
      flex-shrink: 0;
      width: 120px;
    }
  }
`;

// --- Thumbnail Individual ---
const ThumbnailWrapper = styled(motion.div)`
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border-radius: 6px;
  background-color: #d0d0d0;
  width: 100%;
  aspect-ratio: 16 / 10;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.3s ease, filter 0.3s ease;
  }

  ${({ $isActive }) => !$isActive && css`
    opacity: 0.7;
    &:hover { opacity: 0.9; }
  `}

  /* Borda dourada no thumbnail ativo */
  box-shadow: ${({ $isActive }) => $isActive ? '0 0 0 3px rgb(255, 215, 0)' : '0 1px 3px rgba(0,0,0,0.1)'};
  transition: opacity 0.3s ease, box-shadow 0.3s ease;

  &:hover img {
    transform: scale(1.05);
    filter: brightness(0.9);
  }

  @media (max-width: 768px) {
    height: 100%;
    width: 120px;
    aspect-ratio: unset;
  }
`;

const ThumbnailOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60%;
  background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 100%);
  display: flex;
  align-items: flex-end;
  padding: 8px;
  pointer-events: none;
  z-index: 2;
`;

const ThumbnailCaption = styled.span`
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  line-height: 1.2;
  text-shadow: 0 1px 2px rgba(0,0,0,0.7);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// --- Estilo para Imagem Única ---
const SingleImageContainer = styled(MainImageWrapper)`
  cursor: default;
  border-radius: 12px;
  &:hover img { transform: none; }

  @media (max-width: 768px) {
    border-radius: 6px;
    height: 400px;
    max-height: 60vh;
    margin-bottom: 0;
  }
`;

// --- Componente ---
function HotelImageGallery({ images = [], hotelName }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const thumbnailRefs = useRef([]);

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  useEffect(() => {
    const activeThumbnail = thumbnailRefs.current[selectedImageIndex];
    if (activeThumbnail) {
      activeThumbnail.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });
    }
  }, [selectedImageIndex]);

  const handleOpenLightbox = () => {
    alert(`Simulando abertura de Lightbox/Modal com ${images.length} fotos de ${hotelName}.\nImagem inicial: ${selectedImageIndex + 1}`);
  };

  if (!images || images.length === 0) {
    return <GalleryWrapper><p style={{ padding: '20px', textAlign: 'center' }}>Nenhuma imagem disponível.</p></GalleryWrapper>;
  }

  if (images.length === 1) {
    return (
      <GalleryWrapper initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <SingleImageContainer>
          <img src={images[0].url} alt={`${hotelName} - Imagem Principal`} />
        </SingleImageContainer>
      </GalleryWrapper>
    );
  }

  return (
    <GalleryWrapper initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <ImageGridContainer>
        <MainImageWrapper
          key={selectedImageIndex}
          onClick={handleOpenLightbox}
          layout
        >
          <AnimatePresence initial={false}>
            <motion.img
              key={images[selectedImageIndex].id}
              src={images[selectedImageIndex].url}
              alt={`${hotelName} - ${images[selectedImageIndex].caption || `Imagem ${selectedImageIndex + 1}`}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            />
          </AnimatePresence>
          <SeeAllButtonMain onClick={(e) => { e.stopPropagation(); handleOpenLightbox(); }}>
            <IoImagesOutline /> {images.length} Fotos
          </SeeAllButtonMain>
        </MainImageWrapper>

        <ThumbnailsColumn>
          {images.map((img, index) => (
            <ThumbnailWrapper
              ref={el => thumbnailRefs.current[index] = el}
              key={img.id}
              $isActive={selectedImageIndex === index}
              onClick={() => handleThumbnailClick(index)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.05 * index }}
              layout
            >
              <img src={img.url} alt={`${hotelName} - ${img.caption || `Thumbnail ${index + 1}`}`} />
              <ThumbnailOverlay>
                {img.caption && <ThumbnailCaption>{img.caption}</ThumbnailCaption>}
              </ThumbnailOverlay>
            </ThumbnailWrapper>
          ))}
        </ThumbnailsColumn>
      </ImageGridContainer>
    </GalleryWrapper>
  );
}

export default HotelImageGallery;
