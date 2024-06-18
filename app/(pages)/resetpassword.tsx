import { useResetPassword } from '@/query/queriesAndMutation';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';

const Resetpassword = () => {
    const { mutateAsync: resetPass, isPending: resettingPassword } = useResetPassword()
    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [cPass, setCPass] = useState('');

    const handleResetPassword = async () => {
        if(newPass !== cPass){
            return Alert.alert("Invalid confirmation of new password.")
        }
        const response = await resetPass({ oldpass: currentPass, newpass: newPass });
        if(response?.status === 'failed'){
            return Alert.alert("Failed!! There will be a mismatch in provided credentials, check again!")
        }
        Alert.alert("Password Reset Successfull.")
        return router.push('/')
    }
    return (
        <GestureHandlerRootView style={{ display: 'flex', flexDirection: 'column', gap: 15, paddingTop: 20, padding: 10 }}>
            <TextInput
                placeholder='enter your current password.'
                placeholderTextColor={'gray'}
                selectTextOnFocus
                value={currentPass}
                onChangeText={(text) => setCurrentPass(text)}
                style={{ borderWidth: 2, borderColor: 'gray', padding: 5, paddingLeft: 10, width: '100%', borderRadius: 10, color: 'white' }}
            />
            <TextInput
                placeholder='enter your new password.'
                placeholderTextColor={'gray'}
                selectTextOnFocus
                value={newPass}
                onChangeText={(text) => setNewPass(text)}
                style={{ borderWidth: 2, borderColor: 'gray', padding: 5, paddingLeft: 10, width: '100%', borderRadius: 10, color: 'white' }}
            />
            <TextInput
                placeholder='re enter your new password.'
                placeholderTextColor={'gray'}
                selectTextOnFocus
                value={cPass}
                onChangeText={(text) => setCPass(text)}
                style={{ borderWidth: 2, borderColor: 'gray', padding: 5, paddingLeft: 10, width: '100%', borderRadius: 10, color: 'white' }}
            />
            <Button
                title={resettingPassword ? 'Changing...' : 'Reset password'}
                onPress={handleResetPassword}
            />
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({})

export default Resetpassword;
