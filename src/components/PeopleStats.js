import React from 'react';

import {
  Statistic,
  Icon,
  List,
} from 'semantic-ui-react';

import { colorByPercent } from '../ui'

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
      <List.Item icon='star half outline' content={`${noshow} maybe`} style={{color: 'black'}}/>
      <List.Item icon='star half' content={`${sent} probably`} style={{color: 'black'}}/>
      <List.Item icon='star' content={`${confirmed} made it`} style={{color: 'black'}}/>
    </List>
  </Statistic>
</Statistic.Group>

export default PeopleStats