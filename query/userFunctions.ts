import { getAsyncItem } from "@/lib/utils";
import axiosInstance from "./axiosInstance";

export async function registerUser(email: string, password: string) {
    try {
        const res = await axiosInstance.post('/register', { email, password });
        return res.data;
    } catch (error) {
        console.log(error)
    }
}

export async function loginUser(email: string, password: string) {
    try {
        const res = await axiosInstance.post('/login', { email, password })
        return res.data;
    } catch (error) {
        console.log(error)
    }
}

export async function getCurrentUser() {
    try {
        const token = await getAsyncItem('petg-user')
        const res = await axiosInstance.get(`/user`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data;
    } catch (error) {
        console.log(error)
    }
}

export async function editUser(toedit: any) {
    try {
        const token = await getAsyncItem('petg-user');
        const res = await axiosInstance.post(`/edit-user`, toedit, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data;
    } catch (error) {
        console.log(error)
    }
}

export async function resetPassword(oldpass: string, newpass: string) {
    try {
        const token = await getAsyncItem('petg-user');
        const res = await axiosInstance.post('/reset-pass', { oldpass, newpass }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data;
    } catch (error) {
        console.log(error)
    }
}