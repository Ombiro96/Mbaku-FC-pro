import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const AuthLayout = () => {
  const { isDark } = useTheme();

  const fadeInUp = {
    initial: {
      opacity: 0,
      y: 10
    },
    animate: {
      opacity: 1,
      y: 0
    },
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  };

  return (
    <div
      className={`min-vh-100 d-flex flex-column ${
        isDark ? 'bg-dark text-light' : 'bg-light'
      }`}
    >
      {/* Logo/Brand Header */}
      <div className="py-4 text-center">
        <motion.div
          initial={fadeInUp.initial}
          animate={fadeInUp.animate}
          transition={fadeInUp.transition}
        >
          <Link to="/" className="text-decoration-none">
            <h1 className={`h3 mb-0 ${isDark ? 'text-light' : 'text-dark'}`}>
              Gazelle Masters
            </h1>
          </Link>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <motion.div
          className="w-100 px-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Outlet />
        </motion.div>
      </div>

      {/* Simple Footer */}
      <motion.div
        className="py-3 text-center"
        initial={fadeInUp.initial}
        animate={fadeInUp.animate}
        transition={{ ...fadeInUp.transition, delay: 0.3 }}
      >
        <small className="text-muted">
          © {new Date().getFullYear()} Gazelle Masters. All rights reserved.
        </small>
      </motion.div>
    </div>
  );
};

export default AuthLayout;