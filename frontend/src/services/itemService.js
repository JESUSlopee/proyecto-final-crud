import api from './api';

const getAll = () => {
  return api.get('/items');
};

const get = (id) => {
  return api.get(`/items/${id}`);
};

const create = (data) => {
  return api.post('/items', data);
};

const update = (id, data) => {
  return api.put(`/items/${id}`, data);
};

const remove = (id) => {
  return api.delete(`/items/${id}`);
};

const ItemService = {
  getAll,
  get,
  create,
  update,
  remove
};

export default ItemService;