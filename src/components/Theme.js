import {
  DarkTheme as PaperDarkTheme,
  configureFonts,
  overlay,
} from 'react-native-paper';
import {
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';


// const fontConfig = {
//   android: {
//     regular: {
//       fontFamily: 'RobotoFlex',
//       fontWeight: '400',
//     },
//     medium: {
//       fontFamily: 'RobotoFlex',
//       fontWeight: '500',
//     },
//     light: {
//       fontFamily: 'RobotoFlex',
//       fontWeight: '300',
//     },
//     thin: {
//       fontFamily: 'RobotoFlex',
//       fontWeight: '100'
//     },
//   },
// };

const DarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  // fonts: configureFonts(fontConfig),
  roundness: 4,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    primary: '#1DB954',
    accent: '#1DB954',
    surface: overlay(4, PaperDarkTheme.colors.surface),
  },
};

export default DarkTheme
