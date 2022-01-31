import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

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

const ApolloWrapper = ({ children }) => {
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
};

export const AuthProvider = ( {registerAction} ) => {
    registerAction({
        hook: "$REACT_ROOT_WRAPPER",
        handler: { component: ApolloWrapper }
      });
}