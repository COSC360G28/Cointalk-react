import "./App.css";
import { NavBar } from "./components/navBar/NavBar";
import { CategorySelector } from "./components/categorySelector/CategorySelector";

function App() {
  return (
    <div className="App">
      <NavBar />
      <CategorySelector />
    </div>
  );
}

export default App;
