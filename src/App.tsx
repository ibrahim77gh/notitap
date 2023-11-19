import { Tiptap } from "./tiptap";

import "./App.css";

function App() {
  return (
    <div className="App container mx-auto px-16 flex flex-col gap-4 max-w-[100ch]">
      <main className="flex justify-start w-full">
        <Tiptap />
      </main>
    </div>
  );
}

export default App;
