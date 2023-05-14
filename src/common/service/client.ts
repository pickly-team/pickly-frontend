import axios from 'axios';

const client = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.VITE_SERVER_URI
      : 'http://localhost:8080/api',
});

export default client;
