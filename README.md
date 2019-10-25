# commercetools GraphQL React

[![Netlify Status](https://api.netlify.com/api/v1/badges/8a8d57c4-3429-47cb-b6f0-de30a98f15b8/deploy-status)](https://app.netlify.com/sites/commercetools-graphql-react/deploys)

## Demo
https://commercetools-graphql-react.netlify.com/

## Requirements
- [Yarn](https://yarnpkg.com/en/) installed

## Commands

Project setup
```
yarn install
```

Compiles and hot-reloads for development
```
yarn start
```

Compiles and minifies for production
```
yarn build
```

## How to re-create this project

This is the setup that was used to create and connect this project to commercetools GraphQL API.

### Steps
Create project with [npx](https://www.npmjs.com/package/npx)
```
npx create-react-app commercetools-graphql-react
```

Add apollo as dependency
```
cd commercetools-graphql-react
npm install @apollo/react-hooks apollo-client apollo-link-context apollo-link-http apollo-cache-inmemory graphql graphql-tag
```

Install commercetools Auth SDK
```
yarn add @commercetools/sdk-auth
```

Create `src/apollo.js` with this code
```javascript
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
```

Replace `src/App.js` content with this code
```javascript
import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import apolloClient from './apollo';
import './App.css';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <div>Your code</div>
    </ApolloProvider>
  );
}

export default App;
```


Now you can create GraphQL queries and mutations to commercetools in any React component.
