import axios from 'axios';

const api = import.meta.env.VITE_API_URL;
const customApi = axios.create({
    baseURL: `${api}/api`,
});
export default customApi;