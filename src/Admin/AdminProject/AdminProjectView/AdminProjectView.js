import React from 'react';

import {
  Grid,
  Segment,
  Header,
  Icon,
} from 'semantic-ui-react';

import AdminProjectTitle from '../AdminProjectTitle';
import TimeRange from '../../../components/TimeRange';
import PeopleStats from '../../../components/PeopleStats';
import SentPersons, { SentPersonAdd } from './SentPersons';
import Details from './Details';

import moment from 'moment';
import Moment from 'react-moment';

const DeliveryInfo = ({needStart, children, icon}) =>
  <Header as='h2' style={{fontWeight: 200}} inverted>
    <Icon name={icon}/>
    <Header.Content>
      {children} <span style={{fontWeight: 800}}>
      { moment.now() > moment(needStart) ? 'RIGHT MEOW' : <Moment fromNow>{needStart}</Moment>}
      </span>
      <br/>
      with <span style={{fontWeight: 800}}>Bob</span> at <span style={{fontWeight: 800}}>4 & E</span>
    </Header.Content>
  </Header>

const DeliverySchedule = ({needStart}) =>
  <DeliveryInfo needStart={needStart} icon='calendar check outline'>
    Schedule Someone
  </DeliveryInfo>

const DeliveryWalkup = ({needStart}) =>
  <DeliveryInfo needStart={needStart} icon='child'>
    Send Walkups
  </DeliveryInfo>

const colorForTiming = ({needStart}) =>
  moment(needStart) < moment.now() ? 'orange' : 'yellow'

const AdminProjectView = ({project}) =>
  <div>
    <AdminProjectTitle project={project} linkTo='/admin' />
    <Grid stackable>
      <Grid.Row columns={2}>
        <Grid.Column>
          <Segment basic>
            <TimeRange {...project} />
          </Segment>
          <Segment basic>
            <p style={{fontSize: '1.5rem', fontWeight: 200}}>{project.pitch}</p>
          </Segment>
          <Segment basic>
            <Details {...project} />
          </Segment>
        </Grid.Column>
        <Grid.Column>
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

export default AdminProjectView


