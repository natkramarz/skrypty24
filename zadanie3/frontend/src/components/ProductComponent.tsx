import { useEffect, useState} from 'react';
import { Category, Product } from '../types/types';
import { useParams } from 'react-router-dom';

const ProductComponent = () => {
    const [category, setCategory] = useState<Category>();
    const [product, setProduct] = useState<Product>();

    const { product_id } = useParams(); 
  
    useEffect(() => {
      fetch(`http://localhost:3000/products/${product_id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data)});
    }, [product_id]);


    useEffect(() => {
        if (product) {
        fetch(`http://localhost:3000/categories/${product.category_id}`)
          .then((res) => res.json())
          .then((data) => 
            setCategory(data));
        }
      }, [product]);



    return (
        <>
          {product && (
            <div>
              <h1>{product.name}</h1>
              <img src={product.image_url} alt={product.name} style={{ maxWidth: "200px", maxHeight: "200px" }} />
              <p>Price: {product.price}</p>
              <p>Category: {category ? category.name : "-"}</p>
            </div>
          )}
        </>
      );
}

export default ProductComponent;
