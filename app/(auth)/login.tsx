import { setAsyncItem } from '@/lib/utils';
import { useLoginUser } from '@/query/queriesAndMutation';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Login = () => {
    const { mutateAsync: loginUser, isPending: loginginUser } = useLoginUser()

    const [formdata, setFormdata] = useState({
        email: '',
        password: ''
    })

    const handleLogin = async () => {
        try {
            const response = await loginUser({ email: formdata.email, password: formdata.password })
            if(response?.status === 'failed'){
                return Alert.alert(response?.error)
            }
            await setAsyncItem('petg-user', response.token)
            router.replace('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <GestureHandlerRootView style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 15, paddingRight: 15 }}>
            <Text style={{ color: 'white', fontSize: 45, fontWeight: 700, marginBottom: 5 }}>Login.</Text>
            <View style={{ marginBottom: 5, width: '100%', padding: 20, display: 'flex', flexDirection: 'column', gap: 15 }}>
                <TextInput
                    placeholder='enter your Email.'
                    placeholderTextColor={'gray'}
                    textContentType='emailAddress'
                    selectTextOnFocus
                    value={formdata.email}
                    onChangeText={(text) => setFormdata({ ...formdata, email: text })}
                    style={{ borderWidth: 2, borderColor: 'gray', padding: 5, paddingLeft: 10, width: '100%', borderRadius: 10, color: 'white' }}
                />
                <TextInput
                    placeholder='enter your Password.'
                    placeholderTextColor={'gray'}
                    secureTextEntry
                    selectTextOnFocus
                    textContentType='password'
                    value={formdata.password}
                    onChangeText={(text) => setFormdata({ ...formdata, password: text })}
                    style={{ borderWidth: 2, borderColor: 'gray', padding: 5, paddingLeft: 10, width: '100%', borderRadius: 10, color: 'white' }}
                />
                <Button
                    title='Login'
                    color={`#10656B`}
                    onPress={handleLogin}
                />
            </View>
            <Link href={`/register`}>
                <Text style={{ color: '#4D98B9', fontWeight: 500, fontSize: 16 }}>sign up for new account !</Text>
            </Link>
            <Text style={{ color: 'gray', textAlign: 'center', marginTop: 30 }}>This application is for manual recording and tracking all of your expenses in a roaming and home stage.</Text>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({})

export default Login;
