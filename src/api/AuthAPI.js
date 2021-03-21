import axios from "axios";

const instance = axios.create({
    withCredentials: true
})

export const AuthAPI = {

    login(email, password) {
        return instance.post(`/api/auth/login`, {
            email,
            password,
        }).then(res => {
            return res.data
        })
    },
    logout() {
        return instance.post(`/api/auth/logout`).then(res => {
            return res.data
        })
    },
}
