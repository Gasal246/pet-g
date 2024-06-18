import { formatDate } from '@/lib/utils';
import { useDeleteExpense, useGetAllExpense, useUpdateExpense } from '@/query/queriesAndMutation';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ExpenseItem = ({ expense }: { expense: any }) => {
    const { mutateAsync: deleteExpense, isPending: deletingExpense } = useDeleteExpense()

    const [showOptions, setShowOptions] = useState(false)

    const handleDeleteExpense = async () => {
        Alert.alert(
            "Confirmation",
            "You sure wanna delete this expense ?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Delete canceled"),
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: async () => {
                        const response = await deleteExpense({ id: expense?._id });
                    }
                }
            ],
            { cancelable: false }
        );
    }

    return (
        <TouchableOpacity
            style={{ backgroundColor: expense?.TransactionType === 'spend' ? '#4d0000' : '#003311', borderRadius: 10, padding: 10, width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
            onLongPress={() => setShowOptions(!showOptions)}
        >
            {showOptions ?
                <View style={{ padding: 10 }}>
                    <Button title='Delete' color='red' onPress={handleDeleteExpense} />
                </View>
                :
                (
                    <>
                        <View style={{ width: '70%' }}>
                            <Text style={{ color: '#e6e6e6', fontSize: 16, fontWeight: 500 }}>{expense?.Title}</Text>
                            <Text style={{ color: '#a6a6a6' }}>{expense?.Description}</Text>
                            <Text style={{ color: '#a6a6a6', }}><Ionicons name="timer-outline" size={13} color="#bfbfbf" /> {formatDate(expense?.TransactionTime)}</Text>
                        </View>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 600 }}>{expense?.TransactionType === 'spend' ? '-' : '+'} {expense?.Amount}</Text>
                    </>
                )
            }
        </TouchableOpacity>
    )
}

const MonitorExpense = () => {
    const { data: expenses, isLoading: expensesLoading } = useGetAllExpense();

    return (
        <ScrollView>
            <Text style={{ color: '#ffcc00', marginBottom: 5, fontWeight: 600 }}>{expensesLoading ? 'Loading...' : (expenses?.length > 0 ? 'Recent Transactions' : 'No Transactions Yet!')}</Text>
            <View style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {
                    expenses?.map((expense: any) => (
                        <ExpenseItem key={expense?._id} expense={expense} />
                    ))
                }
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({})

export default MonitorExpense;
