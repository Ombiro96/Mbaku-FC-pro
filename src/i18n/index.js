import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        brand: 'Gazelle Masters Hub',
        home: 'Home',
        tournaments: 'Tournaments',
        standings: 'Standings',
        champions: 'Champions',
        league: 'National League',
        login: 'Login',
        register: 'Register',
        dashboard: 'Dashboard',
        logout: 'Logout'
      },
      languages: {
        en: 'English',
        sw: 'Kiswahili',
        es: 'Español',
        ja: '日本語'
      },
      home: {
        welcome: 'Welcome to Gazelle Masters Hub',
        subtitle: 'Join the most prestigious chess tournament series in Kenya',
        cta: {
          view_tournaments: 'View Tournaments',
          register: 'Register Now',
          learn_more: 'Learn More'
        },
        featured_players: 'Featured Players',
        upcoming_tournaments: 'Upcoming Tournaments',
        join_community: 'Join the Community',
        community_text: 'Connect with fellow chess players, participate in tournaments, and improve your game'
      },
      champions: {
        title: 'Kenya Chess Champions',
        subtitle: 'Celebrating Excellence in Kenyan Chess',
        year: 'Year',
        rating: 'Rating',
        achievements: 'Achievements',
        current_champion: 'Current Champion',
        past_champions: 'Past Champions',
        grand_prix_points: 'Grand Prix Points',
        view_profile: 'View Profile',
        tournament_wins: 'Tournament Wins'
      },
      footer: {
        about: 'About Gazelle Masters Hub',
        quick_links: 'Quick Links',
        contact: 'Contact',
        rights: 'All rights reserved'
      }
    }
  },
  sw: {
    translation: {
      nav: {
        brand: 'Gazelle Masters Hub',
        home: 'Nyumbani',
        tournaments: 'Mashindano',
        standings: 'Msimamo',
        champions: 'Mabingwa',
        league: 'Ligi ya Kitaifa',
        dashboard: 'Dashibodi',
        login: 'Ingia',
        logout: 'Toka'
      },
      languages: {
        en: 'English',
        sw: 'Kiswahili',
        es: 'Español',
        ja: '日本語'
      },
      home: {
        welcome: 'Karibu kwenye Gazelle Masters Hub',
        subtitle: 'Jiunge na mashindano bora zaidi ya chess nchini Kenya',
        cta: {
          view_tournaments: 'Tazama Mashindano',
          register: 'Jiandikishe Sasa',
          learn_more: 'Jifunze Zaidi'
        },
        featured_players: 'Wachezaji Mashuhuri',
        upcoming_tournaments: 'Mashindano Yanayokuja',
        join_community: 'Jiunge na Jamii',
        community_text: 'Ungana na wachezaji wenzako, shiriki katika mashindano, na boresha mchezo wako'
      },
      champions: {
        title: 'Mabingwa wa Chess Kenya',
        subtitle: 'Tunasherehekea Ubora katika Chess ya Kenya',
        year: 'Mwaka',
        rating: 'Alama',
        achievements: 'Mafanikio',
        current_champion: 'Bingwa wa Sasa',
        past_champions: 'Mabingwa wa Zamani',
        grand_prix_points: 'Pointi za Grand Prix',
        view_profile: 'Tazama Wasifu',
        tournament_wins: 'Ushindi wa Mashindano'
      },
      footer: {
        about: 'Kuhusu Gazelle Masters Hub',
        quick_links: 'Viungo vya Haraka',
        contact: 'Mawasiliano',
        rights: 'Haki zote zimehifadhiwa'
      }
    }
  },
  es: {
    translation: {
      nav: {
        home: 'Inicio',
        tournaments: 'Torneos',
        standings: 'Clasificación',
        champions: 'Campeones',
        login: 'Iniciar Sesión',
        register: 'Registrarse',
        dashboard: 'Panel de Control',
        logout: 'Cerrar Sesión'
      },
      languages: {
        en: 'English',
        sw: 'Kiswahili',
        es: 'Español',
        ja: '日本語'
      },
      home: {
        welcome: 'Bienvenido al Grand Prix de Ajedrez de Kenia',
        subtitle: 'Únete a la serie de torneos de ajedrez más prestigiosa de Kenia',
        cta: {
          view_tournaments: 'Ver Torneos',
          register: 'Registrarse Ahora',
          learn_more: 'Más Información'
        },
        featured_players: 'Jugadores Destacados',
        upcoming_tournaments: 'Próximos Torneos',
        join_community: 'Únete a la Comunidad',
        community_text: 'Conéctate con otros jugadores de ajedrez, participa en torneos y mejora tu juego'
      },
      champions: {
        title: 'Campeones de Ajedrez de Kenia',
        subtitle: 'Celebrando la Excelencia en el Ajedrez Keniano',
        year: 'Año',
        rating: 'Rating',
        achievements: 'Logros',
        current_champion: 'Campeón Actual',
        past_champions: 'Campeones Anteriores',
        grand_prix_points: 'Puntos Grand Prix',
        view_profile: 'Ver Perfil',
        tournament_wins: 'Victorias en Torneos'
      },
      footer: {
        about: 'Sobre Gazelle Masters Hub',
        quick_links: 'Enlaces Rápidos',
        contact: 'Contacto',
        rights: 'Todos los derechos reservados'
      }
    }
  },
  ja: {
    translation: {
      nav: {
        home: 'ホーム',
        tournaments: '大会',
        standings: 'ランキング',
        champions: 'チャンピオン',
        login: 'ログイン',
        register: '登録',
        dashboard: 'ダッシュボード',
        logout: 'ログアウト'
      },
      languages: {
        en: 'English',
        sw: 'Kiswahili',
        es: 'Español',
        ja: '日本語'
      },
      home: {
        welcome: 'ケニアチェスグランプリへようこそ',
        subtitle: 'ケニアで最も権威のあるチェストーナメントシリーズに参加しよう',
        cta: {
          view_tournaments: '大会を見る',
          register: '今すぐ登録',
          learn_more: '詳細を見る'
        },
        featured_players: '注目選手',
        upcoming_tournaments: '今後の大会',
        join_community: 'コミュニティに参加',
        community_text: 'チェスプレイヤーと交流し、大会に参加して、プレイを向上させよう'
      },
      champions: {
        title: 'ケニアチェスチャンピオン',
        subtitle: 'ケニアチェスの卓越性を称えて',
        year: '年',
        rating: 'レーティング',
        achievements: '実績',
        current_champion: '現チャンピオン',
        past_champions: '歴代チャンピオン',
        grand_prix_points: 'グランプリポイント',
        view_profile: 'プロフィールを見る',
        tournament_wins: 'トーナメント優勝'
      },
      footer: {
        about: 'Gazelle Masters Hubについて',
        quick_links: 'クイックリンク',
        contact: 'お問い合わせ',
        rights: '全ての権利を保有'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;