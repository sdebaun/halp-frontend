import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import {
  Card,
  CardGroup,
  Progress,
  colorByPercent,
} from '../ui';
import { ResponsiveSwitcher, cardsFrom } from '../layouts';

import {
  QUERY_PROJECTS_BY_STATE,
  SUBSCRIPTION_PROJECT_CHANGED,
  SUBSCRIPTION_PROJECT_ADDED,
  SUBSCRIPTION_PROJECT_DELETED,
} from '../api/projects'

import { Query } from 'react-apollo'
import PeopleStats from '../components/PeopleStats';
import TimeRange from '../components/TimeRange';

const AdminCard = ({item: project}) =>
  <Card as={Link} to={`/admin/project/${project.id}`} fluid={true}>
    <Progress percent={project.sentPersonsScore * 100} attached='top' size='tiny' color={colorByPercent(project.sentPersonsScore * 100)}/>
    <Card.Content>
      <Card.Meta style={{paddingBottom: '0.5rem'}}>{project.sourceGroup}</Card.Meta>
      <Card.Header>{project.title}</Card.Header>
      <TimeRange needStart={project.needStart} needEnd={project.needEnd} />
      <PeopleStats {...project} />
    </Card.Content>
  </Card>

const AdminListStateless = ({loading, projectsByState}) =>
  loading ?
  <div>LOADING...</div> :
  <ResponsiveSwitcher
    mobile={<CardGroup style={{paddingTop: '1rem'}} itemsPerRow={1}>{cardsFrom(AdminCard, projectsByState)}</CardGroup>}
    tablet={<CardGroup style={{paddingTop: '1rem'}} itemsPerRow={2}>{cardsFrom(AdminCard, projectsByState)}</CardGroup>}
    computer={<CardGroup style={{paddingTop: '1rem'}} itemsPerRow={3}>{cardsFrom(AdminCard, projectsByState)}</CardGroup>}
    />

class AdminListComponent extends Component {
  componentDidMount() {
    this.props.startSubscriptions()
  }

  render() {
    return <AdminListStateless {...this.props} />
  }
}

const replace = (arr, item) => {
  const matchIndex = _.find(arr, {id: item.id})
  if (matchIndex >= 0) {
    arr.splice(matchIndex, 1, item)
  }
  return arr
}

const AdminList = ({cols, filterState}) =>
  <Query query={QUERY_PROJECTS_BY_STATE} variables={{state: filterState || 'active'}}>
    {({ loading, data: { projectsByState }, subscribeToMore }) => {
      const startSubscriptions = () => {
        subscribeToMore({
          document: SUBSCRIPTION_PROJECT_CHANGED,
          updateQuery: (prev, { subscriptionData }) => {
            const { projectChanged } = subscriptionData.data
            const projects = prev.projectsByState
            console.log('original projects', projects)
            console.log('changed project', projectChanged)
            return {
              projectsByState: replace(projects, projectChanged),
            }
          }
        })
        subscribeToMore({
          document: SUBSCRIPTION_PROJECT_ADDED,
          updateQuery: (prev, { subscriptionData }) => {
            const { projectAdded } = subscriptionData.data
            const projects = prev.projectsByState
            console.log('original projects', projects)
            console.log('added project', projectAdded)
            return {
              projectsByState: projects.concat([projectAdded]),
            }
          }
        })
        subscribeToMore({
          document: SUBSCRIPTION_PROJECT_DELETED,
          updateQuery: (prev, { subscriptionData }) => {
            const { projectDeleted } = subscriptionData.data
            const projects = prev.projectsByState
            console.log('original projects', projects)
            console.log('deleted project', projectDeleted)
            return {
              projectsByState: _.filter(projects, p => p.id !== projectDeleted)
            }
          }
        })
      }
      return <AdminListComponent {...{loading, projectsByState, startSubscriptions}}/>
    }}
  </Query>

export default AdminList