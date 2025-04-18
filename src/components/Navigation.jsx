import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

const Navigation = () => {
  const { user } = useSelector(state => state.auth);
  const { isDark, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // Set default language if none is selected
    if (!i18n.language) {
      i18n.changeLanguage('en');
    }
  }, [i18n]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Navbar
      bg={isDark ? 'dark' : 'light'}
      variant={isDark ? 'dark' : 'light'}
      expand="lg"
      className="sticky-top"
      data-theme={isDark ? 'dark' : 'light'}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className={isDark ? 'text-light' : 'text-dark'}>
          {t('nav.brand', 'Gazelle Masters')}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/tournaments" className={isDark ? 'text-light' : ''}>
              {t('nav.tournaments')}
            </Nav.Link>
            <Nav.Link as={Link} to="/standings" className={isDark ? 'text-light' : ''}>
              {t('nav.standings')}
            </Nav.Link>
            <Nav.Link as={Link} to="/champions" className={isDark ? 'text-light' : ''}>
              {t('nav.champions')}
            </Nav.Link>
            <Nav.Link as={Link} to="/league" className={isDark ? 'text-light' : ''}>
              {t('nav.league')}
            </Nav.Link>
            {user && (
              <Nav.Link as={Link} to="/dashboard" className={isDark ? 'text-light' : ''}>
                {t('nav.dashboard')}
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            <NavDropdown
              title={t('languages.' + (i18n.language || 'en'))}
              id="language-nav-dropdown"
              className={isDark ? 'text-light' : ''}
            >
              <NavDropdown.Item onClick={() => changeLanguage('en')}>🇬🇧 {t('languages.en')}</NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeLanguage('sw')}>🇰🇪 {t('languages.sw')}</NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeLanguage('es')}>🇪🇸 {t('languages.es')}</NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeLanguage('ja')}>🇯🇵 {t('languages.ja')}</NavDropdown.Item>
            </NavDropdown>
            {user ? (
              <Nav.Link onClick={() => {/* implement logout */}} className={isDark ? 'text-light' : ''}>
                {t('nav.logout')}
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login" className={isDark ? 'text-light' : ''}>
                {t('nav.login')}
              </Nav.Link>
            )}
            <Nav.Link onClick={toggleTheme} className={isDark ? 'text-light' : ''}>
              {isDark ? '☀️ Light' : '🌙 Dark'}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;