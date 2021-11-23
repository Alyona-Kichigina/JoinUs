import './App.css';
import NavigationDrawer from "@Components/NavigationDrawer";
import Header from "@Components/Header";
import "@Styles/style.css"
import "@Styles/fonts.css"


function App() {
  return (
    <div className="App">
      <div className="display-flex fd-row flex-container">
        <NavigationDrawer/>
        <Header/>
      </div>
    </div>
  );
}

export default App;
