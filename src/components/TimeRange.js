import React from 'react';
import moment from 'moment';
import Moment from 'react-moment';
import {
  Step,
} from 'semantic-ui-react';

const isSameDay = (a, b) =>
  moment(a).startOf('day').isSame(moment(b).startOf('day'))

const isNow = (a, b) =>
  moment().isBetween(a, b)

const isPast = (b) =>
  moment().isAfter(b)

const colorFor = (a, b) => {
  if (isNow(a,b)) { return '#f2711c' }
  if (isPast(b)) { return 'black' }
  return '#767676'
}

const TimeRange = ({needStart, needEnd}) => 
  <Step.Group fluid style={{border: '2px solid', borderColor: colorFor(needStart, needEnd)}}>
    <Step style={{padding: '8px', backgroundColor: colorFor(needStart, needEnd)}}>
      <Step.Content>
        <Step.Description style={{color: 'white'}}><Moment format='ddd D MMM' date={needStart}/></Step.Description>
        <Step.Title style={{color: 'white'}}><Moment format='h:mm a' date={needStart}/></Step.Title>
      </Step.Content>
    </Step>
    <Step style={{padding: '8px'}}>
      <Step.Content>
        <Step.Description>{!isSameDay(needStart, needEnd) ? <Moment format='ddd D MMM' date={needEnd}/> : ''}</Step.Description>
        <Step.Title><Moment format='h:mm a' date={needEnd}/></Step.Title>
      </Step.Content>
    </Step>
  </Step.Group>

export default TimeRange