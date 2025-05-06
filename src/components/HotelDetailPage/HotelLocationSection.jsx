// src/components/HotelLocationSection.jsx
import React from 'react';
import styled from 'styled-components';
import { FaMapMarkerAlt } from 'react-icons/fa';

const LocationWrapper = styled.section`
  margin-bottom: 30px;
  border: 1px solid #eee;
  border-radius: 12px;
  overflow: hidden; // Para o mapa
`;

const MapPlaceholder = styled.div`
  height: 250px;
  background-color: #e8f0f2; // Cor de fundo para placeholder
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #557;
  font-style: italic;
  font-size: 1rem;
  border-bottom: 1px solid #eee;
`;

const AddressContainer = styled.div`
    padding: 15px 20px;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #1c1c1c;
  margin-bottom: 10px;
`;

const AddressText = styled.p`
    color: #333;
    font-size: 0.9rem;
    line-height: 1.6;
    display: flex;
    align-items: flex-start; // Alinha ícone com topo do texto
    gap: 8px;

    svg {
        margin-top: 3px; // Ajuste fino do ícone
        flex-shrink: 0;
        color: #555;
    }
`;

function HotelLocationSection({ location, hotelName }) {
  if (!location) {
    return null; // Não renderiza nada se não houver dados de localização
  }

  return (
    <LocationWrapper>
        <SectionTitle style={{padding: '15px 20px 0 20px', borderBottom: '1px solid #eee', marginBottom: '0'}}>Localização</SectionTitle>
      {/* Placeholder - Substituir por componente de mapa real (Leaflet, Google Maps) */}
      <MapPlaceholder>
        ( Placeholder para Mapa Interativo de<br />{hotelName} )
      </MapPlaceholder>
      <AddressContainer>
        {/* <SectionTitle>Endereço</SectionTitle> */}
        <AddressText>
            <FaMapMarkerAlt size={16} />
            {location.address || 'Endereço não disponível'}
        </AddressText>
        {/* Adicionar link "Get Directions" se tiver coordenadas */}
        {location.lat && location.lng && (
             <a
                href={`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{fontSize: '0.85rem', color: '#FFD700', fontWeight: '600', marginTop: '10px', display: 'inline-block'}}
             >
                Obter direções
             </a>
        )}
      </AddressContainer>
    </LocationWrapper>
  );
}

export default HotelLocationSection;