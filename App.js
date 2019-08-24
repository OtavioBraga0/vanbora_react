import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import AddScreen from './src/screens/AddScreen';
import LoginScreen from './src/screens/LoginScreen';
import CadastroScreen from './src/screens/CadastroScreen';
import HomeAlunoScreen from './src/screens/HomeAlunoScreen';
import HomeMotoristaScreen from './src/screens/HomeMotoristaScreen';

const navigator = createStackNavigator(
    {
      Home: {screen: HomeScreen},
      Add: {screen: AddScreen},
      Login: {screen: LoginScreen},
      Cadastro: {screen: CadastroScreen},
      HomeAluno: {screen: HomeAlunoScreen},
      HomeMotorista: {screen: HomeMotoristaScreen}
    },
    {
      initialRouteName: 'Home',
      defaultNavigationOptions: {
        title: 'App'
      }
    }
  );
  
  export default createAppContainer(navigator);