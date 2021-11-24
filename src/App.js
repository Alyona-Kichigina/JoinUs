import './App.css';
import NavContent from "./components/NavContent"
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
          <div className="App">
              <NavContent />
          </div>
      </BrowserRouter>
  );
}

export default App;
