// src/store/auth.ts
import { defineStore } from 'pinia'

interface User {
    id: string
    name: string
    email: string
    role: string
    createdAt: string
    updatedAt: string
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null as string | null,
        user: null as User | null,
    }),
    actions: {
        setAuth(token: string, user: User) {
            this.token = token
            this.user = user
        },
        removeAuth() {
            this.token = null
            this.user = null
        },
    },
    persist: {
        key: 'auth',
        paths: ['token', 'user'],
    },
})
