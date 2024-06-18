import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "./queryKeys"
import { editUser, getCurrentUser, loginUser, registerUser, resetPassword } from "./userFunctions"
import { createExpense, deleteExpense, getAllExpenses, getCurrencyRate, updateExpense } from "./expenseFunctions"

export const useGetCurrentUser = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
        queryFn: async () => getCurrentUser()
    })
}

export const useRegisterUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ email, password }: { email: string, password: string }) => registerUser(email, password)
    })
}

export const useLoginUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ email, password }: { email: string, password: string }) => loginUser(email, password)
    })
}

export const useGetAllExpense = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_ALL_EXPENSES],
        queryFn: async () => getAllExpenses()
    })
}

export const useCreateExpense = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ amount, title, description, transactionTime, transactionType }: { amount: number, title: string, description: string, transactionTime: string, transactionType: 'spend' | 'receive' }) => createExpense(amount, title, description, transactionTime, transactionType),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_ALL_EXPENSES]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER],
            })
        }
    })
}

export const useGetCurrencyRate = () => {
    return useMutation({
        mutationFn: ({ homecurrency, usingcurrency }:{ homecurrency: string, usingcurrency: string }) => getCurrencyRate(homecurrency, usingcurrency)
    })
}

export const useEditUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ toedit }:{ toedit: any }) => editUser(toedit),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_ALL_EXPENSES]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER],
            })
        }
    })
}

export const useResetPassword = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ oldpass, newpass }:{ oldpass: string, newpass: string }) => resetPassword(oldpass, newpass),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_ALL_EXPENSES]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER],
            })
        }
    })
}

export const useDeleteExpense = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id }:{ id: string }) => deleteExpense(id),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_ALL_EXPENSES]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER],
            })
        }
    }) 
}

export const useUpdateExpense = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, toedit }:{ id: string, toedit: any }) => updateExpense(id, toedit),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_ALL_EXPENSES]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER],
            })
        }
    })
}

