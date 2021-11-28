import './App.css';
import NavigationDrawer from "@Components/NavigationDrawer";
import Header from "@Components/Header";
import NavContent from "./components/NavContent"
import { BrowserRouter } from "react-router-dom";
import "@Styles/style.css"
import "@Styles/fonts.css"
import "@Styles/animation.css"


function App() {
  return (
      <BrowserRouter>
         <div className="App">
           <div className="fd-row flex-container">
             <NavigationDrawer/>
             <div className="flex-container pos-relative w-100 overflow-hidden">
               <Header/>
               <NavContent />
             </div>
           </div>
         </div>
      </BrowserRouter>
  );
}

export default App;
