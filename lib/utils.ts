import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setAsyncItem(key: string, item: any) {
    try {
        const value = JSON.stringify(item)
        await AsyncStorage.setItem(key, value);
        console.log(`${key} stored successfully`);
    } catch (error) {
        console.error(`Error storing ${key}:`, error);
    }
}

export async function getAsyncItem(key: string) {
    try {
        const item = await AsyncStorage.getItem(key);
        const value = JSON.parse(item!)
        if (value !== null) {
            console.log(`${key} retrieved successfully: ${value}`);
            return value;
        } else {
            console.log(`No data found for key: ${key}`);
        }
    } catch (error) {
        console.error(`Error retrieving ${key}:`, error);
    }
}

export async function removeAsyncItem(key: string) {
    try {
        await AsyncStorage.removeItem(key);
        console.log(`${key} removed successfully`);
    } catch (error) {
        console.error(`Error removing ${key}:`, error);
    }
}

export async function clearAllAsyncItems() {
    try {
        await AsyncStorage.clear();
        console.log('All data cleared successfully');
    } catch (error) {
        console.error('Error clearing data:', error);
    }
}

export function formatDate(dateTimeString: string) {
    if (!dateTimeString) return ""; // handle case where dateTimeString is undefined or null

    const date = new Date(dateTimeString);
    const options: any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', };
    return date.toLocaleDateString('en-US', options);
}