import React from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Sidebar,
  Segment,
  Responsive,
  Header,
} from 'semantic-ui-react';
import { Toggle } from 'react-powerplug';

export const PageTitle = ({linkTo, left, middle, right}) =>
  <Grid verticalAlign='middle' style={{marginTop: 0, marginBottom: 0, backgroundColor:'#CCC'}}>
    <Grid.Column width={13}>
      <Link to={linkTo}>
        <Grid verticalAlign='middle'>
          <Grid.Column width={2}>
            <Header as='h3'>{left}</Header>
          </Grid.Column>
          <Grid.Column width={10}>
            <Header as='h2'>
              {middle}
            </Header>
          </Grid.Column>
        </Grid>
      </Link>
    </Grid.Column>
    <Grid.Column float='right' width={3} style={{overflowY: 'visible'}}>
      {right}
    </Grid.Column>
  </Grid>

export const LeftMenuLayout = ({left, right}) =>
  <Grid style={{height: '100%'}}>
    <Grid.Column width={4} style={{height: '100%', backgroundColor: '#000', paddingLeft: '2.5rem'}}>
      {left}
    </Grid.Column>
    <Grid.Column width={12}>
      {right}
    </Grid.Column>
  </Grid>

export const DrawerMenuLayout = ({header, drawer, main}) =>
  <Toggle initial={false}>
    {({on, toggle}) =>
      <Sidebar.Pushable>
        <Sidebar as={Segment} inverted visible={on} onHide={toggle} animation='overlay' style={{height: '100%'}}>
          {drawer}
        </Sidebar>
        <Sidebar.Pusher style={{marginTop: '61px'}}>
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