import axios from "axios";

axios.defaults.withCredentials = true;
const axiosInstance = axios.create({
    baseURL: "https://danceclassdashboard-api.onrender.com",
})

export default axiosInstance;