import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <h1>Bienvenido a la Aplicación CRUD</h1>
      <p>Esta es una aplicación full-stack con React y Node.js para gestión de elementos</p>
      
      <div className="actions">
        <Link to="/items" className="btn btn-primary">
          Ver Elementos
        </Link>
        <Link to="/items/add" className="btn btn-success">
          Agregar Nuevo Elemento
        </Link>
      </div>
    </div>
  );
};

export default Home;