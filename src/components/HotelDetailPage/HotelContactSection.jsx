// src/components/HotelDetailPage/HotelContactSection.jsx
// Ou renomeie para src/components/DetailPageComponents/LocalContactSection.jsx e ajuste os imports
import React from 'react';
import styled from 'styled-components';
import { FaPhoneAlt, FaGlobe, FaWhatsapp, FaEnvelope, FaInstagram } from 'react-icons/fa';

// Paleta de cores
const colors = {
  textPrimary: '#1c1c1c',
  textSecondary: '#555',
  linkColor: '#007bff', // Cor padrão para links
  borderLight: '#eee',
  backgroundLight: '#f9f9f9',
};

const ContactWrapper = styled.section`
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
  margin-bottom: 15px;
`;

const ContactList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px; // Aumentar um pouco o espaço
`;

const ContactItem = styled.li`
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.9rem;
    color: ${colors.textSecondary}; // Cor do texto padrão

    svg {
        color: ${colors.textSecondary}; // Ícone na cor secundária
        flex-shrink: 0;
        width: 16px; // Definir largura fixa para alinhar
        text-align: center;
    }

    a {
        color: ${colors.linkColor}; // Cor específica para links
        text-decoration: none;
        word-break: break-all;
        font-weight: 500; // Leve negrito nos links

        &:hover {
            text-decoration: underline;
            color: #0056b3; // Cor mais escura no hover
        }
    }

    .phone-number { // Classe específica para número de telefone não-link
        color: ${colors.textPrimary};
        font-weight: 500;
    }
`;

// Renomeie a função se renomear o arquivo
function HotelContactSection({ contact }) {
  if (!contact || Object.values(contact).every(value => !value || (Array.isArray(value) && value.length === 0))) {
    return null; // Não renderiza se o objeto de contato estiver vazio ou todos os valores forem nulos/vazios
  }

  // Helper para limpar número de telefone para link tel:
  const formatTelLink = (phone) => phone ? phone.replace(/[^\d+]/g, '') : '';
  // Helper para limpar número de WhatsApp para link wa.me:
  const formatWaLink = (whatsapp) => whatsapp ? whatsapp.replace(/[^\d]/g, '') : '';
  // Helper para formatar link do Instagram
  const formatInstaLink = (instaHandle) => {
      if (!instaHandle) return '#';
      if (instaHandle.startsWith('http')) return instaHandle;
      return `https://instagram.com/${instaHandle.replace('@','')}`;
  }
   // Helper para formatar link do Website
  const formatWebLink = (website) => {
      if (!website) return '#';
      if (website.startsWith('http')) return website;
      return `http://${website}`;
  }

  return (
    <ContactWrapper>
      <SectionTitle>Contato</SectionTitle>
      <ContactList>
        {contact.phone && (
           <ContactItem>
                <FaPhoneAlt />
                {/* Se for array, junta com vírgula, senão mostra direto */}
                {Array.isArray(contact.phone) ? (
                     // Idealmente, criar um link para cada número se for array
                     contact.phone.map((ph, index) => (
                         <a key={index} href={`tel:${formatTelLink(ph)}`}>{ph}</a>
                     )).reduce((prev, curr) => [prev, ', ', curr]) // Adiciona vírgula entre eles
                ) : (
                     <a href={`tel:${formatTelLink(contact.phone)}`}>{contact.phone}</a>
                )}
           </ContactItem>
        )}
        {contact.email && (
           <ContactItem>
                <FaEnvelope />
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
           </ContactItem>
        )}
        {contact.whatsapp && (
           <ContactItem>
                <FaWhatsapp />
                <a href={`https://wa.me/${formatWaLink(contact.whatsapp)}`} target="_blank" rel="noopener noreferrer">
                    {contact.whatsapp} (WhatsApp)
                </a>
           </ContactItem>
        )}
        {contact.website && (
           <ContactItem>
                <FaGlobe />
                <a href={formatWebLink(contact.website)} target="_blank" rel="noopener noreferrer">
                    Visitar Website
                </a>
           </ContactItem>
        )}
        {contact.instagram && (
           <ContactItem>
                <FaInstagram />
                <a href={formatInstaLink(contact.instagram)} target="_blank" rel="noopener noreferrer">
                    {contact.instagram.startsWith('@') ? contact.instagram : `@${contact.instagram}`}
                </a>
           </ContactItem>
        )}
      </ContactList>
    </ContactWrapper>
  );
}

// Renomeie o export se renomear o componente/arquivo
export default HotelContactSection;