import React from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Header,
  Icon,
} from 'semantic-ui-react';
import gql from 'graphql-tag';
// import { Query } from 'react-apollo';

export const QUERY_SHOW_PROJECT = gql`
  query ShowProject {
    activeProjects @client {
      id
      title
      sourceGroup
      description
      needDate
      needStart
      needEnd
    }
  }
`

// const HomeCard = ({item: {id, sourceGroup, title, description, needDate, needStart, needEnd}}) =>

const HomeProject = ({id}) =>
  <Grid stackable columns={2}>
    <Grid.Column>
      <Link to='/'>
      <Header as='h2'>
        <Icon name='angle left' />
        Project: Name #{id}
      </Header>
      </Link>
    </Grid.Column>
    <Grid.Column>
      More Content
    </Grid.Column>
  </Grid>

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

export default HomeProject