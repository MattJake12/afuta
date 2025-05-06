// src/components/DetailPageComponents/LocalLocationMapSection.jsx
import React from 'react';
import styled from 'styled-components';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Importar CSS obrigatório do Leaflet
import L from 'leaflet'; // Importar L para corrigir ícones padrão

// --- Correção para ícones padrão do Leaflet ---
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetinaUrl,
  iconUrl: iconUrl,
  shadowUrl: shadowUrl,
});
// --- Fim da Correção ---

// --- Styled Components ---
const LocationWrapper = styled.section`
  margin-bottom: 30px;
  border: 1px solid #eee;
  border-radius: 12px;
  overflow: hidden; 
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
`;

const MapWrapper = styled.div`
  height: 280px; 
  width: 100%;
  background-color: #e8f0f2; 
`;

const AddressContainer = styled.div`
    padding: 15px 20px; 
    background-color: #f9f9f9; 
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #1c1c1c;
  margin-bottom: 10px;
  /* Se o título for dentro do AddressContainer, senão pode ser global */
`;

const AddressText = styled.p`
    color: #333;
    font-size: 0.9rem;
    line-height: 1.6;
    margin-bottom: 8px; 
`;

const DirectionsLink = styled.a`
    font-size: 0.85rem;
    color: #007bff;
    font-weight: 600;
    text-decoration: none;
    display: inline-block;

    &:hover {
        text-decoration: underline;
        color: #0056b3;
    }
`;

// --- Componente ---
function LocalLocationMapSection({ location, localName }) {

  const hasValidCoords = location &&
                         typeof location.lat === 'number' &&
                         typeof location.lng === 'number' &&
                         !isNaN(location.lat) &&
                         !isNaN(location.lng);

  const position = hasValidCoords ? [location.lat, location.lng] : null;
  // Fallback para o centro do mapa se não houver coordenadas válidas
  const defaultMapCenter = [-8.8368, 13.2343]; // Luanda, Angola (exemplo)
  const mapCenterToUse = position || defaultMapCenter;
  const initialZoom = position ? 15 : 7; // Zoom maior se tiver ponto, menor se for geral

  return (
    <LocationWrapper>
        <SectionTitle style={{padding: '15px 20px 10px 20px', margin: '0', borderBottom: '1px solid #eee', background: '#f9f9f9'}}>Localização</SectionTitle>
      <MapWrapper>
        {/* Garante que MapContainer só renderize no cliente (Leaflet depende de window) */}
        {typeof window !== 'undefined' && (
          <MapContainer
            center={mapCenterToUse}
            zoom={initialZoom}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
            key={position ? position.join(',') : 'default'} // Força re-renderização se a posição mudar
          >
            <TileLayer
              attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {position && (
              <Marker position={position}>
                <Popup>
                  <strong>{localName || 'Localização'}</strong><br />
                  {location.address || `Lat: ${location.lat.toFixed(5)}, Lng: ${location.lng.toFixed(5)}`}
                </Popup>
              </Marker>
            )}
          </MapContainer>
        )}
      </MapWrapper>
      <AddressContainer>
        {/* <SectionTitle>Endereço</SectionTitle> // Título agora acima do mapa */}
        <AddressText>
            {location?.address || 'Endereço não disponível'}
        </AddressText>
        {hasValidCoords && (
             <DirectionsLink
                href={`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`}
                target="_blank"
                rel="noopener noreferrer"
             >
                Obter Direções
             </DirectionsLink>
        )}
      </AddressContainer>
    </LocationWrapper>
  );
}

export default LocalLocationMapSection;