import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import AddScreen from './src/screens/AddScreen';

const navigator = createStackNavigator(
    {
      Home: {screen: HomeScreen},
      Add: {screen: AddScreen}
    },
    {
      initialRouteName: 'Home',
      defaultNavigationOptions: {
        title: 'App'
      }
    }
  );
  
  export default createAppContainer(navigator);