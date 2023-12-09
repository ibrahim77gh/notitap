import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { usePages } from "./contexts/PageContext";
import { Tiptap } from "./tiptap";
import Home from "./Home";
import "./styles.css";
import { useDarkMode } from "./contexts/DarkModeContext";
import { useEffect } from "react";

function App() {
  const { allPages } = usePages();

  const { darkMode } = useDarkMode();

  useEffect(() => {
    // Apply dark mode styles to the entire document body
    if (darkMode) {
      document.body.style.backgroundColor = '#121212'; // Set your desired background color for dark mode
      document.body.style.color = '#fff'; // Set your desired text color for dark mode
      document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    } else {
      // Reset styles to their defaults for light mode
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
      document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          {allPages?.map((page) => (
            <Route key={page.id} path={`${page.title}`} element={<Tiptap page={page} />} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );

}

export default App;
