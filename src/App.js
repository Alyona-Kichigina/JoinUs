import NavigationDrawer from "@Components/NavigationDrawer";
import Header from "@Components/Header";
import NavContent from "./components/NavContent"
import { BrowserRouter } from "react-router-dom";
import "react-perfect-scrollbar/dist/css/styles.css"
import 'antd/dist/antd.css'
import "@Styles/style.css"
import "@Styles/fonts.css"
import "@Styles/animation.css"
import "@Styles/style-input.scss"
import "@Styles/style-btn.scss"
import "@Styles/typography.scss"
import "@Styles/markupHelpers.scss"
import "@Styles/colors.css"


function App() {
  return (
      <BrowserRouter>
        <div className="flex-row flex h-full w-full">
          <NavigationDrawer/>
          <div className="flex-container relative w-full overflow-hidden">
            <Header/>
            <NavContent />
          </div>
        </div>
      </BrowserRouter>
  );
}

export default App;
