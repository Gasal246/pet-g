import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.SERVER_URL || 'https://pet-g-node.vercel.app',
    timeout: 10000, // Timeout after 10 seconds
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

export default axiosInstance;