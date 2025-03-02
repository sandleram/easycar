import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./screens/home/home";
import Passenger from "./screens/passenger/passenger";
import Ride from "./screens/ride/ride";



const Stack = createNativeStackNavigator();
// const Stack = createNativeStackNavigator({
//     screens: {
//         Home: HomeScreen,
//         Profile: ProfileScreen,
//     },
// });

function Routes() {
    return <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
                name="home"
                component={Home}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="passenger"
                component={Passenger}

                options={{
                    headerShadowVisible: false,
                    headerTitle: "Passageiro",
                    headerTransparent: false
                }}
            />
            <Stack.Screen
                name="ride"
                component={Ride}

                options={{
                    headerShadowVisible: false,
                    headerTitle: "Ride",
                    headerTransparent: false
                }}
            />
        </Stack.Navigator>
    </NavigationContainer>
}

export default Routes;