import React from 'react';

import {
  Statistic,
  Icon,
  List,
} from 'semantic-ui-react';

import { colorByPercent } from '../ui'

export const SentCountListItem = ({icon, color, content}) =>
  <List.Item>
    <List.Icon name={icon} color={color}/>
    <List.Content>{content}</List.Content>
  </List.Item>

const PeopleStats = ({size='small', sentPersonsNeeded, sentPersonsScore, sentPersonCounts: {sent, confirmed, noshow}}) =>
<Statistic.Group widths="three" size={size}>
  <Statistic>
    <Statistic.Value><Icon name='users'/> {sentPersonsNeeded}</Statistic.Value>
    <Statistic.Label>Requested</Statistic.Label>
  </Statistic>
  <Statistic color={colorByPercent(sentPersonsScore * 100)} >
    <Statistic.Value><Icon name='play circle'/> {sent + confirmed + noshow}</Statistic.Value>
    <Statistic.Label>Sent</Statistic.Label>
  </Statistic>
  <Statistic color={colorByPercent(confirmed / sentPersonsNeeded)} >
    <List>
      <SentCountListItem icon='star half outline' color='yellow' content={`${noshow} maybe`}/>
      <SentCountListItem icon='star outline' color='yellow' content={`${sent} probably`}/>
      <SentCountListItem icon='star' color='green' content={`${confirmed} made it`}/>
    </List>
  </Statistic>
</Statistic.Group>

export default PeopleStats


