import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardGroup
} from '../ui';
import { ResponsiveSwitcher, cardsFrom } from '../layouts';

import { QUERY_ACTIVE_PROJECTS } from '../api/projects'
import { Query } from 'react-apollo'
import PeopleStats from './components/PeopleStats';
import TimeRange from './components/TimeRange';

const AdminCard = ({item: project}) =>
  <Card as={Link} to={`/admin/project/${project.id}`} fluid={true}>
    <Card.Content header={project.title} meta={project.sourceGroup} description={project.pitch}/>
    <Card.Content>
      <TimeRange needStart={project.needStart} needEnd={project.needEnd} />
      <PeopleStats {...project} />
    </Card.Content>
  </Card>

const AdminList = ({cols}) =>
  <Query query={QUERY_ACTIVE_PROJECTS}>
    {({ loading, data: { projectsActive } }) => {
      if (loading) { return <div>LOADING...</div> }
      return <ResponsiveSwitcher
        mobile={<CardGroup itemsPerRow={1}>{cardsFrom(AdminCard, projectsActive)}</CardGroup>}
        tablet={<CardGroup itemsPerRow={2}>{cardsFrom(AdminCard, projectsActive)}</CardGroup>}
        computer={<CardGroup itemsPerRow={3}>{cardsFrom(AdminCard, projectsActive)}</CardGroup>}
        />
    }}
  </Query>

export default AdminList