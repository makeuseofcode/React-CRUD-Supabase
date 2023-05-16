import { useState } from 'react';
import { supabase } from '../utils/SupabaseClient';
import './productcard.styles.css';

export default function ProductCard(props) {
  const product = props.product;

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);

  async function updateProduct() {
    try {
      const { data, error } = await supabase
        .from('products')
        .update({
          name: name,
          description: description
        })
        .eq('id', product.id);

      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  }

  async function deleteProduct() {
    try {
      const { data, error } = await supabase
        .from('products')
        .delete()
        .eq('id', product.id);

      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="product-card">
      <div>
        {editing === false ? (
          <div>
            <h5>{product.name}</h5>
            <p>{product.description}</p>
            <button className="delete-button" onClick={() => deleteProduct()}>Delete Product</button>
            <button className="edit-button" onClick={() => setEditing(true)}>Edit Product</button>
          </div>
        ) : (
          <div>
            <h4>Editing Product</h4>
            <button className="go-back-button" onClick={() => setEditing(false)}>Go Back</button>
            <br />
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              id="name"
              defaultValue={product.name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="description">Product Description</label>
            <input
              type="text"
              id="description"
              defaultValue={product.description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <br />
            <button className="update-button" onClick={() => updateProduct()}>Update Product in Supabase DB</button>
          </div>
        )}
      </div>
    </div>
  );
}


