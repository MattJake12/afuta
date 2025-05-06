// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate, Link } from 'react-router-dom'; 

// Páginas
import HomePage from './pages/HomePage'; // Certifique-se que este arquivo existe
import AuthPage from './pages/AuthPage'; // Certifique-se que este arquivo existe
import DetailPage from './pages/DetailPage'; // Página de detalhes genérica
import CategoryPage from './pages/CategoryPage'; // Página de listagem por categoria

// Layout
import HeaderAura from './components/HeaderAura'; // Seu Header (assumindo que existe)
import Footer from './components/Footer'; // Seu Footer (assumindo que existe)
import GlobalStyle from './styles/GlobalStyle'; // Seu GlobalStyle (assumindo que existe)

// Componente para mensagem de carregamento (opcional, pode ser inline)
const LoadingComponent = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 200px)', fontSize: '1.5rem', color: '#555', textAlign: 'center', padding: '20px' }}>
    Carregando dados...
  </div>
);

// Componente para mensagem de erro (opcional, pode ser inline)
const ErrorComponent = ({ message }) => (
  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 200px)', color: '#c00', padding: '20px', textAlign: 'center' }}>
    <h2>Ocorreu um erro</h2>
    <p>{message || "Não foi possível carregar os dados."}</p>
    <p>Por favor, tente recarregar a página ou volte mais tarde.</p>
    <Link to="/" style={{ marginTop: '15px', color: '#007bff', textDecoration: 'underline' }}>Voltar para a Página Inicial</Link>
  </div>
);

// Componente para Página Não Encontrada (404)
const NotFoundPage = () => (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 200px)', textAlign: 'center', padding: '20px' }}>
      <h2>404 - Página Não Encontrada</h2>
      <p>Desculpe, a página que você está procurando não existe.</p>
      <Link to="/" style={{ marginTop: '15px', color: '#007bff', textDecoration: 'underline' }}>Voltar para a Página Inicial</Link>
    </div>
);


function App() {
  const location = useLocation();
  const [allLocais, setAllLocais] = useState([]);
  const [loadingLocais, setLoadingLocais] = useState(true);
  const [errorLocais, setErrorLocais] = useState(null);

  // Nomes dos arquivos JSON correspondentes aos IDs das categorias em HeaderAura
  const categoriasArquivos = [
    'alimentacao.json', 'infantil.json', 'beleza.json',
    'lazer.json', 'pets.json'
  ];

  useEffect(() => {
    const fetchTodosOsLocais = async () => {
      setLoadingLocais(true);
      setErrorLocais(null);
      setAllLocais([]);

      try {
        const promessas = categoriasArquivos.map(arquivo =>
          fetch(`/data/${arquivo}`)
            .then(response => {
              if (!response.ok) {
                if (response.status === 404 && arquivo === 'pets.json') {
                  console.warn(`Aviso: Arquivo ${arquivo} não encontrado (404), retornando array vazio.`);
                  return [];
                }
                throw new Error(`HTTP error! status: ${response.status} para ${arquivo}`);
              }
              const contentType = response.headers.get("content-type");
              if (contentType && contentType.indexOf("application/json") !== -1) {
                 return response.json();
              } else {
                 console.warn(`Aviso: Resposta para ${arquivo} não é JSON. Conteúdo pode estar vazio ou incorreto.`);
                 return [];
              }
            })
            .catch(err => {
              console.error(`Erro ao buscar ou processar ${arquivo}:`, err.message);
              if (arquivo === 'pets.json') return [];
              throw new Error(`Falha ao carregar dados essenciais (${arquivo}).`);
            })
        );

        const arraysDeLocaisPorCategoria = await Promise.all(promessas);
        const locaisValidos = arraysDeLocaisPorCategoria.filter(Array.isArray);
        const locaisCombinados = locaisValidos.flat();
        setAllLocais(locaisCombinados);

      } catch (e) {
        setErrorLocais(e.message);
        console.error("Falha final ao carregar locais:", e);
      } finally {
        setLoadingLocais(false);
      }
    };

    fetchTodosOsLocais();
  }, []); // Roda apenas uma vez no mount

  // Define se Header e Footer devem ser exibidos
  const showHeaderFooter = !['/login', '/auth'].includes(location.pathname.toLowerCase());

  // Função para renderizar o conteúdo principal
  const renderMainContent = () => {
    if (loadingLocais) {
      // Não renderiza rotas enquanto carrega para evitar renderizações parciais
      // O Header/Footer serão exibidos fora desta função se showHeaderFooter for true
      return <LoadingComponent />;
    }
    if (errorLocais) {
      // Não renderiza rotas se houver erro no carregamento dos dados essenciais
      return <ErrorComponent message={errorLocais} />;
    }
    
    // Dados carregados sem erro, renderiza as rotas
    return (
      <Routes>
        {/* Ordem das Rotas é Importante: Mais específicas primeiro */}
        
        {/* Rotas de Autenticação */}
        <Route path="/login" element={<AuthPage />} />
        <Route path="/auth" element={<AuthPage />} />

        {/* Rota Principal */}
        <Route path="/" element={<HomePage allLocais={allLocais} />} />

        {/* Rota para Página de Detalhes (Genérica) */}
        {/* Precisa vir antes da rota genérica de categoria */}
        <Route path="/local/:localId" element={<DetailPage allLocais={allLocais} />} />

        {/* Rota Dinâmica ÚNICA para todas as Categorias */}
        {/* Irá capturar /alimentacao, /lazer, etc. */}
        <Route path="/:categoriaId" element={<CategoryPage allLocais={allLocais} />} />

        {/* Rota de Fallback (Página Não Encontrada) - Última rota */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    );
  };

  return (
    <>
      <GlobalStyle /> {/* Estilos Globais */}
      
      {/* Header (renderizado condicionalmente) */}
      {showHeaderFooter && <HeaderAura allLocais={allLocais} />} {/* Passa allLocais */}

      <main>
        {renderMainContent()} {/* Renderiza Loading, Erro ou Rotas */}
      </main>

      {/* Footer (renderizado condicionalmente) */}
      {showHeaderFooter && <Footer />}
    </>
  );
}

export default App;