import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ contextValue }) => {
  const location = useLocation();
  const { searchVal, onSearchChange } = contextValue;

  return (
    <div className="min-h-screen bg-background text-on-background grid-pattern relative overflow-hidden">
      {/* Background Ambient Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] pointer-events-none animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none animate-blob animation-delay-2000"></div>
      <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none animate-blob animation-delay-4000"></div>

      {/* Sidebar navigation */}
      <Sidebar />

      {/* Top Header bar */}
      <Header searchVal={searchVal} onSearchChange={onSearchChange} />

      {/* Main viewport */}
      <main className="ml-[280px] pt-24 px-8 pb-8 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <Outlet context={contextValue} />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Layout;
