import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-client-preset';
import gql from 'graphql-tag';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import fetch from 'isomorphic-fetch'; // eslint-disable-line no-unused-vars
import { createHttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

// const HALP_BACKEND_HTTP_URI = process.env.RAZZLE_HALP_BACKEND_HTTP_URI ||
//   'http://localhost:4000/graphql'

// const HALP_BACKEND_WS_URI = process.env.RAZZLE_HALP_BACKEND_WS_URI ||
//   'ws://localhost:4000/graphql';

// const HALP_BACKEND_HTTP_URI = 
//   `http://${window.location.hostname}/graphql`

// const HALP_BACKEND_WS_URI =
//   `ws://${window.location.hostname}/graphql`

export const PROJECT_STATE_ACTIVE = 'active'
export const PROJECT_STATE_CLOSED = 'closed'
export const PROJECT_STATE_OLD = 'old'

const defaults = {
  authToken: false,
  currentUser: {
    __typename: 'User'
  },
  users: [
    {
      __typename: 'User',
      id: '1',
      email: 'sdebaun74@gmail.com',
      password: 'sdebaun',
    },
    {
      __typename: 'User',
      id: '2',
      email: 'yourmom@burningman.org',
      password: 'yourmom',
    }
  ],
}

const QUERY_ALL_USERS = gql`
  query AllUsers @client {
    users {
      email
      password
    }
  }
`

const resolvers = {
  Mutation: {
    signinUser: (obj, {email, password}, context, info) => {
      const { users } = context.cache.readQuery({
        query: QUERY_ALL_USERS
      })
      // console.log('users', users)
      // console.log('signin with', email, password)
      const currentUser = users.find(u => ((u.email===email) && (u.password === password)))
      // console.log('currentUser', currentUser)
      return currentUser ? true : false
    },
  }
}

function createApolloClient({ ssrMode, hostname }) {
  const cache = ssrMode
    ? new InMemoryCache()
    : new InMemoryCache().restore(window.__APOLLO_STATE__)

  const HALP_BACKEND_HTTP_URI = 
    `http://${hostname}:4000/graphql`
  
  const HALP_BACKEND_WS_URI =
    `ws://${hostname}:4000/graphql`
  
  const httpLink = createHttpLink({
    uri: HALP_BACKEND_HTTP_URI,
    // uri: 'http://localhost:4000/graphql',
    // uri: 'http://:4000/graphql',
    credentials: 'same-origin',
    fetch,
  })

  const wsLink = ssrMode ? null : new WebSocketLink({
    uri: HALP_BACKEND_WS_URI,
    // uri: 'ws://localhost:4000/graphql',
    options: {
      reconnect: true
    }
  })

  const networkLink = ssrMode ? httpLink : split(
    ({query}) => {
      const {kind, operation} = getMainDefinition(query)
      return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    httpLink,
  )

  const stateLink = withClientState({
    cache,
    defaults,
    resolvers,
  })

  const link = ApolloLink.from([
    stateLink,
    networkLink,
  ])

  return new ApolloClient({
    ssrMode,
    link,
    cache
  });
}

export default createApolloClient;