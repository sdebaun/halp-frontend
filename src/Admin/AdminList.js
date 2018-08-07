import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardGroup,
  Progress,
  colorByPercent,
} from '../ui';
import { ResponsiveSwitcher, cardsFrom } from '../layouts';

import { QUERY_ACTIVE_PROJECTS } from '../api/projects'
import { Query } from 'react-apollo'
import PeopleStats from './components/PeopleStats';
import TimeRange from './components/TimeRange';

const AdminCard = ({item: project}) =>
  <Card as={Link} to={`/admin/project/${project.id}`} fluid={true}>
    <Progress percent={100 * project.sentPersonCounts.confirmed / project.sentPersonsNeeded} attached='top' size='tiny' color={colorByPercent(project.sentPersonCounts.confirmed / project.sentPersonsNeeded)}/>
    <Card.Content>
      <Card.Meta style={{paddingBottom: '0.5rem'}}>{project.sourceGroup}</Card.Meta>
      <Card.Header>{project.title}</Card.Header>
      <Card.Description>{project.pitch}</Card.Description>
      <TimeRange needStart={project.needStart} needEnd={project.needEnd} />
      <PeopleStats {...project} />
    </Card.Content>
  </Card>

const AdminList = ({cols}) =>
  <Query query={QUERY_ACTIVE_PROJECTS}>
    {({ loading, data: { projectsActive } }) => {
      if (loading) { return <div>LOADING...</div> }
      return <ResponsiveSwitcher
        mobile={<CardGroup style={{paddingTop: '1rem'}} itemsPerRow={1}>{cardsFrom(AdminCard, projectsActive)}</CardGroup>}
        tablet={<CardGroup style={{paddingTop: '1rem'}} itemsPerRow={2}>{cardsFrom(AdminCard, projectsActive)}</CardGroup>}
        computer={<CardGroup style={{paddingTop: '1rem'}} itemsPerRow={3}>{cardsFrom(AdminCard, projectsActive)}</CardGroup>}
        />
    }}
  </Query>

export default AdminList