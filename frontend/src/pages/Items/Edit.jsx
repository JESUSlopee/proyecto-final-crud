import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ItemService from '../../services/itemService';

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState({
    name: '',
    description: '',
    quantity: 0
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await ItemService.get(id);
        setItem(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Error al cargar el ítem');
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

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
      await ItemService.update(id, item);
      navigate('/items');
    } catch (err) {
      setError(err.message || 'Error al actualizar el ítem');
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="item-form">
      <h2>Editar Ítem</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nombre</label>
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
          <label htmlFor="description" className="form-label">Descripción</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={item.description}
            onChange={handleChange}
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Cantidad</label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            name="quantity"
            value={item.quantity}
            onChange={handleChange}
          />
        </div>
        
        <button type="submit" className="btn btn-primary">Actualizar</button>
        <button 
          type="button" 
          className="btn btn-secondary ms-2"
          onClick={() => navigate('/items')}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default EditItem;
