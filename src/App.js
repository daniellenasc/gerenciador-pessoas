import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Toaster } from "react-hot-toast";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <Toaster />
      <NavBar />
    </div>
  );
}

export default App;
