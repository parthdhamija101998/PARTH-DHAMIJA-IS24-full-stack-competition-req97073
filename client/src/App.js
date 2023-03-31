import "./App.css";

//Components
import NavBar from "./components/NavBar";
import AddProduct from "./components/AddProduct";
import AllProducts from "./components/AllProducts";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditProduct from "./components/EditProduct";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<AllProducts />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/product/:productId" element={<EditProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
