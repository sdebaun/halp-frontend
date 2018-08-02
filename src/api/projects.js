import gql from 'graphql-tag';

export const refetchAll = [
  'projectsActive',
  'projectCounts',
  'getProject'
]

export const refetchSpecific = (id) => [
  {
    query: QUERY_ACTIVE_PROJECTS,
  },
  {
    query: QUERY_PROJECT_COUNTS,
  },
  {
    query: QUERY_GET_PROJECT,
    variables: { id }
  }
]

export const QUERY_ACTIVE_PROJECTS = gql`
  query projectsActive {
    projectsActive {
      id
      title
      sourceGroup
      pitch
      needStart
      needEnd
      sentPersonsNeeded
      sentPersonCounts {
        sent
        confirmed
        noshow
      }
    }
  }
`

export const QUERY_PROJECT_COUNTS = gql`
  query projectCounts {
    projectCounts {
      active
      closed
      old
    }
  }
`

export const QUERY_GET_PROJECT = gql`
  query getProject($id: String!) {
    getProject(id: $id) {
      id
      title
      sourceGroup
      pitch
      needStart
      needEnd
      state
      contactMethod
      contactAddress
      contactName
      details {
        id
        text
      }
      sentPersonsNeeded
      sentPersons {
        id
        name
        state
      }
      sentPersonCounts {
        sent
        confirmed
        noshow
      }
    }
  }
`

export const MUTATION_CREATE_PROJECT = gql`
  mutation createProject(
    $title: String!,
    $pitch: String!,
    $sourceGroup: String!,
    $needStart: String!,
    $needEnd: String!,
    $contactMethod: String!,
    $contactAddress: String!,
    $contactName: String!,
    $sentPersonsNeeded: Int!,
    ) {
    createProject(
      title: $title,
      pitch: $pitch,
      sourceGroup: $sourceGroup,
      needStart: $needStart,
      needEnd: $needEnd,
      contactMethod: $contactMethod,
      contactAddress: $contactAddress,
      contactName: $contactName,
      sentPersonsNeeded: $sentPersonsNeeded,
    ) {
      id
    }
  }
`

export const MUTATION_COPY_PROJECT = gql`
  mutation copyProject(
    $id: String!
  ) {
    copyProject(
      id: $id
    ) {
      id # the new id
    }
  }
`

export const MUTATION_DELETE_PROJECT = gql`
  mutation deleteProject($id: String!) {
    deleteProject(id: $id)
  }
`

export const MUTATION_UPDATE_PROJECT = gql`
  mutation updateProject(
    $id: String!,
    $title: String,
    $pitch: String,
    $sourceGroup: String,
    $needStart: String,
    $needEnd: String,
    $contactMethod: String,
    $contactAddress: String,
    $contactName: String,
    $sentPersonsNeeded: Int,
    ) {
    updateProject(
      id: $id
      title: $title,
      pitch: $pitch,
      sourceGroup: $sourceGroup,
      needStart: $needStart,
      needEnd: $needEnd,
      contactMethod: $contactMethod,
      contactName: $contactName,
      contactAddress: $contactAddress,
      sentPersonsNeeded: $sentPersonsNeeded,
    ) {
      id
    }
  }
`

export const MUTATION_ADD_PROJECT_DETAIL = gql`
  mutation addProjectDetail(
    $projectId: String!,
    $text: String!
  ) {
    addProjectDetail(
      projectId: $projectId,
      text: $text
    ) {
      id
    }
  }
`

export const MUTATION_DELETE_PROJECT_DETAIL = gql`
  mutation deleteProjectDetail(
    $id: String!,
  ) {
    deleteProjectDetail(id: $id)
  }
`

export const MUTATION_UPDATE_PROJECT_DETAIL = gql`
  mutation updateProjectDetail(
    $id: String!,
    $text: String!
  ) {
    updateProjectDetail(id: $id, text: $text) {
      id
    }
  }
`