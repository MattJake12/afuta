// src/components/DetailPageComponents/LocalOpeningHours.jsx
import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { FaRegClock, FaChevronDown, FaChevronUp } from 'react-icons/fa';

// Paleta de cores
const colors = {
  textPrimary: '#1c1c1c',
  textSecondary: '#555',
  openGreen: '#28a745',
  closeRed: '#dc3545',
  warnOrange: '#fd7e14', // Laranja/âmbar para "Fecha em breve"
  borderLight: '#eee',
  backgroundLight: '#f9f9f9',
  highlightBackground: '#f0f7ff', // Azul claro para destacar dia atual
  unknownGray: '#6c757d', // Cinza para status desconhecido
};

const HoursWrapper = styled.section`
  margin-bottom: 30px;
  background-color: ${colors.backgroundLight};
  border-radius: 12px;
  padding: 20px;
  border: 1px solid ${colors.borderLight};
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  svg { color: ${colors.textSecondary}; font-size: 1.1em; }
`;

const CurrentStatus = styled.p`
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 15px;
  padding: 8px 12px;
  border-radius: 6px;
  display: inline-block;
  line-height: 1.4; // Melhorar espaçamento de linha se houver texto longo

  ${({ $statusType }) => {
    switch ($statusType) {
      case 'open':
        return css` color: ${colors.openGreen}; background-color: rgba(40, 167, 69, 0.1); `;
      case 'closing_soon':
        return css` color: ${colors.warnOrange}; background-color: rgba(253, 126, 20, 0.1); `;
      case 'closed':
        return css` color: ${colors.closeRed}; background-color: rgba(220, 53, 69, 0.1); `;
      case 'unknown': // Para horário não informado
      default:
        return css` color: ${colors.unknownGray}; background-color: rgba(108, 117, 125, 0.1); `;
    }
  }}
`;

const HoursList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const HourEntry = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  font-size: 0.9rem;
  color: ${colors.textSecondary};
  border-bottom: 1px dashed ${colors.borderLight};

  &:first-child { padding-top: 0; }
  &:last-child { border-bottom: none; padding-bottom: 0; }

  .day { font-weight: 500; color: ${colors.textPrimary}; flex: 1; margin-right: 10px; }
  .time { text-align: right; font-weight: 500; flex-shrink: 0; }

  ${({ $isToday }) =>
    $isToday &&
    css`
      font-weight: bold;
      background-color: ${colors.highlightBackground};
      margin: 0 -20px;
      padding-left: 20px;
      padding-right: 20px;
      border-radius: 4px;
      .day, .time { color: ${colors.textPrimary}; }
    `}
