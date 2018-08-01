import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
} from 'semantic-ui-react';
import { ResponsiveSwitcher, cardsFrom } from '../layouts';

import { QUERY_ACTIVE_PROJECTS } from '../Home/HomeCards'
import { Query } from 'react-apollo'
import { PeopleStats, TimeRange } from './AdminProjectDetail';

const AdminCard = ({item: {id, sourceGroup, title, pitch, needStart, needEnd}}) =>
  <Card as={Link} to={`/admin/project/${id}`} fluid={true}>
    <Card.Content header={title} meta={sourceGroup} description={pitch}/>
    <Card.Content>
      <TimeRange needStart={needStart} needEnd={needEnd} />
      <PeopleStats peopleNeeded={10} peopleSent={4} peopleConfirmed={2} />
    </Card.Content>
  </Card>

const AdminCards = ({cols}) =>
  <Query query={QUERY_ACTIVE_PROJECTS}>
    {({ loading, data: { activeProjects } }) => {
      if (loading) { return <div>LOADING...</div> }
      return <ResponsiveSwitcher
        mobile={<Card.Group itemsPerRow={1}>{cardsFrom(AdminCard, activeProjects)}</Card.Group>}
        tablet={<Card.Group itemsPerRow={2}>{cardsFrom(AdminCard, activeProjects)}</Card.Group>}
        computer={<Card.Group itemsPerRow={3}>{cardsFrom(AdminCard, activeProjects)}</Card.Group>}
        />
    }}
  </Query>

export default AdminCards