import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 

import apolloClient from './services/apollo';
import Routes from './routes/index';

const App: React.FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <ToastContainer />
      <Routes />
    </ApolloProvider>
  );
}

export default App;
