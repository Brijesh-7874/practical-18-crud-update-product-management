# Practical 18: Update Operation (Product Management)

## 🎯 Aim / Objective
Develop a Product Management application where the user can select an existing product, edit its details, and update the product information.

---

## 💻 Source Code

### `src/components/EditProductModal.jsx`
```jsx
import React, { useState, useEffect } from 'react';

function EditProductModal({ product, onSave, onCancel }) {
  const [formData, setFormData] = useState({ ...product });

  useEffect(() => {
    setFormData({ ...product });
  }, [product]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(formData);
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <div className="modal-header">
          <h3>✏️ Edit Product Details</h3>
          <button onClick={onCancel} className="close-btn">×</button>
        </div>

        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-group">
            <label>Product Title</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select name="category" value={formData.category} onChange={handleChange}>
                <option value="Smartphones">Smartphones</option>
                <option value="Laptops">Laptops</option>
                <option value="Accessories">Accessories</option>
                <option value="Audio">Audio</option>
              </select>
            </div>
            <div className="form-group">
              <label>Price (₹)</label>
              <input
                type="number"
                name="price"
                min="1"
                required
                value={formData.price}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Stock</label>
              <input
                type="number"
                name="stock"
                min="0"
                required
                value={formData.stock}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Warranty / Notes</label>
            <input
              type="text"
              name="warranty"
              value={formData.warranty || ''}
              onChange={handleChange}
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onCancel} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes (Update)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProductModal;

```

### `src/App.jsx`
```jsx
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

```

### `src/App.css`
```jsx
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8fafc; color: #1e293b; }
.page-shell { min-height: 100vh; padding: 40px 20px; display: flex; justify-content: center; }
.container { max-width: 960px; width: 100%; }
.page-header { text-align: center; margin-bottom: 30px; }
.badge { display: inline-block; background: #e0f2fe; color: #0284c7; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 12px; text-transform: uppercase; margin-bottom: 10px; }
h1 { font-size: 28px; color: #0f172a; margin-bottom: 6px; }
.subtitle { color: #64748b; font-size: 14px; }
.table-card { background: white; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 20px rgba(0,0,0,0.06); overflow-x: auto; }
.products-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 14px; }
.products-table th { background: #f1f5f9; padding: 14px 18px; font-weight: 700; color: #475569; font-size: 12px; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; }
.products-table td { padding: 16px 18px; border-bottom: 1px solid #f1f5f9; }
.row-updated { background: #f0fdf4; transition: background 0.3s; }
.id-col { font-family: monospace; font-weight: 700; color: #64748b; }
.title-col { display: flex; align-items: center; gap: 8px; }
.updated-tag { background: #16a34a; color: white; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 4px; }
.cat-pill { background: #f1f5f9; color: #475569; padding: 3px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; }
.price-col { font-weight: 700; color: #0284c7; }
.stock-pill { background: #dcfce7; color: #166534; padding: 2px 8px; border-radius: 12px; font-size: 12px; font-weight: 700; }
.stock-pill.low { background: #fee2e2; color: #b91c1c; }
.warranty-col { font-size: 12px; color: #64748b; }
.btn-edit { background: #0284c7; color: white; border: none; padding: 6px 14px; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 12px; transition: background 0.2s; }
.btn-edit:hover { background: #0369a1; }
.modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(2px); display: flex; align-items: center; justify-content: center; padding: 20px; z-index: 50; }
.modal-card { background: white; border-radius: 16px; padding: 28px; max-width: 520px; width: 100%; box-shadow: 0 20px 40px rgba(0,0,0,0.2); }
.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid #e2e8f0; }
.modal-header h3 { font-size: 18px; color: #0f172a; }
.close-btn { background: none; border: none; font-size: 24px; cursor: pointer; color: #94a3b8; }
.edit-form { display: flex; flex-direction: column; gap: 14px; }
.form-row { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 10px; }
@media (max-width: 500px) { .form-row { grid-template-columns: 1fr; } }
.form-group { display: flex; flex-direction: column; gap: 4px; }
.form-group label { font-size: 12px; font-weight: 600; color: #475569; }
.form-group input, .form-group select { padding: 9px 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 14px; outline: none; }
.modal-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 14px; }
.btn { padding: 9px 18px; border-radius: 8px; font-weight: 600; font-size: 13px; border: none; cursor: pointer; }
.btn-primary { background: #0284c7; color: white; }
.btn-secondary { background: #e2e8f0; color: #334155; }

```

---

## 🚀 How to Run

1. Open terminal in this directory:
   ```bash
   cd "D:\React-practicals\Reacts\Practical-18-CRUD-Update-Product-Management"
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run Vite dev server:
   ```bash
   npm run dev
   ```
