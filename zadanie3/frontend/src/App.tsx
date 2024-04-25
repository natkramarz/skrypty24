import './App.css'
import ProductComponent from './components/ProductComponent';
import ProductsComponent from './components/ProductsComponent';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {

  return <Router>
  <Routes>
    <Route
      path="/"
      element={
        <ProductsComponent/>
      }
    />
    <Route path="/products/:product_id" element={<ProductComponent />} />
  </Routes>
</Router>
}

export default App
