import axios, { InternalAxiosRequestConfig } from "axios";
// import Cookies from 'universal-cookie';

const $host = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_APP_API_URL
}) 

const $authHost = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
})

const authInterceptor = (config: InternalAxiosRequestConfig) => {
    // const cookies = new Cookies();

    // const token = cookies.get('token')
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    // config.headers.Authorization = `Bearer ${token}`
    // console.log(token);
    return config   
}

$authHost.interceptors.request.use(authInterceptor)


export {
    $host,
    $authHost
}