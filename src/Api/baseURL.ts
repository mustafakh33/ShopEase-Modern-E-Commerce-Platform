import axios from "axios";

const baseUrl = axios.create({ baseURL: "https://ecommerce.routemisr.com" });
export default baseUrl;
