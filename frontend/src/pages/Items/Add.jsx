import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemService from '../../services/itemService';

const AddItem = () => {
  const navigate = useNavigate();
  const [item, setItem] = useState({
    nombre: '',
    descripcion: '',
    cantidad: 0
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      await ItemService.create(item);
      navigate('/items');
    } catch (err) {
      setError(err.message || 'Error creating item');
    }
  };

  return (
    <div className="item-form">
      <h2>Añadir nuevo Item</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">nombre</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={item.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Descripcion</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={item.description}
            onChange={handleChange}
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">cantidad</label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            name="quantity"
            value={item.quantity}
            onChange={handleChange}
          />
        </div>
        
        <button type="submit" className="btn btn-primary">enviar</button>
        <button 
          type="button" 
          className="btn btn-secondary ms-2"
          onClick={() => navigate('/items')}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddItem;