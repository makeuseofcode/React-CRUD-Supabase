import { useState, useEffect } from 'react';
import ProductCard from './components/ProductCard';
import { supabase } from './utils/SupabaseClient';
import './App.css';

export default function App() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [products, setProducts] = useState([]);


  async function addProduct() {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert({
          name: name,
          description: description
        })
        .single();

      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  }

  async function getProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(10);
      if (error) throw error;
      if (data != null) {
        setProducts(data);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

 

  return (
    <>
      <header>
        <div className="header-container">
          <h3>Store Products</h3>
        </div>
      </header>
      <h3>Add products Data to the Supabase Database</h3>
      <div className="create-product-container">
        <div >
         
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="description">Product Description</label>
          <input
            type="text"
            id="description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <button onClick={() => addProduct()}>
            Add Product
          </button>
        </div>
      </div>
      <hr />
      <h3>Current Products in the Database</h3>
      <div className="product-list-container">
        {products.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </>
  );
}

 