import React from 'react'
import {
  Card,
  Icon,
  Grid,
  Header,
  Button,
  Menu,
  Label,
  Progress,
} from 'semantic-ui-react'

const CardGroup = Card.Group

const Panel = ({children}) =>
  <Grid><Grid.Column>{children}</Grid.Column></Grid>

export const colorByPercent = percent => {
    if (percent >= 100) { return 'green' }
    if (percent >= 75) { return 'olive' }
    if (percent >= 50) { return 'yellow' }
    if (percent >= 25) { return 'orange' }
    return 'red'
  }

export {
  Card,
  CardGroup,
  Icon,
  Panel,
  Header,
  Button,
  Menu,
  Label,
  Progress,
}