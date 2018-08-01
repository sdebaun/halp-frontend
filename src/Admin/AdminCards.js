import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardGroup
} from '../ui';
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
        mobile={<CardGroup itemsPerRow={1}>{cardsFrom(AdminCard, activeProjects)}</CardGroup>}
        tablet={<CardGroup itemsPerRow={2}>{cardsFrom(AdminCard, activeProjects)}</CardGroup>}
        computer={<CardGroup itemsPerRow={3}>{cardsFrom(AdminCard, activeProjects)}</CardGroup>}
        />
    }}
  </Query>

export default AdminCards