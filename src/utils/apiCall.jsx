import axios from "axios";
import { SERVER_URL } from "../constant";

// apiCall function
export const apiCall = async (url, method = 'GET', data = {}, headers = {}) => {
  const user = localStorage.getItem('user');
  const token = user ? JSON.parse(user).token : null;
  console.log(token);
  const config = {
    headers: { Authorization: `Bearer ${token}`, ...headers },
  };

  try {
    const res = await axios({
      method,
      url,
      data,
      baseURL: SERVER_URL,
      ...config,
    });
    return res;
  } catch (error) {
    console.error('API Error:', error.response ? error.response.data : error.message);
    throw error;
  }
};
