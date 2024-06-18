import MonitorExpense from "@/components/shared/MonitorExpense";
import { useGetCurrencyRate, useGetCurrentUser } from "@/query/queriesAndMutation";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function HomeScreen() {
  const [currentRate, setCurrentRate] = useState(0)
  const { data: currentUser, isLoading: currentUserLoading } = useGetCurrentUser()
  const { mutateAsync: getCurrencyRate, isPending: gettingCurrencyRate } = useGetCurrencyRate()
  useEffect(() => {
    async function setTheCurrentRate() {
      const rate = await getCurrencyRate({ homecurrency: currentUser?.HomeCurrency, usingcurrency: currentUser?.UsingCurrency })
      setCurrentRate(rate)
    }
    if (currentUser) {
      setTheCurrentRate()
    }
  }, [currentUser])
  return (
    <GestureHandlerRootView style={{ flex: 1, padding: 20 }}>
      <Text style={{ color: '#f2f2f2', fontWeight: 600, fontSize: 18, marginBottom: 10 }}>{currentUser?.Email}</Text>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
        <Text style={{ color: '#009973', fontWeight: 600, fontSize: 20 }}>[ {currentUser?.Balance} ] {currentUserLoading ? 'loading..' : currentUser?.UsingCurrency}</Text>
        <Text style={{ color: '#009973', fontWeight: 600, fontSize: 20 }}>[ {gettingCurrencyRate ? 'loading..' : currentRate * currentUser?.Balance} ] {currentUserLoading ? 'loading..' : currentUser?.HomeCurrency}</Text>
      </View>
      <MonitorExpense />
      <Pressable style={{ position: 'absolute', bottom: 15, right: 15 }} onPress={() => router.push('/addexpense')}>
        <MaterialIcons name="create-new-folder" size={45} color="#009973" />
      </Pressable>
    </GestureHandlerRootView>
  );
}

