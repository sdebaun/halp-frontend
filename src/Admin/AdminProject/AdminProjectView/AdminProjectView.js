import React, { Component } from 'react';

import {
  Grid,
  Segment,
  Header,
  Icon,
} from 'semantic-ui-react';

import AdminProjectTitle, {AdminProjectNav} from '../AdminProjectTitle';
import TimeRange from '../../../components/TimeRange';
import PeopleStats from '../../../components/PeopleStats';
import SentPersons, { SentPersonAdd } from './SentPersons';
import Details from './Details';
import Perks from './Perks';

import moment from 'moment';
import Moment from 'react-moment';

const DeliveryInfo = ({needStart, contactName, contactAddress, children, icon}) =>
  <Header as='h2' style={{fontWeight: 200}} inverted>
    <Icon name={icon}/>
    <Header.Content>
      {children} <span style={{fontWeight: 800}}>
      { moment.now() > moment(needStart) ? 'RIGHT MEOW' : <Moment fromNow>{needStart}</Moment>}
      </span>
      <br/>
      <span style={{fontWeight: 800}}>{contactName}</span> at <span style={{fontWeight: 800}}>{contactAddress}</span>
    </Header.Content>
  </Header>

const DeliverySchedule = props =>
  <DeliveryInfo {...props} icon='calendar check outline'>
    Schedule Someone
  </DeliveryInfo>

const DeliveryWalkup = props =>
  <DeliveryInfo {...props} icon='child'>
    Send Walkups
  </DeliveryInfo>

const colorForTiming = ({needStart}) =>
  moment(needStart) < moment.now() ? 'orange' : 'grey'

const AdminProjectViewStateless = ({project}) =>
  <div>
    <AdminProjectNav project={project} linkTo='/admin'/>
    <Grid stackable>
      <Grid.Row columns={2}>
        <Grid.Column>
          <AdminProjectTitle project={project} linkTo='/admin' />
          <Segment basic>
            <p style={{fontSize: '1.5rem', fontWeight: 200}}>{project.pitch}</p>
          </Segment>
          <Segment basic>
            <Details {...project} />
          </Segment>
          <Segment basic>
            <Perks {...project} />
          </Segment>
        </Grid.Column>
        <Grid.Column>
        <Segment basic>
            <TimeRange {...project} />
          </Segment>
          <Segment basic>
          <PeopleStats size='small' {...project} />
          </Segment>
          <Segment color={colorForTiming(project)} inverted>
            {project.contactMethod === 'SCHEDULE' ? <DeliverySchedule {...project}/> : <DeliveryWalkup {...project}/>}
            <SentPersonAdd {...project}/>
          </Segment>
          <Segment basic>
          <SentPersons {...project} />
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>

class AdminProjectView extends Component {
  componentDidMount() {
    this.props.startSubscriptions()
  }
  render() {
    return <AdminProjectViewStateless project={this.props.project}/>
  }
}

export default AdminProjectView


