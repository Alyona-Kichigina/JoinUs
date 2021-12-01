import NavigationDrawer from "@Components/NavigationDrawer";
import Header from "@Components/Header";
import NavContent from "./components/NavContent"
import { BrowserRouter } from "react-router-dom";
import "@Styles/style.css"
import "@Styles/fonts.css"
import "@Styles/animation.css"
import "@Styles/style-input.scss"


function App() {
  return (
      <BrowserRouter>
        <div className="flex h-full">
          <div className="flex-row flex-container w-full">
            <NavigationDrawer/>
            <div className="flex-container relative w-full overflow-hidden">
              <Header/>
              <NavContent />
            </div>
          </div>
        </div>
      </BrowserRouter>
  );
}

export default App;
