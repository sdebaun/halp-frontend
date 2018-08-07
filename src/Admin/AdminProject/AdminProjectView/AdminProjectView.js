import React from 'react';
import { Mutation } from 'react-apollo';
import {
  MUTATION_ADD_PROJECT_DETAIL,
  MUTATION_DELETE_PROJECT_DETAIL,
  MUTATION_UPDATE_PROJECT_DETAIL,
  MUTATION_ADD_PROJECT_SENTPERSON,
  MUTATION_DELETE_PROJECT_SENTPERSON,
  MUTATION_UPDATE_PROJECT_SENTPERSON,
  refetchSpecific
} from '../../../api/projects';
import { Toggle } from 'react-powerplug';

import {
  Grid,
  Segment,
  Icon,
  Header,
} from 'semantic-ui-react';

import AdminProjectTitle from '../AdminProjectTitle';
import TimeRange from '../../components/TimeRange';
import PeopleStats from '../../components/PeopleStats';
import SentPersons from './SentPersons';
import Details from './Details';

export const DeliverySchedule = () =>
<Header as='h3'>
<Icon name='calendar check outline'/>
<Header.Content>
  Schedule a Shift
  <Header.Subheader>Contact them and work out a time and date.</Header.Subheader>
</Header.Content>
</Header>

export const DeliveryWalkup = () =>
<Header as='h3'>
<Icon name='child'/>
<Header.Content>
  Walk-Up
  <Header.Subheader>Go find the contact and you can HALP right now!</Header.Subheader>
</Header.Content>
</Header>

export const DeliveryContact = ({contactName, contactAddress}) =>
<Header as='h4'>
  <Icon name='user'/>
  <Header.Content>
    {contactName}
    <Header.Subheader>{contactAddress}</Header.Subheader>
  </Header.Content>
</Header>

export const DeliveryInfo = ({contactMethod, contactName, contactAddress}) =>
  <Segment basic>
    { contactMethod==='SCHEDULE' ? <DeliverySchedule /> : <DeliveryWalkup />}
    <DeliveryContact contactName={contactName} contactAddress={contactAddress}/>
  </Segment>


const AdminProjectView = ({project}) =>
  <div>
    <AdminProjectTitle project={project} linkTo='/admin' />
    <Grid stackable>
      <Grid.Row columns={2}>
        <Grid.Column>
          <p style={{fontSize: '1.5rem', fontWeight: 200}}>{project.pitch}</p>
          <TimeRange {...project} />
          <Details {...project} />
        </Grid.Column>
        <Grid.Column>
          <PeopleStats size='tiny' {...project} />
          <DeliveryInfo {...project} />
          <SentPersons {...project} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>

export default AdminProjectView


