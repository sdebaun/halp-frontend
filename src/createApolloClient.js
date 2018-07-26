import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-client-preset';
import gql from 'graphql-tag';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
// import { createHttpLink } from 'apollo-link-http';
// import fetch from 'isomorphic-fetch';

const defaults = {
  authToken: false,
  currentUser: {
    __typename: 'User'
  },
  users: [
    {
      __typename: 'User',
      id: 1,
      email: 'sdebaun74@gmail.com',
      password: 'sdebaun',
    }
  ],
  activeProjects: [
    {
      __typename: 'Project',
      id: 1,
      sourceGroup: 'Temple Guardians',
      title: 'Defend the Temple',
      description: 'Help defend the temple against invasion by evil space aliens that want to steal our pants.',
      needDate: 'Sunday 30 Aug',
      needStart: '10a',
      needEnd: '2p',
    }
  ]
}

const resolvers = {
  Mutation: {
    signinUser: (obj, {email, password}, context, info) => {
      const { users } = context.cache.readQuery({
        query: gql`
          query AllUsers @client {
            users {
              email
              password
            }
          }
        `
      })
      console.log('users', users)
      console.log('signin with', email, password)
      const currentUser = users.find(u => ((u.email===email) && (u.password === password)))
      console.log('currentUser', currentUser)
      return currentUser ? true : false
    }
  }
}

function createApolloClient({ ssrMode }) {
  const cache = ssrMode
    ? new InMemoryCache()
    : new InMemoryCache().restore(window.__APOLLO_STATE__)

  const stateLink = withClientState({
    cache,
    defaults,
    resolvers,
  })

  const link = ApolloLink.from([stateLink])

  return new ApolloClient({
    ssrMode,
    link,
    cache
    // link: createHttpLink({
    //   uri: 'http://localhost:64895',
    //   credentials: 'same-origin',
    //   fetch,
    // }),
  });
}

export default createApolloClient;