`;

const ToggleButton = styled.button`
  background: none; border: none; color: #007bff; font-weight: 600;
  font-size: 0.9rem; cursor: pointer; padding: 8px 0; margin-top: 15px;
  display: flex; align-items: center; gap: 6px; width: 100%; justify-content: center;
  &:hover { text-decoration: underline; color: #0056b3; }
  svg { font-size: 0.8em; }
`;

// --- Funções de Lógica de Horário ---
const dayMap = [ "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado" ];

const timeToMinutes = (timeStr) => {
  if (!timeStr || typeof timeStr !== 'string' || !timeStr.includes(':')) return null;
  const parts = timeStr.split(':');
  if (parts.length !== 2) return null;
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  if (isNaN(hours) || isNaN(minutes)) return null;
  return hours * 60 + minutes;
};

const checkOpenStatus = (horarios) => {
  if (!horarios || horarios.length === 0) {
    return { isOpen: false, statusText: "Horário não informado", statusType: "unknown" };
  }

  const now = new Date();
  const currentDayName = dayMap[now.getDay()];
  const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();

  // 1. Tenta encontrar a regra para o dia específico
  let relevantSchedule = horarios.find(h => h.dia.toLowerCase() === currentDayName.toLowerCase());

  // 2. Se não encontrar, tenta encontrar a regra "Todos os dias"
  if (!relevantSchedule) {
    relevantSchedule = horarios.find(h => h.dia.toLowerCase() === 'todos os dias');
  }

  // 3. Se não encontrou nenhuma regra aplicável
  if (!relevantSchedule) {
    // Poderia tentar encontrar o próximo dia com horário, mas por simplicidade, dizemos não informado
    return { isOpen: false, statusText: "Horário não informado para hoje", statusType: "unknown" };
  }

  // 4. Avalia a regra encontrada
  const scheduleText = relevantSchedule.horario.toLowerCase();

  if (scheduleText === 'fechado') {
    return { isOpen: false, statusText: `Fechado hoje (${currentDayName})`, statusType: "closed" };
  }

  if (scheduleText === 'aberto 24 horas') {
    return { isOpen: true, statusText: "Aberto 24 horas", statusType: "open" };
  }

  // 5. Processa os intervalos de tempo
  const timePeriods = relevantSchedule.horario.split(',').map(p => p.trim());
  let nextOpenTimeToday = Infinity; // Para mensagem "Abre às"

  for (const period of timePeriods) {
    const timeParts = period.split('–').map(t => t.trim());
    if (timeParts.length !== 2) continue; // Ignora formato inválido

    const [startStr, endStr] = timeParts;
    const openTime = timeToMinutes(startStr);
    const closeTime = timeToMinutes(endStr);

    if (openTime === null || closeTime === null) continue; // Ignora horário malformado

    // Armazena o próximo horário de abertura para o caso de estar fechado agora
    if (currentTimeInMinutes < openTime && openTime < nextOpenTimeToday) {
        nextOpenTimeToday = openTime;
    }

    let isOpenPeriod = false;
    // Lógica para horários que cruzam a meia-noite
    if (closeTime < openTime) {
      isOpenPeriod = (currentTimeInMinutes >= openTime || currentTimeInMinutes < closeTime);
    } else { // Horário normal no mesmo dia
      isOpenPeriod = (currentTimeInMinutes >= openTime && currentTimeInMinutes < closeTime);
    }

    if (isOpenPeriod) {
      // Calcula quanto tempo falta para fechar
      let minutesToClose;
      if (closeTime < openTime) { // Se cruza a meia-noite
          if(currentTimeInMinutes >= openTime){ // Se a hora atual é antes da meia-noite
              minutesToClose = (1440 - currentTimeInMinutes) + closeTime;
          } else { // Se a hora atual é depois da meia-noite
              minutesToClose = closeTime - currentTimeInMinutes;
          }
      } else { // Horário normal
          minutesToClose = closeTime - currentTimeInMinutes;
      }

      if (minutesToClose > 0 && minutesToClose <= 60) { // Fecha em até 1 hora
        return { isOpen: true, statusText: `Aberto. Fecha em ${minutesToClose} min (às ${endStr})`, statusType: "closing_soon" };
      }
      return { isOpen: true, statusText: `Aberto agora. Fecha às ${endStr}`, statusType: "open" };
    }
  }

  // Se chegou aqui, está fechado durante o horário de hoje
  let statusText = `Fechado agora (${currentDayName})`;
  if (nextOpenTimeToday !== Infinity) {
      const openHour = Math.floor(nextOpenTimeToday / 60);
      const openMinute = nextOpenTimeToday % 60;
      statusText += `. Abre às ${String(openHour).padStart(2,'0')}:${String(openMinute).padStart(2,'0')}`;
  }
  return { isOpen: false, statusText: statusText, statusType: "closed" };
};

function LocalOpeningHours({ horarios = [], localName }) {
  const [showAll, setShowAll] = useState(false);
  const [openStatus, setOpenStatus] = useState(() => checkOpenStatus(horarios)); // Calcular status inicial

  useEffect(() => {
    // Apenas re-calcula o status se os horários mudarem (pouco provável, mas para robustez)
    setOpenStatus(checkOpenStatus(horarios));

    // Atualiza o status a cada minuto para refletir mudanças de aberto/fechado
    const intervalId = setInterval(() => {
      setOpenStatus(checkOpenStatus(horarios));
    }, 60000); // 60 * 1000 ms = 1 minuto

    return () => clearInterval(intervalId); // Limpa o intervalo ao desmontar
  }, [horarios]);

  if (!horarios || horarios.length === 0) {
    return (
      <HoursWrapper>
        <SectionTitle><FaRegClock /> Horário de Funcionamento</SectionTitle>
        <CurrentStatus $statusType="unknown">Horário não informado.</CurrentStatus>
      </HoursWrapper>
    );
  }

  const todayName = dayMap[new Date().getDay()];
  // Ordena os horários pela ordem dos dias da semana
  const orderedHorarios = [...horarios].sort((a, b) => {
    const dayAIndex = dayMap.findIndex(d => d.toLowerCase() === a.dia.toLowerCase());
    const dayBIndex = dayMap.findIndex(d => d.toLowerCase() === b.dia.toLowerCase());
    // Coloca "Todos os dias" no final ou início se preferir, aqui deixa na ordem encontrada
    return (dayAIndex === -1 ? 8 : dayAIndex) - (dayBIndex === -1 ? 8 : dayBIndex);
  });

  const defaultVisibleCount = 7; // Mostrar até 7 dias por padrão
  const displayHorarios = showAll ? orderedHorarios : orderedHorarios.slice(0, defaultVisibleCount);

  return (
    <HoursWrapper>
      <SectionTitle><FaRegClock /> Horário de Funcionamento</SectionTitle>
      <CurrentStatus $isOpen={openStatus.isOpen} $statusType={openStatus.statusType}>
        {openStatus.statusText}
      </CurrentStatus>

      <HoursList>
        {displayHorarios.map((item, index) => (
          <HourEntry
            key={`${item.dia}-${index}`} // Chave mais robusta
            $isToday={item.dia.toLowerCase() === todayName.toLowerCase() || item.dia.toLowerCase() === 'todos os dias'} // Destaca "Todos os dias" também
          >
            <span className="day">{item.dia}</span>
            <span className="time">{item.horario}</span>
          </HourEntry>
        ))}
      </HoursList>

      {orderedHorarios.length > defaultVisibleCount && (
        <ToggleButton onClick={() => setShowAll(!showAll)}>
          {showAll ? 'Mostrar menos' : 'Mostrar todos os horários'}
          {showAll ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
        </ToggleButton>
      )}
    </HoursWrapper>
  );
}

export default LocalOpeningHours;