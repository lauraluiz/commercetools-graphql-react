import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import Products from './Products';
import Cart from './Cart';
import apolloClient from './apollo';
import './App.css';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <div className="App">
        <div className="Products"><Products/></div>
        <div className="Cart"><Cart/></div>
      </div>
    </ApolloProvider>
  );
}

export default App;
