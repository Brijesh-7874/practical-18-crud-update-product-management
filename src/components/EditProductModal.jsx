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
