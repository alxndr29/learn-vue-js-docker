import {defineStore} from "pinia";

interface User {
    id: string,
    name: string,
    email: string,
    password: string,
    role: string,
    createdAt: Date,
    updatedAt: Date,
}

export const useAuthStore = defineStore("auth", {
    state: () => ({
        token: null as string | null,
        user: null as User | null
    }),
    actions: {
        setAuth(token: string, user: User) {
            this.token = token;
            this.user = user;
        }
    }
});
