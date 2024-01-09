import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';

type Page = {
  id: number;
  title: string;
  content: string | null;
};

type PagesContextType = {
  allPages: Page[];
  setAllPages: React.Dispatch<React.SetStateAction<Page[]>>;
  addPage: (newPage: Page) => void;
  deletePage: (pageId: number) => void;
};

const PagesContext = createContext<PagesContextType | undefined>(undefined);

type PagesProviderProps = {
  children: ReactNode;
};

export const PagesProvider: React.FC<PagesProviderProps> = ({ children }) => {
  const [allPages, setAllPages] = useState<Page[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/page/`);
      console.log(response.data);
      setAllPages(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Call the fetchData function when the component mounts
    fetchData();
  }, []);

  const addPage = (newPage: Page) => {
    setAllPages((prevPages) => [...prevPages, newPage]);
    
    // Make a new API call to update the data
    fetchData();
  };

  const deletePage = (pageId: number) => {
    setAllPages((prevPages) => prevPages.filter((page) => page.id !== pageId));
    
    // Make a new API call to update the data
    fetchData();
  };

  return (
    <PagesContext.Provider value={{ allPages, setAllPages, addPage, deletePage }}>
      {children}
    </PagesContext.Provider>
  );
};

export const usePages = (): PagesContextType => {
  const context = useContext(PagesContext);

  if (!context) {
    throw new Error('usePages must be used within a PagesProvider');
  }

  return context;
};

