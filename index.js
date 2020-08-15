import { registerRootComponent } from 'expo';
import Fire from './app/config/Fire';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Setting a timer']);

import App from './App';


// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
