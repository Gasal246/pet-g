import DateTimePickerComponent from '@/components/shared/DateTimePicker';
import { formatDate } from '@/lib/utils';
import { useCreateExpense } from '@/query/queriesAndMutation';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';

const AddExpense = () => {
    const { mutateAsync: createExpense, isPending: creatingExpense } = useCreateExpense()
    const [dateTime, setDateTime] = useState('');
    const [amount, setAmount] = useState(0);
    const [title, setTitle] = useState('');
    const [type, setType] = useState<'spend' | 'receive'>('spend')
    const [description, setDescription] = useState('');

    const handleDateTimeSelected = (dateTimeString: string) => {
        setDateTime(dateTimeString);
    };

    const handleCreateExpense = async () => {
        if(amount <= 0 || !title || !type || !description || !dateTime ){
            return Alert.alert("Invalid Expense.")
        }
        const res = await createExpense({ amount, title, description, transactionTime: dateTime, transactionType: type })
        return router.push('/')
    }

    return (
        <View style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 20 }}>
            <TextInput
                placeholder='expense Amount.'
                placeholderTextColor={'gray'}
                selectTextOnFocus
                keyboardType="numeric"
                value={amount+''}
                onChangeText={(text) => setAmount(Number(text) || 0)}
                style={{ borderWidth: 2, borderColor: 'gray', padding: 5, paddingLeft: 10, width: '100%', borderRadius: 10, color: 'white' }}
            />
            <TextInput
                placeholder='expense Title.'
                placeholderTextColor={'gray'}
                selectTextOnFocus
                value={title}
                onChangeText={(text) => setTitle(text)}
                style={{ borderWidth: 2, borderColor: 'gray', padding: 5, paddingLeft: 10, width: '100%', borderRadius: 10, color: 'white' }}
            />
            <TextInput
                placeholder='expense Desctiption.'
                placeholderTextColor={'gray'}
                selectTextOnFocus
                value={description}
                onChangeText={(text) => setDescription(text)}
                style={{ borderWidth: 2, borderColor: 'gray', padding: 5, paddingLeft: 10, width: '100%', borderRadius: 10, color: 'white' }}
            />
            <Picker
                style={{ color: 'white', width: '98%', height: 20, backgroundColor: type === 'spend' ? '#4d0000' : '#003311', padding: 5 }}
                selectedValue={type}
                onValueChange={(itemValue, itemIndex) => setType(itemValue)}
            >
                 <Picker.Item label='spend' value='spend' />
                 <Picker.Item label='receive' value='receive' />
            </Picker>
            <DateTimePickerComponent onDateTimeSelected={handleDateTimeSelected} />
            <Text style={{ color: '#0099e6', fontWeight: 600 }}>{formatDate(dateTime)}</Text>
            <Button
                title={creatingExpense ? 'creating..' : 'Add Expense'}
                color='#008080'
                onPress={handleCreateExpense}
            />
        </View>
    );
}

const styles = StyleSheet.create({})

export default AddExpense;
