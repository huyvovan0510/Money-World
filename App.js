import React from 'react';

import RootNavigation from './src/navigation/Index';
import {enableScreens} from 'react-native-screens';

enableScreens(false);

const App = () => {
  return <RootNavigation />;
};

export default App;
