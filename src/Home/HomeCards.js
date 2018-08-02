import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
} from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { ResponsiveSwitcher, cardsFrom } from '../layouts';

export const QUERY_ACTIVE_PROJECTS = gql`
  query projectsActive {
    projectsActive {
      id
      title
      sourceGroup
      pitch
      needStart
      needEnd
    }
  }
`

const HomeCard = ({item: {id, sourceGroup, title, pitch, needStart, needEnd}}) =>
    <Card fluid={true} as={Link} to={`/help/${id}`}>
      <Card.Content header={title} meta={sourceGroup} description={pitch}/>
      <Card.Content extra>
        {needStart} - {needEnd}
      </Card.Content>
    </Card>

const HomeCards = () =>
  <Query query={QUERY_ACTIVE_PROJECTS}>
    {({ loading, data: { projectsActive } }) => {
      if (loading) { return <div>LOADING...</div> }
      // console.log('ap', activeProjects)
      return <ResponsiveSwitcher
        mobile={<Card.Group itemsPerRow={1}>{cardsFrom(HomeCard, projectsActive)}</Card.Group>}
        tablet={<Card.Group itemsPerRow={2}>{cardsFrom(HomeCard, projectsActive)}</Card.Group>}
        computer={<Card.Group itemsPerRow={3}>{cardsFrom(HomeCard, projectsActive)}</Card.Group>}
        />
    }}
  </Query>

export default HomeCards