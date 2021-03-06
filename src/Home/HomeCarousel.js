import React, { Component } from 'react';
import _ from 'lodash';
import {
  Grid,
  Header,
  Segment,
  List,
  Icon,
} from 'semantic-ui-react';
import Slider from 'react-slick';
import { Query } from 'react-apollo';
import {
  QUERY_ACTIVE_PROJECTS_DETAILED,
  SUBSCRIPTION_PROJECT_ADDED,
  SUBSCRIPTION_PROJECT_CHANGED,
  SUBSCRIPTION_PROJECT_DELETED,
} from '../api/projects';

import moment from 'moment';
import Moment from 'react-moment';

const fulfilledScore = ({sent, confirmed, noshow}) =>
  (sent * 0.5) + (confirmed * 1) + (noshow * 0.25)

const spotsLeft = ({sentPersonsNeeded, sentPersonCounts}) => {
  const left = sentPersonsNeeded - fulfilledScore(sentPersonCounts)
  return ((left > 0) && (left < 5))
}
  
const OnlyAFewSpots = () =>
  <Header as='h1' color='orange' textAlign='center' style={{fontSize: '3rem'}}>
    only a few spots left!
  </Header>

const NeededCTA = ({sentPersonsNeeded, sentPersonCounts}) =>
  spotsLeft({sentPersonsNeeded, sentPersonCounts}) ? <OnlyAFewSpots /> : ''

const isSameDay = (a, b) =>
  moment(a).startOf('day').isSame(moment(b).startOf('day'))

const TimeRange = ({needStart, needEnd}) => 
  <Header as='h1' textAlign='center'>
    <Header.Content>
      <Header.Subheader style={{fontSize: '2.5rem', lineHeight: '5rem'}}>
        <Moment format='ddd D MMM' date={needStart}/>
      </Header.Subheader>
      <Moment format='h:mm a' date={needStart} style={{fontSize: '4rem'}}/>
    </Header.Content>
    <Header.Subheader style={{fontSize: '2rem', lineHeight: '8rem'}}>
    until
    </Header.Subheader>
    <Header.Content>
      <Header.Subheader style={{fontSize: '2.5rem', lineHeight: '5rem'}}>
        {!isSameDay(needStart, needEnd) ? <Moment format='ddd D MMM' date={needEnd}/> : ''}
      </Header.Subheader>
      <Moment format='h:mm a' date={needEnd} style={{fontSize: '4rem'}}/>
    </Header.Content>
  </Header>

const DetailItem = ({detail: {text}}) =>
  <List.Item style={{padding: '1.5rem'}}>
    <Icon name='checkmark'/>
    <List.Content>{text}</List.Content>
  </List.Item>

const PerkItem = ({perk: {text}}) =>
  <List.Item style={{padding: '1.5rem'}}>
    <Icon name='checkmark'/>
    <List.Content>{text}</List.Content>
  </List.Item>

const DetailList = ({id, details}) =>
  details.length === 0 ?
    '' :
    <div>
      <h2>They are looking for...</h2>
      <List divided verticalAlign='middle' size='large'>
        { details.map((d,i) => <DetailItem key={i} projectId={id} detail={d} />) }
      </List>
    </div>

const PerkList = ({id, perks}) =>
  perks.length === 0 ?
    '' :
    <div>
      <h2>They will hook you up with...</h2>
      <List divided verticalAlign='middle' size='large'>
        { perks.map((p,i) => <PerkItem key={i} projectId={id} perk={p} />) }
      </List>
    </div>

const DeliveryCTA = ({needStart, children, icon}) =>
  <Header as='h2' style={{fontWeight: 200}}>
    <Icon name={icon}/>
    <Header.Content>
      {children}<br/>
      <span style={{fontWeight: 800, fontSize: '3rem'}}>
      { moment.now() > moment(needStart) ? 'RIGHT MEOW' : <Moment fromNow>{needStart}</Moment>}
      !
      </span>
    </Header.Content>
  </Header>

const DeliverySchedule = ({needStart}) =>
  <DeliveryCTA needStart={needStart} icon='calendar check outline'>
    Schedule your time to HALP
  </DeliveryCTA>

