// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Navigation from './components/Navigation';
import PrivateRoute from './components/PrivateRoute';
import {
  Home,
  Dashboard,
  Tournaments,
  TournamentDetails,
  GrandPrixStandings,
  Login,
  Register,
  NotFound
} from './pages';
import Footer from './components/Footer';
import Champions from './pages/Champions';
import League from './pages/League';
import { useEffect } from 'react';
import { updateDocumentMeta } from './utils/documentMeta';

function App() {
  useEffect(() => {
    updateDocumentMeta();
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <div className="d-flex flex-column min-vh-100">
          <Navigation className="sticky-top" />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
              <Route path="/champions" element={<Champions />} />
              <Route path="/tournaments" element={<Tournaments />} />
              <Route path="/tournament/:id" element={<TournamentDetails />} />
              <Route path="/standings" element={<GrandPrixStandings />} />
              <Route path="/league" element={<League />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;