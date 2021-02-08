import http from '../http-common';

const remove = (id) => {
  return http.delete(`/${id}`);
};

const add = (data) => {
  return http.post('/', data);
};

const update = (data) => {
  return http.put('/', data);
};

export default { remove, add, update };
