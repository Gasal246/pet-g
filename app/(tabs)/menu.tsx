import React, { useState } from 'react';
import { Alert, Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Available_Currencies } from '@/constants/Currencies';
import { useEditUser, useGetCurrentUser } from '@/query/queriesAndMutation';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { clearAllAsyncItems } from '@/lib/utils';

const Menu = () => {
    const { data: currentUser, isLoading: gettingUserinfo } = useGetCurrentUser()
    const { mutateAsync: editUser, isPending: editingUser } = useEditUser()
    const [balance, setBalance] = useState('' + currentUser?.Balance)
    const [balanceEdit, setBalanceEdit] = useState(false);
    const [email, setEmail] = useState(currentUser?.Email)
    const [emailEdit, setEmailEdit] = useState(false);

    const [homeCurrency, setHomeCurrency] = useState(currentUser?.HomeCurrency)
    const [usingCurrency, setUsingCurrency] = useState(currentUser?.UsingCurrency)

    const handleEditBalance = async () => {
        if (balanceEdit) {
            const res = await editUser({ toedit: { Balance: balance } })
            setBalanceEdit(false)
        } else {
            setBalanceEdit(true)
        }
    }

    const handleHomeCurrencyChange = async (currency: string, index: number) => {
        setHomeCurrency(currency)
        const res = await editUser({ toedit: { HomeCurrency: currency } })
    }

    const handleUsingCurrencyChange = async (currency: string, index: number) => {
        setUsingCurrency(currency)
        const res = await editUser({ toedit: { UsingCurrency: currency } })
    }

    const handleEditEmail = async () => {
        if (emailEdit) {
            const res = await editUser({ toedit: { Email: email } });
            setEmailEdit(false)
        } else {
            setEmail(true)
        }
    }

    const handleSignOut = async () => {
        Alert.alert(
            "Confirmation",
            "Are you trying to sign out of application ?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("sign out canceled"),
                    style: "cancel"
                },
                {
                    text: "Yes",
                    onPress: async () => {
                        await clearAllAsyncItems();
                        return router.replace('/login')
                    }
                }
            ],
            { cancelable: false }
        );
    }

    return (
        <View style={{ padding: 10}}>
            <Text style={{ color: 'white', padding: 5, marginTop: 10 }} >Balance {currentUser?.UsingCurrency}</Text>
            <View style={{ display: 'flex', gap: 5, flexDirection: 'row', marginBottom: 10 }}>
                <TextInput
                    placeholder='balance Amount.'
                    placeholderTextColor={'gray'}
                    selectTextOnFocus
                    editable={balanceEdit}
                    value={balance}
                    onChangeText={(text) => setBalance(text)}
                    style={{ borderWidth: 2, borderColor: 'gray', padding: 5, paddingLeft: 10, width: '85%', borderRadius: 10, color: 'white' }}
                />
                <Button
                    title={balanceEdit ? 'edit' : 'click'}
                    color={balanceEdit ? '#cc0066' : '#ff5050'}
                    onPress={handleEditBalance}
                />
            </View>

            <Text style={{ color: 'white', padding: 5 }} >Current Email</Text>
            <View style={{ display: 'flex', gap: 5, flexDirection: 'row', marginBottom: 15 }}>
                <TextInput
                    placeholder='current Email.'
                    placeholderTextColor={'gray'}
                    selectTextOnFocus
                    editable={emailEdit}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={{ borderWidth: 2, borderColor: 'gray', padding: 5, paddingLeft: 10, width: '85%', borderRadius: 10, color: 'white' }}
                />
                <Button
                    title={balanceEdit ? 'edit' : 'click'}
                    color={balanceEdit ? '#cc0066' : '#ff5050'}
                    onPress={handleEditEmail}
                />
            </View>


            <Text style={{ color: 'white', padding: 5 }} >Using Currency</Text>
            <View style={{ display: 'flex', gap: 5, flexDirection: 'row', marginBottom: 10 }}>
                <Picker
                    style={{ color: 'white', width: '98%', height: 20, backgroundColor: '#4d4d33', padding: 5 }}
                    selectedValue={usingCurrency}
                    onValueChange={(itemValue, itemIndex) => handleUsingCurrencyChange(itemValue, itemIndex)}
                >
                    {
                        Available_Currencies?.map((curr, index) => (
                            <Picker.Item key={index} label={curr} value={curr} />
                        ))
                    }
                </Picker>
            </View>

            <Text style={{ color: 'white', padding: 5 }} >Home Currency</Text>
            <View style={{ display: 'flex', gap: 5, flexDirection: 'row', marginBottom: 10 }}>
                <Picker
                    style={{ color: 'white', width: '98%', height: 20, backgroundColor: '#4d4d33', padding: 5 }}
                    selectedValue={homeCurrency}
                    onValueChange={(itemValue, itemIndex) => handleHomeCurrencyChange(itemValue, itemIndex)}
                >
                    {
                        Available_Currencies?.map((curr, index) => (
                            <Picker.Item key={index} label={curr} value={curr} />
                        ))
                    }
                </Picker>
            </View>

            <Pressable
                style={{ padding: 10, backgroundColor: 'purple', marginTop: 40, borderRadius: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                onPress={() => router.push('/resetpassword')}
            >
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 500 }}>Reset Password</Text>
                <MaterialIcons name="published-with-changes" size={26} color="white" />
            </Pressable>
            <Pressable
                style={{ padding: 10, backgroundColor: 'red', marginTop: 10, borderRadius: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                onPress={handleSignOut}
            >
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 500 }}>Sign Out</Text>
                <MaterialIcons name="published-with-changes" size={26} color="white" />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({})

export default Menu;
