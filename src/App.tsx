import React from 'react';
import { ApolloProvider } from '@apollo/client';

import apolloClient from './services/apollo';

const App: React.FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
    <div>
      <h2>Login</h2>
      <input>digite seu nick</input>
    </div>
  </ApolloProvider>
  );
}

export default App;
