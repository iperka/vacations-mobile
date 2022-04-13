import React from 'react';
import {Provider} from 'react-redux';
import AuthProvider from './src/auth/AuthProvider';
import {Root} from './src/components';
import {store} from './src/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Root />
      </AuthProvider>
    </Provider>
  );
};

export default App;
