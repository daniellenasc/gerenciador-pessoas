import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <div className="App">
      <Toaster />
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/:userID" element={<DetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
