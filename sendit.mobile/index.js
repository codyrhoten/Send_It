// Import polyfills
import "@thirdweb-dev/react-native-compat";

import { registerRootComponent } from 'expo';
import React from 'react';
import App from './App.tsx';

class Root extends React.Component {
  render() {
    return <App />;
  }
}

registerRootComponent(Root);
