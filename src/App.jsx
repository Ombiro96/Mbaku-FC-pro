// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import MainLayout from './components/layouts/MainLayout';
import AuthLayout from './components/layouts/AuthLayout';
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
        <Routes>
          {/* Auth routes without header/footer */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Main routes with header/footer */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
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
          </Route>
        </Routes>
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;