import React from 'react';

import {
  Icon,
  Header,
  Segment,
} from 'semantic-ui-react';

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

const DeliveryMethod = ({contactMethod}) =>
  <Segment basic>
    { contactMethod==='SCHEDULE' ? <DeliverySchedule /> : <DeliveryWalkup /> }
  </Segment>

export default DeliveryMethod;