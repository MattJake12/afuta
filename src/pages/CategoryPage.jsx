// src/pages/CategoryPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getDistanceFromLatLonInKm } from '../utils/geoUtils';


// Importar componentes de listagem e o novo Hero
import LocalList from '../components/HotelsPage/LocalList';
import CategoryHero from '../components/HotelsPage/CategoryHero'; // <-- Importar Hero

// Importar imagens de fundo para cada categoria (AJUSTE OS CAMINHOS!)
import alimentacaoBg from '../assets/category-covers/Comida3.jpg';
import infantilBg from '../assets/category-covers/infantil.jpg';
import belezaBg from '../assets/category-covers/beleza3.jpg';
import lazerBg from '../assets/category-covers/lazer11.jpg';
import petsBg from '../assets/category-covers/pets.png';
import defaultBg from '../assets/category-covers/Mapa.webp';

const categoryNamesMap = { alimentacao: "Alimentação", infantil: "Infantil", beleza: "Beleza", lazer: "Lazer", pets: "Pets" };
const categoryBackgrounds = { alimentacao: alimentacaoBg, infantil: infantilBg, beleza: belezaBg, lazer: lazerBg, pets: petsBg };

// --- Styled Components ---
const CategoryPageWrapper = styled.div``;
const ListContentContainer = styled.div`
  max-width: 1200px; margin: -60px auto 60px auto; padding: 0 20px;
  position: relative; z-index: 2; background-color: #fff;
  border-radius: 12px; box-shadow: 0 5px 20px rgba(0,0,0,0.1); padding-top: 30px;
  @media (max-width: 768px) { margin-top: -40px; padding: 0 15px; padding-top: 20px; margin-bottom: 40px; border-radius: 8px; }
`;
const LoadingMessage = styled.p` text-align: center; padding: 50px; font-size: 1.2rem; color: #555; `;
const ErrorMessage = styled.p` text-align: center; padding: 50px; font-size: 1.2rem; color: #c00; `;
// --- Fim Styled Components ---

function CategoryPage({ allLocais }) {
  const { categoriaId } = useParams();
  const navigate = useNavigate();
  const [currentSort, setCurrentSort] = useState('rating-desc');
  const [userLocation, setUserLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(true); // Começa true para buscar na montagem
  const [locationError, setLocationError] = useState(null);

  // Obter geolocalização na montagem
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocalização não suportada.");
      setLocationLoading(false);
      return;
    }

    setLocationLoading(true); // Garante que está carregando
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setLocationError(null);
        setLocationLoading(false);
      },
      (error) => {
        console.error("Erro Geolocation:", error);
        let message = "Não foi possível obter localização.";
        if (error.code === 1) message = "Permissão de localização negada.";
        setLocationError(message);
        setUserLocation(null);
        setLocationLoading(false);
      },
      { timeout: 10000, maximumAge: 60000, enableHighAccuracy: false }
    );
  }, []); // Roda apenas uma vez ao montar

  // Memoiza informações da categoria
  const categoryInfo = useMemo(() => {
    if (!categoriaId) return { name: "Carregando...", bg: defaultBg };
    const lowerCaseId = categoriaId.toLowerCase();
    return { name: categoryNamesMap[lowerCaseId] || categoriaId.charAt(0).toUpperCase() + categoriaId.slice(1), bg: categoryBackgrounds[lowerCaseId] || defaultBg };
  }, [categoriaId]);

  // Memoiza filtragem
  const locaisDaCategoria = useMemo(() => {
    if (!categoriaId || !Array.isArray(allLocais)) return [];
    const lowerCaseId = categoriaId.toLowerCase();
    return allLocais.filter(local => local.categoria?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === lowerCaseId);
  }, [allLocais, categoriaId]);

  // Memoiza ordenação, agora incluindo distância
  const sortedLocais = useMemo(() => {
    // Adiciona distância a cada local ANTES de ordenar
    const locaisComDistancia = locaisDaCategoria.map(local => {
        const distance = userLocation ? getDistanceFromLatLonInKm(
            userLocation.lat, userLocation.lon,
            local.coordenadas?.latitude, local.coordenadas?.longitude
        ) : null; // Calcula distância se userLocation existir, senão null
        return { ...local, distance }; // Retorna novo objeto com a distância
    });

    // Ordena a lista com distâncias
    switch (currentSort) {
      case 'distance-asc':
        locaisComDistancia.sort((a, b) => {
            if (a.distance === null && b.distance === null) return 0;
            if (a.distance === null) return 1; // nulls vão para o fim
            if (b.distance === null) return -1; // nulls vão para o fim
            return a.distance - b.distance; // Ordena por distância numérica
        });
        break;
      case 'rating-desc': locaisComDistancia.sort((a, b) => (b.estrelas || 0) - (a.estrelas || 0)); break;
      case 'rating-asc': locaisComDistancia.sort((a, b) => (a.estrelas || 0) - (b.estrelas || 0)); break;
      case 'name-asc': locaisComDistancia.sort((a, b) => (a.nome || '').localeCompare(b.nome || '')); break;
      case 'name-desc': locaisComDistancia.sort((a, b) => (b.nome || '').localeCompare(a.nome || '')); break;
      default: locaisComDistancia.sort((a, b) => (b.estrelas || 0) - (a.estrelas || 0));
    }
    return locaisComDistancia;
  }, [locaisDaCategoria, currentSort, userLocation]); // Depende da localização do usuário

  const handleSortChange = (newSortValue) => {
    if (newSortValue === 'distance-asc' && !userLocation && !locationLoading) {
        // Se tentar ordenar por distância sem ter localização (e sem estar carregando)
        setLocationError("Permita localização para ordenar por distância.");
        // Poderia tentar buscar a localização novamente aqui
        return;
    }
    setCurrentSort(newSortValue);
  };

  // Validação de Categoria (useEffect sem mudanças)
  useEffect(() => { if (categoriaId && !categoryNamesMap[categoriaId.toLowerCase()]) { console.warn(`Categoria inválida: ${categoriaId}`); /* navigate('/404'); */ } }, [categoriaId, navigate]);

  // Renderização
  if (!categoriaId) return <LoadingMessage>Identificando categoria...</LoadingMessage>;
  if (!Array.isArray(allLocais)) return <LoadingMessage>Carregando locais...</LoadingMessage>;
  if (categoriaId && !categoryNamesMap[categoriaId.toLowerCase()]) return <ErrorMessage>Categoria "{categoriaId}" não encontrada.</ErrorMessage>;

  return (
    <CategoryPageWrapper>
      <CategoryHero title={categoryInfo.name} backgroundImage={categoryInfo.bg} />
      <ListContentContainer>
        <LocalList
          locais={sortedLocais}
          currentSort={currentSort}
          onSortChange={handleSortChange}
          categoryName={categoryInfo.name}
          userLocationAvailable={!!userLocation} // Passa boolean se a localização está disponível
          locationLoading={locationLoading}     // Passa estado de carregamento da localização
          locationError={locationError}         // Passa mensagem de erro da localização
        />
      </ListContentContainer>
    </CategoryPageWrapper>
  );
}

export default CategoryPage;