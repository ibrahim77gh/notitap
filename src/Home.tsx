import React from 'react'
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router-dom';
import { usePages } from './contexts/PageContext';

const Home = () => {
    const { allPages } = usePages();
    return (
        <>
          <div className="outermost-container">
            <div className="flexing-container">
              <Sidebar pages={allPages} />
    
              <div className="main-content">
                <div className="App container mx-auto px-16 flex flex-col gap-4 max-w-[100ch]">
                  <main className="flex justify-start w-full">
                    <Outlet/>
                  </main>
                </div>
              </div>
            </div>
          </div>
        </>
      );
}

export default Home