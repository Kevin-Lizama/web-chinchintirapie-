import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Cronicas, Repositorio, MaterialEducativo } from './pages/OtherPages';
import './styles/global.css';

// Lazy-loaded pages for better performance
const Home         = lazy(() => import('./pages/Home'));
const Historia     = lazy(() => import('./pages/Historia'));
const Organizacion = lazy(() => import('./pages/Organizacion'));
const Noticias     = lazy(() => import('./pages/Noticias'));
const CEDOC        = lazy(() => import('./pages/CEDOC'));
const Contacto     = lazy(() => import('./pages/Contacto'));
const Tienda       = lazy(() => import('./pages/Tienda'));
const Login        = lazy(() => import('./pages/Login'));

// Loading fallback
function PageLoader() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      fontFamily: 'Bangers, cursive',
      fontSize: '2rem',
      letterSpacing: 3,
      color: 'var(--purpura)',
    }}>
      🥁 Cargando...
    </div>
  );
}

// Layout wrapper – Login page has no Navbar/Footer
function Layout() {
  const { pathname } = useLocation();
  const isLogin = pathname === '/login';

  return (
    <>
      {!isLogin && <Navbar />}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/"                    element={<Home />} />
          <Route path="/historia"            element={<Historia />} />
          <Route path="/organizacion"        element={<Organizacion />} />
          <Route path="/noticias"            element={<Noticias />} />
          <Route path="/cronicas"            element={<Cronicas />} />
          <Route path="/repositorio"         element={<Repositorio />} />
          <Route path="/cedoc"               element={<CEDOC />} />
          <Route path="/material-educativo"  element={<MaterialEducativo />} />
          <Route path="/contacto"            element={<Contacto />} />
          <Route path="/tienda"              element={<Tienda />} />
          <Route path="/login"               element={<Login />} />
          {/* 404 fallback */}
          <Route path="*" element={
            <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
              <div style={{ fontSize: '5rem' }}>🎭</div>
              <h1 style={{ fontFamily: 'Bangers, cursive', fontSize: '3rem', letterSpacing: 3 }}>Página no encontrada</h1>
              <p style={{ color: '#5a3e2b', margin: '1rem 0 2rem' }}>Parece que esta calle no lleva al carnaval.</p>
              <a href="/" className="btn btn-primary">← Volver al inicio</a>
            </div>
          } />
        </Routes>
      </Suspense>
      {!isLogin && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
