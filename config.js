const API_BASE_URL =
    process.env.NODE_ENV === 'production'
        ? 'https://projectapi-qow8.onrender.com' // Live API URL
        : 'http://localhost:3001'; // Local development API URL

export default API_BASE_URL;
