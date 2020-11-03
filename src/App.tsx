import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 

import apolloClient from './services/apollo';
import Routes from './routes/index';

const App: React.FC = () => {
  return (
    <div>
    <ApolloProvider client={apolloClient}>
      <Routes />
    </ApolloProvider>
    <ToastContainer autoClose={2000}/>
    </div>
  );
}

export default App;
