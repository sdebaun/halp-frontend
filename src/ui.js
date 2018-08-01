import React from 'react'
import {
  Card,
  Icon,
  Grid,
  Header,
  Button,
  Menu,
  Label,
} from 'semantic-ui-react'

const CardGroup = Card.Group

const Panel = ({children}) =>
  <Grid><Grid.Column>{children}</Grid.Column></Grid>

export {
  Card,
  CardGroup,
  Icon,
  Panel,
  Header,
  Button,
  Menu,
  Label,
}