import { useState, useEffect } from "react";
import { useNavigate, NavLink } from 'react-router-dom'
import { usePages } from "@/contexts/PageContext";
import axios from "axios";
import { useDarkMode } from "@/contexts/DarkModeContext";

type Page = {
  id: number;
  title: string;
  content: string | null;
};

interface SidebarProps {
  pages: Page[];
}
const defaultUserImg = "https://bit.ly/3rDDSOw";

const Sidebar: React.FC<SidebarProps> = ({ pages }) => {
  const [newPageName, setNewPageName] = useState('');
  const { allPages, setAllPages, addPage, deletePage } = usePages();
  const navigate = useNavigate()
  const { darkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    // Apply dark mode class to the document body
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);


  const handleAddPage = async () => {
      if (newPageName.trim() === '') {
          // Do not add a page with an empty name
          return;
      }
      // Create a new page object and add it to your pages state or data structure
      const newPage = {
          id:1,
          title: newPageName,
          content: null,
      };
      axios.post(`${import.meta.env.VITE_API_URL}/api/page/`, newPage)
        .then((response) => {
          console.log(response.data);
          const page = response.data
          setNewPageName(page.title)
          addPage(newPage)
          newPageName && navigate(`/${newPageName}`);
          setNewPageName('');
        })
        .catch((error) => console.error('Error saving HTML content:', error));

  }
  
  const handleDelete = async (e: React.MouseEvent, page: Page) => {
    e.stopPropagation();
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/page/${page.title}`);
      await deletePage(page.id);
      console.log('Page Deleted:', response.data); // Assuming the response contains useful information
  
      // Handle any additional logic after successful deletion
    } catch (error) {
      console.error('Error deleting page:', error);
  
      // Handle the error, e.g., show a notification to the user
      // You might also want to set state or trigger other actions based on the error
    }
  };

  return (
    <>
      <div className="side-navigation-bar">
        <div className="scrollbar">
          <div>
            <label className="relative inline-flex items-center me-5 cursor-pointer mb-5">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={darkMode}
                onChange={toggleDarkMode}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-sm font-medium">
                {darkMode ? 'Dark Mode On' : 'Dark Mode Off'}
              </span>
            </label>
            <div className="scrollbar-title">
              <div className="scrollbar-title-inner">
                <div className="scrollbar-title-inner-2">
                  <div className="scrollbar-title-inner-3">
                    <span>Pages</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Enter page name"
                value={newPageName}
                onChange={(e) => setNewPageName(e.target.value)}
                className="p-2 border border-gray-300 rounded-md mr-2 new-page-input"
              />
              <button
                className="p-2 bg-blue-500 text-white rounded-md"
                onClick={handleAddPage}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
            
            {pages.map((page) => {
              return (
                <div key={page.id} className="page-button-outer">
                  <div className="page-button">
                    <div className="page-button-inner">
                      <div className="triangle-container">
                        <div className="triangle-container-inner">
                          <span>
                            <svg viewBox="0 0 100 100" className="triangle">
                              <polygon points="5.9,88.2 50,11.8 94.1,88.2"></polygon>
                            </svg>
                          </span>
                        </div>
                      </div>
                      <a href={page.title}>
                        <span>
                          <span className="scrollbar-page-icon">
                            📄
                          </span>
                          <span className="scrollbar-page-txt">
                            {page.title ? page.title : "No name"}
                          </span>
                        </span>
                      </a>
                      <span className="ml-auto cursor-pointer" onClick={(e) => handleDelete(e, page)}>
                        <img width={15} height={15} src="/red-trash-can-icon.png" alt="Red Trash Can Icon" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
