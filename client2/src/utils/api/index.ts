import axios, { AxiosRequestHeaders } from 'axios';
import { userAPI } from './user';
import { itemsAPI } from './items';
import { ordersAPI } from './orders';

export type ApiReturnType = {
  user: ReturnType<typeof userAPI>;
  items: ReturnType<typeof itemsAPI>;
  orders: ReturnType<typeof ordersAPI>;

};

const Api = (): ApiReturnType => {
  let token = ""
  if (typeof window !== 'undefined') {
    token = localStorage.getItem("accessToken") ?? ""
  }
  const instance = axios.create({
    baseURL: 'http://localhost:3001',
    headers: getHeaders(token),
    withCredentials: true
  })


  const api = {
    user: userAPI,
    items: itemsAPI,
    orders: ordersAPI
  };

  return Object.entries(api).reduce((prev, [key, f]) => ({
    ...prev,
    [key]: f(instance),
  }), {} as ApiReturnType);
};

export default Api;

function getHeaders(token = "") {
  return {
    'Content-Type': 'application/json',
    'Authorization': token
  };
}
