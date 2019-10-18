import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import SdkAuth, { TokenProvider } from '@commercetools/sdk-auth';

// Create token provider for the commercetools project
const tokenProvider = new TokenProvider({
  sdkAuth: new SdkAuth({
    host: 'https://auth.sphere.io',
    projectKey: 'graphql-webinar',
    credentials: {
      clientId: 'EepIOtr0P2evGfeWCAh48qIs',
      clientSecret: 'nCmLN6J5bCSx0ZoicI5GpoyibjnUDnHk',
    },
    scopes: ['manage_my_orders:graphql-webinar', 'view_products:graphql-webinar'],
  }),
  fetchTokenInfo: sdkAuth => sdkAuth.anonymousFlow(),
});

const httpLink = createHttpLink({
  uri: 'https://api.sphere.io/graphql-webinar/graphql',
});

const authLink = setContext((_, { headers = {} }) => tokenProvider.getTokenInfo()
  .then(tokenInfo => `${tokenInfo.token_type} ${tokenInfo.access_token}`)
  .then(authorization => ({ headers: { ...headers, authorization } })));

export default new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
