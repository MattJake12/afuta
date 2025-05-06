// src/utils/geoUtils.js

/**
 * Calcula a distância em quilômetros entre dois pontos geográficos usando a fórmula de Haversine.
 * @param {number | null | undefined} lat1 Latitude do ponto 1
 * @param {number | null | undefined} lon1 Longitude do ponto 1
 * @param {number | null | undefined} lat2 Latitude do ponto 2
 * @param {number | null | undefined} lon2 Longitude do ponto 2
 * @returns {number | null} Distância em KM, ou null se alguma coordenada for inválida/nula.
 */
export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  // Validação robusta das entradas
  if (typeof lat1 !== 'number' || typeof lon1 !== 'number' || typeof lat2 !== 'number' || typeof lon2 !== 'number') {
    return null;
  }
  // Validar limites razoáveis (opcional, mas bom)
  if (lat1 < -90 || lat1 > 90 || lon1 < -180 || lon1 > 180 ||
      lat2 < -90 || lat2 > 90 || lon2 < -180 || lon2 > 180) {
      console.warn("Coordenadas inválidas fornecidas:", {lat1, lon1, lat2, lon2});
      return null;
  }


  const R = 6371; // Raio da Terra em km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distância em km
  return d;
}

/**
 * Converte graus para radianos.
 * @param {number} deg Graus
 * @returns {number} Radianos
 */
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

/**
 * Formata a distância em KM para exibição amigável (km ou m).
 * @param {number | null} distanceKm Distância em KM ou null.
 * @returns {string} String formatada (ex: "Aprox. 2.5 km", "Aprox. 500 m") ou string vazia se inválido.
 */
export function formatDistance(distanceKm) {
    if (distanceKm === null || typeof distanceKm !== 'number' || distanceKm < 0 || !isFinite(distanceKm)) {
        return ""; // Retorna string vazia para distâncias inválidas ou nulas
    }
    if (distanceKm < 0.1) { // Menos de 100m
       return `Aprox. ${(distanceKm * 1000).toFixed(0)} m`;
    }
    if (distanceKm < 1) { // Entre 100m e 1km
        return `Aprox. ${(distanceKm * 1000).toFixed(0)} m`; // Ainda mostra em metros
    }
    if (distanceKm < 10) { // Menos de 10km
       return `Aprox. ${distanceKm.toFixed(1)} km`; // Uma casa decimal
    }
    return `Aprox. ${distanceKm.toFixed(0)} km`; // Acima de 10km, sem casas decimais
}