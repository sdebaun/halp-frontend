import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Grid,
  Sidebar,
  Segment,
  Responsive,
  Header,
} from 'semantic-ui-react';
import { Toggle } from 'react-powerplug';

export const _PageTitle = ({history, linkTo, left, middle, right}) =>
  <Grid verticalAlign='middle' style={{marginTop: 0, marginBottom: 0, backgroundColor:'#DDD'}}>
    <Grid.Column width={13}>
      <a onClick={() => linkTo ? history.push(linkTo) : history.goBack()}>
        <Grid verticalAlign='middle'>
          <Grid.Column width={2}>
            <Header as='h3'>{left}</Header>
          </Grid.Column>
          <Grid.Column width={12}>
            <Header as='h2'>
              {middle}
            </Header>
          </Grid.Column>
        </Grid>
      </a>
    </Grid.Column>
    <Grid.Column width={3} style={{overflowY: 'visible'}}>
      <Header as='h2'>{right}</Header>
    </Grid.Column>
  </Grid>

export const PageTitle = withRouter(_PageTitle)

export const LeftMenuLayout = ({left, right}) =>
  <Grid style={{height: '100%'}}>
    <Grid.Column width={4} style={{height: '100%', backgroundColor: '#000', paddingLeft: '2.5rem'}}>
      {left}
    </Grid.Column>
    <Grid.Column width={12}>
      {right}
    </Grid.Column>
  </Grid>

export const _DrawerMenuLayout = ({history, header, drawer, main}) =>
  <Toggle initial={false} onChange={val => console.log('new toggle', val)}>
    {({on, toggle, set}) =>
      <Sidebar.Pushable>
        <Sidebar as={Segment} inverted visible={on} onHide={() => set(false)} animation='overlay' style={{height: '100%'}}>
          <span style={{color: 'white'}}>ON: {on ? 'ON' :'OFF'}</span>
          {drawer({nav: link => { set(false); history.push(link) }})}
        </Sidebar>
        <Sidebar.Pusher style={{marginTop: '61px'}}>
            {header({toggle})}
            {main}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    }
  </Toggle>

export const DrawerMenuLayout = withRouter(_DrawerMenuLayout)

export const ResponsiveSwitcher = ({mobile, tablet, computer}) =>
  <div style={{height: '100%'}}>
    <Responsive {...Responsive.onlyComputer} style={{height: '100%'}}>{computer}</Responsive>
    <Responsive {...Responsive.onlyTablet} style={{height: '100%'}}>{tablet}</Responsive>
    <Responsive {...Responsive.onlyMobile} style={{height: '100%'}}>{mobile}</Responsive>
  </div>


export const cardsFrom = (CardComponent, items) =>
  items.map((item, idx) => <CardComponent key={idx} item={item}/>)