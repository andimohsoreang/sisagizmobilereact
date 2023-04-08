
import { View, Text } from 'react-native'
export default function FontsLoaded() {
  
    const [fontsLoaded] = useFonts({
      PopBold: require("../assets/fonts/Poppins-Bold.ttf"),
      PopLug: require("../assets/fonts/Poppins-Light.ttf"),
    });
    
    
     if (!fontsLoaded) return null;   
}
