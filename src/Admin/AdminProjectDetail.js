import React from 'react';
import moment from 'moment';
import Moment from 'react-moment';
import {
  Grid,
  Step,
  Statistic,
  Segment,
  Icon,
  Header,
} from 'semantic-ui-react';

import AdminProjectTitle from './AdminProjectTitle';

const isSameDay = (a, b) =>
  moment(a).startOf('day').isSame(moment(b).startOf('day'))

export const TimeRange = ({needStart, needEnd}) => 
  <Step.Group fluid>
    <Step>
      <Step.Content>
        <Step.Title><Moment format='ddd D MMM' date={needStart}/></Step.Title>
        <Step.Description><Moment format='h:mm a' date={needStart}/></Step.Description>
      </Step.Content>
    </Step>
    <Step>
      <Step.Content>
      <Step.Title>{!isSameDay(needStart, needEnd) ? <Moment format='ddd D MMM' date={needEnd}/> : '-'}</Step.Title>
        <Step.Description><Moment format='h:mm a' date={needEnd}/></Step.Description>
      </Step.Content>
    </Step>
  </Step.Group>

const colorByPercent = percent => {
  if (percent >= 1) { return 'green' }
  if (percent >= 0.75) { return 'olive' }
  if (percent >= 0.5) { return 'yellow' }
  if (percent >= 0.25) { return 'orange' }
  return 'red'
}

export const PeopleStats = ({sentPersonsNeeded, sentPersonCounts: {sent, confirmed, noshow}}) =>
  <Statistic.Group width="three" size='tiny'>
    <Statistic>
      <Statistic.Value><Icon name='users'/> {sentPersonsNeeded}</Statistic.Value>
      <Statistic.Label>Needed</Statistic.Label>
    </Statistic>
    <Statistic color={colorByPercent((sent + confirmed - noshow) / sentPersonsNeeded)} >
      <Statistic.Value><Icon name='play circle'/> {sent + confirmed - noshow}</Statistic.Value>
      <Statistic.Label>Sent</Statistic.Label>
    </Statistic>
    <Statistic color={colorByPercent(confirmed / sentPersonsNeeded)} >
      <Statistic.Value><Icon name='checkmark box'/> {confirmed}</Statistic.Value>
      <Statistic.Label>Confirm</Statistic.Label>
    </Statistic>
  </Statistic.Group>

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

const SendPerson = () =>
  <Segment>
    <Header as='h2'>Send a Person</Header>
  </Segment>
const AdminProjectDetail = ({project}) =>
  <div>
    <AdminProjectTitle project={project} linkTo='/admin' />
    <Grid stackable>
      <Grid.Row columns={2}>
        <Grid.Column>
          <p style={{fontSize: '1.5rem', fontWeight: 200}}>{project.pitch}</p>
          <TimeRange {...project} />
          <h3>Needs</h3>
          <p>add a need</p>
        </Grid.Column>
        <Grid.Column>
          <PeopleStats {...project} />
          <DeliveryInfo {...project} />
          <SendPerson />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>

export default AdminProjectDetail


