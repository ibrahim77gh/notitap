import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';

type Page = {
  id: number;
  title: string;
  content: string;
};

type PagesContextType = {
  allPages: Page[];
  setAllPages: React.Dispatch<React.SetStateAction<Page[]>>;
};

const PagesContext = createContext<PagesContextType | undefined>(undefined);

type PagesProviderProps = {
  children: ReactNode;
};

export const PagesProvider: React.FC<PagesProviderProps> = ({ children }) => {
  const [allPages, setAllPages] = useState<Page[]>([]);

  useEffect(() => {
    // Function to fetch data from the API and set it to the context
    const fetchData = async () => {
      try {
        axios.get(`${import.meta.env.VITE_API_URL}/api/page/`)
        .then((response) => {
          console.log(response.data);
          setAllPages(response.data);
        })
        .catch((error) => console.error('Error fetching content:', error));

        // Assuming your API response is an array of pages
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []);

  return (
    <PagesContext.Provider value={{ allPages, setAllPages }}>
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
