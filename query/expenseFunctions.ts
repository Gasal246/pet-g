import { getAsyncItem } from "@/lib/utils"
import axiosInstance from "./axiosInstance"
import axios from "axios";

export async function getAllExpenses() {
    try {
        const token = await getAsyncItem('petg-user')
        const res = await axiosInstance.get('/expenses', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data;
    } catch (error) {
        console.log(error)
    }
}

export async function createExpense(amount: number, title: string, description: string, transactionTime: string, transactionType: 'spend' | 'receive') {
    try {
        const token = await getAsyncItem('petg-user')
        const res = await axiosInstance.post('/expense', { amount, title, description, time: transactionTime, type: transactionType }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data;
    } catch (error) {
        console.log(error)
    }
}

export async function getCurrencyRate(homecurrency: string, usingcurrency: string) {
    try {
        const res = await axios.get(`https://v6.exchangerate-api.com/v6/80c8b79a2ac554fe12474c64/latest/${usingcurrency}`);
        return res.data?.conversion_rates[homecurrency]
    } catch (error) {
        console.log(error)
    }
}

export async function deleteExpense(id: string) {
    try {
        const token = await getAsyncItem('petg-user')
        const res = await axiosInstance.delete(`/expense/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        console.log(error)
    }
}

export async function updateExpense(id: string, toedit: any) {
    try {
        const res = await axiosInstance.post(`/edit-expense:${id}`, toedit);
        return res.data;
    } catch (error) {
        console.log(error)
    }
}