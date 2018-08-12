import React from 'react';

import {
  Statistic,
  Icon,
} from 'semantic-ui-react';

import { colorByPercent } from '../ui'

const PeopleStats = ({size='mini', sentPersonsNeeded, sentPersonCounts: {sent, confirmed, noshow}}) =>
<Statistic.Group widths="three" size={size}>
  <Statistic>
    <Statistic.Value><Icon name='users'/> {sentPersonsNeeded}</Statistic.Value>
    <Statistic.Label>Requested</Statistic.Label>
  </Statistic>
  <Statistic color={colorByPercent((sent + confirmed) / sentPersonsNeeded)} >
    <Statistic.Value><Icon name='play circle'/> {sent + confirmed}</Statistic.Value>
    <Statistic.Label>Sent</Statistic.Label>
  </Statistic>
  <Statistic color={colorByPercent(confirmed / sentPersonsNeeded)} >
    <Statistic.Value><Icon name='checkmark box'/> {confirmed}</Statistic.Value>
    <Statistic.Label>Confirm</Statistic.Label>
  </Statistic>
</Statistic.Group>

export default PeopleStats