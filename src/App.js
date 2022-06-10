import React, { useEffect, Suspense } from 'react';
import { ActivityIndicator } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import TrackPlayer, { Capability } from 'react-native-track-player';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator';
import { AuthProvider } from './utils/auth';


import { Provider as PaperProvider } from 'react-native-paper';
import DarkTheme from './components/Theme'


import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from './store/index';
import { persistStore } from 'redux-persist';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const persistor = persistStore(store);

const App = () => {
  // async function setupMusicPlayer() {
  //   try {
  //     await TrackPlayer.setupPlayer();
  //     TrackPlayer.updateOptions({
  //       stopWithApp: false,
  //       // Media controls capabilities
  //       capabilities: [
  //         Capability.Play,
  //         Capability.Pause,
  //         Capability.Stop,
  //         Capability.SeekTo,
  //         Capability.SkipToNext,
  //         Capability.SkipToPrevious,
  //       ],
  //       notificationCapabilities: [
  //         Capability.Play,
  //         Capability.Pause,
  //         Capability.SeekTo,
  //         Capability.SkipToNext,
  //         Capability.SkipToPrevious,
  //       ],
  //       compactCapabilities: [
  //         Capability.Play,
  //         Capability.Pause,
  //         Capability.SeekTo,
  //         Capability.SkipToNext,
  //         Capability.SkipToPrevious,
  //       ],
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  // useEffect(() => {
  //   setupMusicPlayer();
  //   return () => {
  //     TrackPlayer.destroy();
  //   };
  // }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        {/* <Provider> */}
        <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
          <AuthProvider>
            <NavigationContainer>
              <PaperProvider theme={DarkTheme}>
                <BottomSheetModalProvider>
                  <RootNavigator />
                </BottomSheetModalProvider>
              </PaperProvider>
            </NavigationContainer>
          </AuthProvider>
        </PersistGate>
        {/* </Provider> */}
      </SafeAreaProvider>
    </Provider >
  );
};

export default App;
