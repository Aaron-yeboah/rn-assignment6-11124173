
import { createStackNavigator } from '@react-navigation/stack';
import CartScreen from './screens/CartScreen';
import Home from './screens/Home';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="CartScreen" component={CartScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;