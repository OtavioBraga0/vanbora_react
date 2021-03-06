import { createStackNavigator, createAppContainer } from 'react-navigation';

// NAVEGAÇÃO
import HomeScreen from './src/screens/HomeScreen';
import CadastroScreen from './src/screens/CadastroScreen';
import HomeAlunoScreen from './src/screens/HomeAlunoScreen';
import HomeMotoristaScreen from './src/screens/HomeMotoristaScreen';
import CadastroGrupoScreen from './src/screens/CadastroGrupoScreen';
import GrupoScreen from './src/screens/GrupoScreen';
import CadastroAlunoScreen from './src/screens/CadastroAlunoScreen';
import PerfilScreen from './src/screens/PerfilScreen';


const navigator = createStackNavigator(
    {
      Home: {screen: HomeScreen},
      Cadastro: {screen: CadastroScreen},
      HomeAluno: {screen: HomeAlunoScreen},
      HomeMotorista: {screen: HomeMotoristaScreen},
      CadastroGrupo: {screen: CadastroGrupoScreen},
      Grupo: {screen: GrupoScreen},
      CadastroAluno: {screen: CadastroAlunoScreen},
      Perfil: {screen: PerfilScreen}
    },
    {
      initialRouteName: 'Home',
      defaultNavigationOptions: {
        title: 'VANBORA',
        headerRight: '',
      }
    }
  );
  
  export default createAppContainer(navigator);