import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import ArticlePage from "./components/ArticlePage/ArticlePage";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article" element={<ArticlePage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
