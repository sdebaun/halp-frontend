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
    <Step active style={{padding: '8px'}}>
      <Step.Content>
        <Step.Description><Moment format='ddd D MMM' date={needStart}/></Step.Description>
        <Step.Title><Moment format='h:mm a' date={needStart}/></Step.Title>
      </Step.Content>
    </Step>
    <Step style={{padding: '8px'}}>
      <Step.Content>
        <Step.Description>{!isSameDay(needStart, needEnd) ? <Moment format='ddd D MMM' date={needEnd}/> : '-'}</Step.Description>
        <Step.Title><Moment format='h:mm a' date={needEnd}/></Step.Title>
      </Step.Content>
    </Step>
  </Step.Group>

export default TimeRange