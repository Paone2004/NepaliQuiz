import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/home";
import Quiz from "../screens/quiz";
import Result from "../screens/result";
import Menu from "../screens/menu";
import Language from "../screens/language";

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator initialRouteName="Language">
            <Stack.Screen name='Language' component={Language} options={{ headerShown: false }} />
            <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
            <Stack.Screen name='Quiz' component={Quiz} options={{ headerShown: false }} />
            <Stack.Screen name='Result' component={Result} options={{ headerShown: false }} />
            <Stack.Screen name='Menu' component={Menu} options={{ headerShown: true }} />

        </Stack.Navigator>
    );
}

export default MyStack;