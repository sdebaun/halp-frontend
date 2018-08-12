import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-client-preset';
import gql from 'graphql-tag';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import fetch from 'isomorphic-fetch'; // eslint-disable-line no-unused-vars
import { createHttpLink } from 'apollo-link-http';
// import uuid from 'uuid/v1';
const uuid = require('uuid/v1');

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
    }
  ],
  projects: [
    {
      __typename: 'Project',
      id: '1',
      sourceGroup: 'Temple Guardians',
      title: 'Defend the Temple',
      pitch: 'Help defend the temple against invasion by evil space aliens that want to steal our pants.',
      needStart: '1974-10-25T10:00',
      needEnd: '1974-10-25T16:00',
      state: PROJECT_STATE_ACTIVE,
      contactMethod: 'SCHEDULE',
      contactAddress: '4 & E',
      contactName: 'Bob Dobbs',
    },
    {
      __typename: 'Project',
      id: '2',
      sourceGroup: 'Medusa Madness',
      title: 'Building Medusa-Proof Bunkers',
      pitch: 'Nobody wants to get caught out in the open when the Medusa comes around!',
      needStart: '1974-10-25T10:00',
      needEnd: '1974-10-26T16:00',
      state: PROJECT_STATE_ACTIVE,
      contactMethod: 'WALKUP',
      contactAddress: '4 & E',
      contactName: 'Bob Dobbs',
    },
    {
      __typename: 'Project',
      id: '3',
      sourceGroup: 'Full Circle Tea House',
      title: 'Pour a Round of Tea or Two',
      pitch: 'Come pour tea because that is so much fun you can\'t even believe it!',
      needStart: '1974-10-25T10:00',
      needEnd: '1974-10-26T16:00',
      state: PROJECT_STATE_ACTIVE,
      contactMethod: 'WALKUP',
      contactAddress: '4 & E',
      contactName: 'Bob Dobbs',
    },
    {
      __typename: 'Project',
      id: '4',
      sourceGroup: 'Some Group',
      title: 'Closed Project',
      pitch: 'Come pour tea because that is so much fun you can\'t even believe it!',
      needStart: '1974-10-25T10:00',
      needEnd: '1974-10-26T16:00',
      state: PROJECT_STATE_CLOSED,
      contactMethod: 'WALKUP',
      contactAddress: '4 & E',
      contactName: 'Bob Dobbs',
    },
    {
      __typename: 'Project',
      id: '5',
      sourceGroup: 'Some Group',
      title: 'Old Project',
      pitch: 'Come pour tea because that is so much fun you can\'t even believe it!',
      needStart: '1974-10-25T10:00',
      needEnd: '1974-10-26T16:00',
      state: PROJECT_STATE_OLD,
      contactMethod: 'WALKUP',
      contactAddress: '4 & E',
      contactName: 'Bob Dobbs',
    },
  ]
}

const QUERY_ALL_USERS = gql`
  query AllUsers @client {
    users {
      email
      password
    }
  }
`

const QUERY_ALL_PROJECTS = gql`
  query AllProjects @client {
    projects {
      id
      sourceGroup
      title
      pitch
      needStart
      needEnd
      state
      contactMethod
      contactAddress
      contactName
    }
  }
`

const resolvers = {
  Query: {
    projectCounts: (obj, args, context, info) => {
      // console.log('wat')
      const { projects } = context.cache.readQuery({ query: QUERY_ALL_PROJECTS })
      const active = projects.filter(p => p.state === PROJECT_STATE_ACTIVE).length
      const closed = projects.filter(p => p.state === PROJECT_STATE_CLOSED).length
      const old = projects.filter(p => p.state === PROJECT_STATE_OLD).length
      const projectCounts = { active, closed, old }
      // console.log('pc', projectCounts)
      return projectCounts
    },
    activeProjects: (obj, args, context, info) => {
      const { projects } = context.cache.readQuery({ query: QUERY_ALL_PROJECTS })
      // console.log('found projects', projects)
      return projects.filter(p => p.state === PROJECT_STATE_ACTIVE)
    },
    getProject: (obj, {id}, context, info) => {
      const { projects } = context.cache.readQuery({ query: QUERY_ALL_PROJECTS })
      // console.log('looking for', id, 'in', projects)
      const found = projects.find(p => p.id === id)
      // console.log('found', found)
      return found
    },
  },
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
    createProject: (obj, vals, context, info) => {
      const { projects } = context.cache.readQuery({ query: QUERY_ALL_PROJECTS })
      const newProject = {
        __typename: 'Project',
        id: uuid(),
        state: PROJECT_STATE_ACTIVE,
        ...vals
      }
      context.cache.writeQuery({
        query: QUERY_ALL_PROJECTS,
        data: {projects: projects.concat([newProject])}
      })
      return newProject
    },
    deleteProject: (obj, {id}, context, info) => {
      // console.log('deleting', id)
      const { projects } = context.cache.readQuery({ query: QUERY_ALL_PROJECTS })
      const foundIndex = projects.findIndex(o => o.id === id)
      // console.log('found to delete', foundIndex)
      projects.splice(foundIndex, 1)
      if (foundIndex > -1) {
        context.cache.writeQuery({
          query: QUERY_ALL_PROJECTS,
          data: { projects }
        })
        return foundIndex
      }
      return -1
    },
    updateProject: (obj, vals, context, info) => {
      const { projects } = context.cache.readQuery({ query: QUERY_ALL_PROJECTS })
      const foundIndex = projects.findIndex(o => o.id === vals.id)
      if (foundIndex > -1) {
        const updatedProject = Object.assign(projects[foundIndex], vals)
        projects[foundIndex] = updatedProject
        context.cache.writeQuery({
          query: QUERY_ALL_PROJECTS,
          data: { projects }
        })
        return foundIndex
      }
      return -1
    }
  }
}

function createApolloClient({ ssrMode }) {
  const cache = ssrMode
    ? new InMemoryCache()
    : new InMemoryCache().restore(window.__APOLLO_STATE__)

  const httpLink = createHttpLink({ uri: 'http://localhost:4000/graphql '})

  const stateLink = withClientState({
    cache,
    defaults,
    resolvers,
  })

  const link = ApolloLink.from([stateLink, httpLink])

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