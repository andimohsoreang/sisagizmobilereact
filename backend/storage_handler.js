import AsyncStorage from "@react-native-async-storage/async-storage"
const _store_data = async (key, value) => {
    try {
        await AsyncStorage.setItem(
            key, value
        )
    } catch (error) {
        alert(error)
    }
}

const _retrieve_data = async key => {
    try {
        const value = await AsyncStorage.getItem(key)
        return value
    }catch(error) {
        alert(error)
    }
} 

export {_store_data, _retrieve_data }