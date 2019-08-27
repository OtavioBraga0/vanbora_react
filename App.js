import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import CadastroScreen from './src/screens/CadastroScreen';
import HomeAlunoScreen from './src/screens/HomeAlunoScreen';
import HomeMotoristaScreen from './src/screens/HomeMotoristaScreen';
import CadastroGrupoScreen from './src/screens/CadastroGrupoScreen';

const navigator = createStackNavigator(
    {
      Home: {screen: HomeScreen},
      Cadastro: {screen: CadastroScreen},
      HomeAluno: {screen: HomeAlunoScreen},
      HomeMotorista: {screen: HomeMotoristaScreen},
      CadastroGrupo: {screen: CadastroGrupoScreen}
    },
    {
      initialRouteName: 'Home',
      defaultNavigationOptions: {
        title: 'VANBORA'
      }
    }
  );
  
  export default createAppContainer(navigator);