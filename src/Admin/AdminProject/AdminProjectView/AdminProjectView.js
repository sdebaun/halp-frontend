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
import SentPersons from './SentPersons';
import Details from './Details';

import DeliveryMethod from '../../../components/DeliveryMethod';
import DeliveryContact from '../../../components/DeliveryContact';
import moment from 'moment';
import Moment from 'react-moment';
const DeliveryState = ({contactMethod}) =>
<DeliveryFormat>
  </DeliveryFormat>
const DeliveryFormat = ({needStart, children, icon}) =>
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

// const DeliverySchedule = ({needStart}) =>
//   <DeliveryCTA needStart={needStart} icon='calendar check outline'>
//     Schedule your time to HALP
//   </DeliveryCTA>

// const DeliveryWalkup = ({needStart}) =>
//   <DeliveryCTA needStart={needStart} icon='child'>
//     Walk up and HALP
//   </DeliveryCTA>

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
            Schedule 4 hours from now<br/>
            with Bob at 4 &amp; E
          </Segment>
          <PeopleStats size='small' {...project} />
          {/* <DeliveryMethod {...project} />
          <DeliveryContact {...project} /> */}
          <SentPersons {...project} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>

export default AdminProjectView


