import React from 'react';
import {
  Grid,
  Sidebar,
  Segment,
  Responsive,
} from 'semantic-ui-react';
import { Toggle } from 'react-powerplug';

export const LeftMenuLayout = ({left, right}) =>
  <Grid>
    <Grid.Column width={4} style={{backgroundColor: '#000', paddingLeft: '2.5rem'}}>
      {left}
    </Grid.Column>
    <Grid.Column as={Segment} width={12}>
      {right}
    </Grid.Column>
  </Grid>

export const DrawerMenuLayout = ({header, drawer, main}) =>
  <Toggle initial={false}>
    {({on, toggle}) =>
      <Sidebar.Pushable>
        <Sidebar as={Segment} inverted visible={on} onHide={toggle} animation='overlay'>
          {drawer}
        </Sidebar>
        <Sidebar.Pusher style={{marginTop: '5rem'}}>
            {header({toggle})}
            {main}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    }
  </Toggle>

export const ResponsiveSwitcher = ({mobile, tablet, computer}) =>
  <div style={{height: '100%'}}>
    <Responsive {...Responsive.onlyComputer} style={{height: '100%'}}>{computer}</Responsive>
    <Responsive {...Responsive.onlyTablet} style={{height: '100%'}}>{tablet}</Responsive>
    <Responsive {...Responsive.onlyMobile} style={{height: '100%'}}>{mobile}</Responsive>
  </div>


export const cardsFrom = (CardComponent, items) =>
  items.map((item, idx) => <CardComponent key={idx} item={item}/>)