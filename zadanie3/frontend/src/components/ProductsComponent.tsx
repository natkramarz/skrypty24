import { useEffect, useState } from 'react'
import '.././App.css'
import { useNavigate } from "react-router-dom";
import { Product } from '../types/types';

  

function ProductsComponent() {
    const [products, setProducts] = useState<Product[]>([]);
    const navigate = useNavigate();


    const handleClick = (product_id: number) => {
        navigate(`/products/${product_id}`);
    };
  
    useEffect(() => {
      fetch("http://localhost:3000/products")
        .then((res) => res.json())
        .then((data) => {
          setProducts(data)});
    }, []);
  
    return (
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.name} className="product-item">
            <p>{product.name}</p>
            <img src={product.image_url} onClick={() => handleClick(product.id)} />
          </div>
        ))}
      </div>
    );
  }
  
  export default ProductsComponent;