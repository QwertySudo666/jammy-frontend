import axios from 'axios';
import { User } from 'oidc-client-ts';

const getUser = (): User | null => {
    const key = `oidc.user:${import.meta.env.VITE_AUTH_URL}:${import.meta.env.VITE_AUTH_CLIENT_ID}`
    const raw = sessionStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
}

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use((config) => {
    const user = getUser()
    if (user?.access_token) {
        config.headers.Authorization = `Bearer ${user.access_token}`
    }
    return config
})