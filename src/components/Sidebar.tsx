import { useState } from "react";
import { useNavigate, NavLink } from 'react-router-dom'
import { usePages } from "@/contexts/PageContext";
import axios from "axios";

type Page = {
  id: number;
  title: string;
  content: string;
};

interface SidebarProps {
  pages: Page[];
}
const defaultUserImg = "https://bit.ly/3rDDSOw";

const Sidebar: React.FC<SidebarProps> = ({ pages }) => {
  const [newPageName, setNewPageName] = useState('');
  const { allPages, setAllPages } = usePages();
  const navigate = useNavigate()

  const handleAddPage = () => {
      if (newPageName.trim() === '') {
          // Do not add a page with an empty name
          return;
      }
      // Create a new page object and add it to your pages state or data structure
      const newPage = {
          title: newPageName,
      };
      axios.post(`${import.meta.env.VITE_API_URL}/api/page/`, newPage)
        .then((response) => {
          console.log(response.data);
          const page = response.data
          setNewPageName(page.title)
          setAllPages((prevPages) => [...prevPages, response.data]);
        })
        .catch((error) => console.error('Error saving HTML content:', error));

        newPageName && navigate(`/${newPageName}`);
  }

  return (
    <>
      <div className="side-navigation-bar">
        <div className="scrollbar">
          <div>
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
                className="p-2 border border-gray-300 rounded-md mr-2"
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>

            {pages.map((page) => {
              return (
                <div key={page.id} className="page-button-outer">
                  <a href={page.title}>
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
                        <span>
                          <span className="scrollbar-page-icon">
                            📄
                          </span>
                          <span className="scrollbar-page-txt">
                            {page.title ? page.title : "No name"}
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
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
