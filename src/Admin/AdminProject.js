import React from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Header,
  Icon,
} from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export const QUERY_GET_PROJECT = gql`
  query getProject($id: Number!) {
    getProject(id: $id) @client {
      id
      title
      sourceGroup
      description
      needDate
      needStart
      needEnd
      state
    }
  }
`

// const HomeCard = ({item: {id, sourceGroup, title, description, needDate, needStart, needEnd}}) =>

const AdminProject = ({id}) =>
  <Query query={QUERY_GET_PROJECT} variables={{id}}>
    {({ loading, data: { getProject } }) => {
      if (loading) { return <div>LOADING...</div> }
      return <Grid stackable columns={2}>
        <Grid.Column>
          <Link to='/admin'>
          <Header as='h2'>
            <Icon name='angle left' />
            {getProject.title}
          </Header>
          </Link>
        </Grid.Column>
        <Grid.Column>
          More Content
        </Grid.Column>
      </Grid>
    }}
  </Query>

// const HomeProject = () =>
//   <Query query={QUERY_ACTIVE_PROJECTS}>
//     {({ data: { activeProjects } }) =>
//       <ResponsiveSwitcher
//         mobile={<Card.Group itemsPerRow={1}>{cardsFrom(HomeCard, activeProjects)}</Card.Group>}
//         tablet={<Card.Group itemsPerRow={2}>{cardsFrom(HomeCard, activeProjects)}</Card.Group>}
//         computer={<Card.Group itemsPerRow={3}>{cardsFrom(HomeCard, activeProjects)}</Card.Group>}
//         />
//     }
//   </Query>

export default AdminProject