import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ItemService from '../../services/itemService';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await ItemService.getAll();
        setItems(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Error loading items');
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await ItemService.remove(id);
        setItems(items.filter(item => item.id !== id));
      } catch (err) {
        setError(err.message || 'Error deleting item');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="item-list">
      <h2>Lista de items</h2>
      <Link to="/items/add" className="btn btn-success mb-3">
        Añadir nuevo item
      </Link>
      
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Cantidad</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              <td>
                <Link to={`/items/edit/${item.id}`} className="btn btn-primary btn-sm me-2">
                  Editar
                </Link>
                <button 
                  onClick={() => handleDelete(item.id)} 
                  className="btn btn-danger btn-sm"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemList;