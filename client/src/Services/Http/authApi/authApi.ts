
import { IUser } from '@/Stores/Types/IUser'
import {$host} from '..'
import {jwtDecode}  from 'jwt-decode'

interface IResponeLogin {
    message: string,
    token: string
  }

export class AuthService {
    
    static async registration (email: string, password: string) {
        const {data} = await $host.post('register', {email, password})
        return data
    }
    
    static async login (email: string, password: string) {
        const {data} = await $host.post<IResponeLogin>('login', {email, password})
        localStorage.setItem('token', data.token)
        const user = jwtDecode<IUser>(data.token)
        return user
    }
    
    // export const auth = async (email: string, password: string) => {
    //     const {data} = await $host.post('api/user/login', {email, password})
    //     return jwtDecode(data.token)
    // }
} 