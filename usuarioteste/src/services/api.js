import axios from 'axios';

const api = axios.create({
    baseURL: 'https://visiongoapi-production.up.railway.app/api',
});

export { api }