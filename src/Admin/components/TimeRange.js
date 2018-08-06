import React from 'react';
import moment from 'moment';
import Moment from 'react-moment';
import {
  Step,
} from 'semantic-ui-react';

const isSameDay = (a, b) =>
  moment(a).startOf('day').isSame(moment(b).startOf('day'))

const TimeRange = ({needStart, needEnd}) => 
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

export default TimeRange