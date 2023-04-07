import AsyncStorage from "@react-native-async-storage/async-storage"
const _store_data = async (key, value) => {
    try {
        await AsyncStorage.setItem(
            key, JSON.stringify(value)
        )
    } catch (error) {
    }
}

const _retrieve_data = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key)
        if(value !== null){
            return JSON.parse(value)
        }else{
            return null
        }
    }catch(error) {
    }
} 

export {_store_data, _retrieve_data }