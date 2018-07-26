import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
} from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { ResponsiveSwitcher, cardsFrom } from '../layouts';

export const QUERY_ACTIVE_PROJECTS = gql`
  query ActiveProjects {
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

const HomeCard = ({item: {id, sourceGroup, title, description, needDate, needStart, needEnd}}) =>
    <Card fluid={true} as={Link} to={`/help/${id}`}>
      <Card.Content header={title} meta={sourceGroup} description={description}/>
      <Card.Content extra>
        {needDate}<br/>
        {needStart} - {needEnd}
      </Card.Content>
    </Card>

const HomeCards = () =>
  <Query query={QUERY_ACTIVE_PROJECTS}>
    {({ data: { activeProjects } }) =>
      <ResponsiveSwitcher
        mobile={<Card.Group itemsPerRow={1}>{cardsFrom(HomeCard, activeProjects)}</Card.Group>}
        tablet={<Card.Group itemsPerRow={2}>{cardsFrom(HomeCard, activeProjects)}</Card.Group>}
        computer={<Card.Group itemsPerRow={3}>{cardsFrom(HomeCard, activeProjects)}</Card.Group>}
        />
    }
  </Query>

export default HomeCards