const DeliveryWalkup = ({needStart}) =>
  <DeliveryCTA needStart={needStart} icon='child'>
    Walk up and HALP
  </DeliveryCTA>

const colorForTiming = ({needStart}) =>
  moment(needStart) < moment.now() ? 'orange' : 'yellow'

const HomeSlide = ({project}) =>
  <Grid stackable style={{backgroundColor: 'white'}}>
    <Grid.Row columns={2}>
      <Grid.Column>
        <Segment basic>
          <Header as='h2' style={{fontSize: '2rem', color: '#888'}}>{project.sourceGroup}</Header>
          <Header as='h1' style={{fontSize: '4rem'}}>{project.title}</Header>
        </Segment>
        <Segment basic style={{fontSize: '2rem', color: '#555', lineHeight: '3rem'}}>
          <p>{project.pitch}</p>
        </Segment>
        <Segment basic style={{fontSize: '1.5rem', color: '#555'}}>
          <DetailList {...project}/>
        </Segment>
        <Segment basic style={{fontSize: '1.5rem', color: '#555'}}>
          <PerkList {...project}/>
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment basic style={{padding: '2rem', paddingBottom: '4rem', backgroundColor: '#EEE'}}>
          <TimeRange {...project} />
        </Segment>
        <Segment inverted color={colorForTiming(project)} style={{padding: '2rem'}}>
          {project.contactMethod === 'SCHEDULE' ? <DeliverySchedule {...project}/> : <DeliveryWalkup {...project}/>}
        </Segment>
        <Segment basic>
          <NeededCTA {...project} />
        </Segment>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row columns={2}>
      <Grid.Column>
      </Grid.Column>
      <Grid.Column>
      </Grid.Column>
    </Grid.Row>
  </Grid>

const SETTINGS = {
    autoplay: true,
    autoplaySpeed: 12000,
    infinite: true,
    dots: true,
  }
  
const Loading = () =>
  <div>Loading...</div>

const HomeSliderStateless = ({projects, loading}) =>
  loading ?
    <Loading/> :
    <Slider {...SETTINGS}>
      { projects.map(project => <HomeSlide key={project.id} project={project}/>)}
    </Slider>

class HomeSliderComponent extends Component {
  componentDidMount() {
    this.props.startSubscriptions()
  }
  render() {
    return <HomeSliderStateless {...this.props} />
  }
}

const replace = (arr, item) => {
  const matchIndex = _.find(arr, {id: item.id})
  if (matchIndex >= 0) {
    arr.splice(matchIndex, 1, item)
  }
  return arr
}

const HomeCarousel = () =>
  <div style={{padding: '20px 40px'}}>
    <Query query={QUERY_ACTIVE_PROJECTS_DETAILED}>
      {({ loading, data: { projectsActive }, subscribeToMore }) => {
        const startSubscriptions = () => {
          subscribeToMore({
            document: SUBSCRIPTION_PROJECT_CHANGED,
            updateQuery: (prev, { subscriptionData }) => {
              const { projectChanged } = subscriptionData.data
              const projects = prev.projectsActive
              console.log('original projects', projects)
              console.log('changed project', projectChanged)
              return {
                projectsActive: replace(projects, projectChanged),
              }
            }
          })
          subscribeToMore({
            document: SUBSCRIPTION_PROJECT_ADDED,
            updateQuery: (prev, { subscriptionData }) => {
              const { projectAdded } = subscriptionData.data
              const projects = prev.projectsActive
              console.log('original projects', projects)
              console.log('added project', projectAdded)
              return {
                projectsActive: projects.concat([projectAdded]),
              }
            }
          })
          subscribeToMore({
            document: SUBSCRIPTION_PROJECT_DELETED,
            updateQuery: (prev, { subscriptionData }) => {
              const { projectDeleted } = subscriptionData.data
              const projects = prev.projectsActive
              console.log('original projects', projects)
              console.log('deleted project', projectDeleted)
              return {
                projectsActive: _.filter(projects, p => p.id !== projectDeleted)
              }
            }
          })
        }
        return <HomeSliderComponent {...{loading, projects: projectsActive, startSubscriptions}} />
      }}
    </Query>
  </div>

export default HomeCarousel