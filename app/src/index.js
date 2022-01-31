import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { CookiesProvider } from "react-cookie";

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const httpLink = createHttpLink({
  uri: 'http://localhost:8080/v1/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  const newHeaders = { 
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
  return token ? newHeaders : headers;
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider >
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
