/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import 'react-native-gesture-handler'
import { name as appName } from './app.json';
// import TrackPlayer from 'react-native-track-player';

AppRegistry.registerComponent(appName, () => App);

// TrackPlayer.registerPlaybackService(() => require('./src/utils/trackPlayerSerivce'));
