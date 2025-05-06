import React from 'react';
import styled from 'styled-components';
// Importando ícones sociais
import { FaFacebookF, FaTwitter, FaPinterestP, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';

// --- Breakpoints ---
const breakpoints = {
  desktop: '1024px',
  tablet: '768px',
  mobile: '480px',
};

// --- Styled Components ---

const FooterWrapper = styled.footer`
  background-color: #f7f7f7; // Fundo cinza claro
  color: #555; // Cor de texto padrão para o footer
  padding: 3rem 0 1.5rem 0; // Padding vertical (mais em cima, menos embaixo)
  border-top: 1px solid #e0e0e0; // Linha separadora sutil
  margin-top: 60px; // Espaço acima do footer
`;

// Container para limitar largura e centralizar conteúdo
const ContentWrapper = styled.div`
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 20px; // Padding lateral

  @media (max-width: ${breakpoints.tablet}) {
    padding: 0 15px;
  }
`;

// Container para as colunas de links (usando Grid)
const ColumnsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); // Colunas responsivas
  gap: 2rem 1.5rem; // Espaçamento entre colunas e linhas
  margin-bottom: 3rem; // Espaço antes da linha inferior

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr); // Duas colunas no mobile
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
`;

// Uma coluna do footer
const FooterColumn = styled.div`
  /* Estilos específicos da coluna, se necessário */
`;

// Título da coluna
const ColumnTitle = styled.h4`
  font-size: 0.95rem; // Tamanho ligeiramente menor
  font-weight: 700; // Negrito
  color: #1c1c1c; // Cor mais escura para o título
  margin-bottom: 1rem; // Espaço abaixo do título
  text-transform: uppercase; // Opcional: Deixar títulos em maiúsculo
  letter-spacing: 0.5px; // Opcional: Leve espaçamento

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.9rem;
  }
`;

// Lista de links
const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

// Item da lista
const ListItem = styled.li`
  margin-bottom: 0.6rem; // Espaçamento entre links

  &:last-child {
    margin-bottom: 0;
  }
`;

// Link individual do footer
const FooterLink = styled.a`
  text-decoration: none;
  color: #555; // Cor padrão do link
  font-size: 0.9rem; // Tamanho do link
  transition: color 0.2s ease;

  &:hover {
    color: #1c1c1c; // Escurece no hover
    text-decoration: underline; // Sublinha no hover (opcional)
  }

   @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.85rem;
  }
`;

// Linha inferior com copyright e ícones sociais
const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem; // Espaço acima da linha inferior
  border-top: 1px solid #e0e0e0; // Linha separadora

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column-reverse; // Inverte ordem no mobile (ícones acima)
    gap: 1rem; // Espaço entre copyright e ícones
    padding-top: 1rem;
  }
`;

// Texto de copyright
const CopyrightText = styled.p`
  font-size: 0.8rem;
  color: #777; // Cinza um pouco mais claro
  margin: 0;

  @media (max-width: ${breakpoints.mobile}) {
    text-align: center; // Centraliza no mobile
  }
`;

// Container para os ícones sociais
const SocialIconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem; // Espaço entre ícones

  @media (max-width: ${breakpoints.mobile}) {
    gap: 1.2rem; // Aumenta um pouco o gap no mobile
  }
`;

// Link de ícone social
const SocialIconLink = styled.a`
  color: #555; // Cor padrão do ícone
  font-size: 1.2rem; // Tamanho do ícone
  transition: color 0.2s ease, transform 0.2s ease;
  display: inline-block; // Para aplicar transform

  &:hover {
    color: #1c1c1c; // Escurece no hover
    transform: scale(1.1); // Leve aumento no hover
  }
`;

// --- Dados para os Links ---
const footerLinks = {
    about: [
        { text: 'Sobre !TGUIA', href: '#' },
        { text: 'Imprensa', href: '#' },
        { text: 'Recursos e Políticas', href: '#' },
        { text: 'Carreiras', href: '#' },
    ],
    explore: [
        { text: 'Escreva uma avaliação', href: '#' },
        { text: 'Adicionar um local', href: '#' },
        { text: 'Travellers\' Choice', href: '#' },
        { text: 'Central de Ajuda', href: '#' },
    ],
    business: [
        { text: 'Proprietários', href: '#' },
        { text: 'Vantagem Comercial', href: '#' },
        { text: 'Posicionamentos Patrocinados', href: '#' },
    ],
    sites: [
        { text: 'TheStorm', href: '#' },
        { text: '2Mick', href: '#' },
        { text: 'Afret', href: '#' },
        { text: 'Boomer', href: '#' },
    ]
};

// --- Componente Funcional ---
export default function Footer() {
  const currentYear = new Date().getFullYear(); // Pega o ano atual dinamicamente

  return (
    <FooterWrapper>
      <ContentWrapper>
        {/* Colunas de Links */}
        <ColumnsContainer>
          <FooterColumn>
            <ColumnTitle>Sobre !TGUIA</ColumnTitle>
            <LinkList>
              {footerLinks.about.map((link, index) => (
                <ListItem key={`about-${index}`}><FooterLink href={link.href}>{link.text}</FooterLink></ListItem>
              ))}
            </LinkList>
          </FooterColumn>

          <FooterColumn>
            <ColumnTitle>Explore</ColumnTitle>
            <LinkList>
               {footerLinks.explore.map((link, index) => (
                <ListItem key={`explore-${index}`}><FooterLink href={link.href}>{link.text}</FooterLink></ListItem>
              ))}
            </LinkList>
          </FooterColumn>

          <FooterColumn>
            <ColumnTitle>Faça Negócios Conosco</ColumnTitle>
            <LinkList>
              {footerLinks.business.map((link, index) => (
                <ListItem key={`business-${index}`}><FooterLink href={link.href}>{link.text}</FooterLink></ListItem>
              ))}
            </LinkList>
          </FooterColumn>

          <FooterColumn>
            <ColumnTitle>Sites !TGUIA</ColumnTitle>
            <LinkList>
              {footerLinks.sites.map((link, index) => (
                <ListItem key={`sites-${index}`}><FooterLink href={link.href}>{link.text}</FooterLink></ListItem>
              ))}
            </LinkList>
          </FooterColumn>
        </ColumnsContainer>

        {/* Linha Inferior */}
        <BottomRow>
          <CopyrightText>
            © {currentYear} !TGUIA LLC Todos os direitos reservados.
          </CopyrightText>
          <SocialIconsContainer>
            <SocialIconLink href="#" aria-label="Facebook"><FaFacebookF /></SocialIconLink>
            <SocialIconLink href="#" aria-label="Twitter"><FaTwitter /></SocialIconLink>
            <SocialIconLink href="#" aria-label="Pinterest"><FaPinterestP /></SocialIconLink>
            <SocialIconLink href="#" aria-label="Instagram"><FaInstagram /></SocialIconLink>
            <SocialIconLink href="#" aria-label="YouTube"><FaYoutube /></SocialIconLink>
            <SocialIconLink href="#" aria-label="TikTok"><FaTiktok /></SocialIconLink>
          </SocialIconsContainer>
        </BottomRow>
      </ContentWrapper>
    </FooterWrapper>
  );
}