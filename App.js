import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ChatbotScreen from './pages/Chatbot';
import SplashScreen from './pages/Splash';
import ChatScreenNew from './pages/ChatExp';
import LoginScreen from './pages/LoginScreen';
import HomeScreen from './pages/Home';
import HomeScreen2 from './pages/Home copy';
import CadScreen from './pages/CadScreen';
import PhotoScreen from './pages/PhotoScreen';
import ForgotPass from './pages/ForgotPass';
import IntroScreen from './pages/IntroScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Splash" >
      <Stack.Screen options={{headerShown: false}}/* para tirar o header/titulo do topo */ name="Splash" component={SplashScreen}/>
      <Stack.Screen options={{headerShown: false}} name="intro" component={IntroScreen}/>
      <Stack.Screen options={{title: 'Login'}} name="Login" component={LoginScreen}/>
      <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
      <Stack.Screen options={{headerShown: false}} name="HomeCopy" component={HomeScreen2} />
      <Stack.Screen options={{title: 'Sala de Chat'}} name="ChatExp" component={ChatScreenNew}/>
      <Stack.Screen options={{title: 'Sala de Chat'}} name="ChatExpDois" component={ChatbotScreen}/>
      <Stack.Screen options={{headerShown: false}} name="Cadastrar" component={CadScreen}/>
      <Stack.Screen options={{headerShown: false}} name="Photo" component={PhotoScreen}/>
      <Stack.Screen options={{headerShown: false}} name="ForgotPass" component={ForgotPass}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
