import React from 'react';

import {
  Statistic,
  Icon,
} from 'semantic-ui-react';


const colorByPercent = percent => {
  if (percent >= 1) { return 'green' }
  if (percent >= 0.75) { return 'olive' }
  if (percent >= 0.5) { return 'yellow' }
  if (percent >= 0.25) { return 'orange' }
  return 'red'
}

const PeopleStats = ({sentPersonsNeeded, sentPersonCounts: {sent, confirmed, noshow}}) =>
<Statistic.Group width="three" size='tiny'>
  <Statistic>
    <Statistic.Value><Icon name='users'/> {sentPersonsNeeded}</Statistic.Value>
    <Statistic.Label>Needed</Statistic.Label>
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