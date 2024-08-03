import axios from "axios";

axios.defaults.withCredentials = true;
const axiosInstance = axios.create({
    baseURL: "https://dancedashboard-api.onrender.com",
})

export default axiosInstance;