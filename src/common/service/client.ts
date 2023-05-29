import axios from 'axios';

const client = axios.create({
  baseURL: process.env.VITE_SERVER_URI,
});

export default client;
