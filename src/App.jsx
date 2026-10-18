import React, { useState } from 'react';
import EditProductModal from './components/EditProductModal';
import './App.css';

function App() {
  const [products, setProducts] = useState([
    { id: 1, title: 'Apple iPhone 15', category: 'Smartphones', price: 69900, stock: 15, warranty: '1 Year Apple Care' },
    { id: 2, title: 'Dell XPS 13 Laptop', category: 'Laptops', price: 114900, stock: 8, warranty: '2 Years Onsite Warranty' },
    { id: 3, title: 'Bose QuietComfort 45', category: 'Audio', price: 29900, stock: 20, warranty: '1 Year Manufacturer' },
    { id: 4, title: 'Samsung Galaxy Watch 6', category: 'Accessories', price: 24999, stock: 12, warranty: '1 Year Brand Warranty' }
  ]);

  const [editingProduct, setEditingProduct] = useState(null);
  const [lastUpdatedId, setLastUpdatedId] = useState(null);

  function handleSaveUpdate(updatedItem) {
    setProducts(prev =>
      prev.map(item => item.id === updatedItem.id ? updatedItem : item)
    );
    setLastUpdatedId(updatedItem.id);
    setEditingProduct(null);
  }

  return (
    <div className="page-shell">
      <div className="container">
        <header className="page-header">
          <span className="badge">Unit 5: Practical 18</span>
          <h1>Product Management (Update Operation)</h1>
          <p className="subtitle">
            Select any existing product below, open the edit dialog to modify values, and update state in real-time.
          </p>
        </header>

        <div className="table-card">
          <table className="products-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Warranty</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} className={lastUpdatedId === p.id ? 'row-updated' : ''}>
                  <td className="id-col">#{p.id}</td>
                  <td className="title-col">
                    <strong>{p.title}</strong>
                    {lastUpdatedId === p.id && <span className="updated-tag">Just Updated!</span>}
                  </td>
                  <td><span className="cat-pill">{p.category}</span></td>
                  <td className="price-col">₹{p.price.toLocaleString('en-IN')}</td>
                  <td>
                    <span className={`stock-pill ${p.stock < 10 ? 'low' : ''}`}>
                      {p.stock} pcs
                    </span>
                  </td>
                  <td className="warranty-col">{p.warranty}</td>
                  <td>
                    <button
                      onClick={() => setEditingProduct(p)}
                      className="btn-edit"
                    >
                      ✏️ Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {editingProduct && (
          <EditProductModal
            product={editingProduct}
            onSave={handleSaveUpdate}
            onCancel={() => setEditingProduct(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
