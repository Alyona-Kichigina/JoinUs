import './App.css';
import NavigationDrawer from "@Components/NavigationDrawer";
import Header from "@Components/Header";
import NavContent from "./components/NavContent"
import "@Styles/style.css"
import "@Styles/fonts.css"
import "@Styles/animation.css"


function App() {
  return (
    <div className="App">
      <div className="fd-row flex-container">
        <NavigationDrawer/>
        <div className="flex-container pos-relative w-100 overflow-hidden">
          <Header/>
          <NavContent />
        </div>
      </div>
    </div>
  );
}

export default App;
