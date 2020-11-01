import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import apolloClient from './services/apollo';
import NewMessageNotification from './components/NewMessageNotification';

const App: React.FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <NewMessageNotification/>
    </ApolloProvider>
  );
}

export default App;
