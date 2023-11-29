import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { usePages } from "./contexts/PageContext";
import { Tiptap } from "./tiptap";
import Home from "./Home";
import "./styles.css";

function App() {
  const { allPages } = usePages();
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
