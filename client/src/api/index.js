import axios from 'axios'

const API = axios.create({baseURL : 'http://localhost:5000/user'})
API.interceptors.request.use((req)=>{
    const token = localStorage.getItem('token')
    if(token){
        req.headers.Authorization = `Bearer ${token}`
    }
    return req
})

export const signIn = (FormData) => API.post('/auth/login',FormData)
export const signUp = (FormData) => API.post('/auth/register',FormData)

export const dashboard = (page) => API.get(`/posts?page=${page}`)

