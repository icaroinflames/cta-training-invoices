import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { useGetConfig } from '@forrestjs/react-root';
import { setContext } from '@apollo/client/link/context';



const ApolloWrapper = ({ children }) => {

    const hasuraUri = useGetConfig('auth.hasura_uri', "");
    console.log(`->> ${hasuraUri}`);
    const httpLink = createHttpLink({
        uri: hasuraUri,
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

    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
};

export default {
    hook: "$REACT_ROOT_WRAPPER",
    handler: { component: ApolloWrapper }
}