import React, { useEffect } from 'react';
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router-dom';
import { usePages } from './contexts/PageContext';
import { useDarkMode } from './contexts/DarkModeContext';

const Home = () => {
  const { allPages } = usePages();
  const { darkMode } = useDarkMode(); // Extract darkMode from the context


  return (
    <div className={`app transition ${darkMode ? 'dark' : ''}`}>
      <div className="outermost-container">
        <div className="flexing-container">
          <Sidebar pages={allPages} />

          <div className="main-content">
            <div className="container mx-auto flex flex-col gap-4 max-w-[100ch]">
              <main className="flex justify-start w-full">
                <Outlet />
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
