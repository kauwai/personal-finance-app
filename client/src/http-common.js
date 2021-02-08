import axios from 'axios';

export default axios.create({
  baseURL: 'https://kauwai-igti-desafio-final.herokuapp.com/api/transaction',
  headers: {
    'Content-type': 'application/json',
  },
});
