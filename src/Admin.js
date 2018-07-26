import React, { Component } from 'react';
import {
  Header,
  Button,
  Image,
  Grid,
  Responsive,
  Card,
  Menu,
  Container,
  Sidebar,
  Segment,
  Icon,
  Label,
} from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import { Toggle } from 'react-powerplug';

const LeftMenuLayout = ({left, right}) =>
  <Grid>
    <Grid.Column width={4} style={{backgroundColor: '#000', paddingLeft: '3rem'}}>
      {left}
    </Grid.Column>
    <Grid.Column width={12}>
      {right}
    </Grid.Column>
  </Grid>

const DrawerMenuLayout = ({header, drawer, main}) =>
  <Toggle initial={false}>
    {({on, toggle}) =>
      <Sidebar.Pushable>
        <Sidebar as={Segment} inverted visible={on} onHide={toggle} animation='overlay'>
          {drawer}
        </Sidebar>
        <Sidebar.Pusher style={{marginTop: '4rem'}}>
            {header({toggle})}
            {main}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    }
  </Toggle>

const AdminHelmet = () =>
  <Helmet>
    <title>Admin : HALP</title>
  </Helmet>

const AdminCard = () =>
  <Card fluid={true}>
    <Card.Content header='Card Header' />
  </Card>

const AdminCards = ({cols}) =>
  <Card.Group itemsPerRow={cols}>
    <AdminCard />
  </Card.Group>

// const AdminPage = () =>
//   <LeftMenuLayout left={<AdminTitle />} right={<AdminCards cols={3} />} />

const AdminHeader = () =>
  <Header as="h1" size="huge" textAlign="center" inverted color="grey">
    HALP
  </Header>

const AdminMenu = () =>
  <Menu inverted vertical fluid>
    <Menu.Item>
      <ButtonCreateProject />
    </Menu.Item>
    <Menu.Item name='active'>
      <Label color='green'>1</Label>
      active
    </Menu.Item>
    <Menu.Item name='closed'>
    <Label color='grey'>0</Label>
      closed
    </Menu.Item>
    <Menu.Item name='old'>
      <Label color='grey'>0</Label>
      old
    </Menu.Item>
    <Menu.Item>
      <Button fluid basic inverted>sign out</Button>
    </Menu.Item>
  </Menu>

const AdminNav = () =>
  <div style={{paddingBottom: '2rem'}}>
    <AdminHeader />
    <AdminMenu />
  </div>

const AdminAppBar = ({toggle}) =>
  <Menu fixed='top' inverted>
    <Menu.Item>
      <Button icon onClick={toggle}><Icon name='sidebar' /></Button>
    </Menu.Item>
    <Menu.Item position='right'>
      <Button basic inverted>sign out</Button>
    </Menu.Item>
  </Menu>

const AdminDrawer = () =>
  <div>
    <AdminHeader />
    <AdminMenu />
  </div>

const ButtonCreateProject = () =>
    <Button fluid primary size='huge'>
      + add project
    </Button>

const AdminPageMobile = () =>
  <DrawerMenuLayout header={({toggle}) => <AdminAppBar toggle={toggle}/>} drawer={<AdminDrawer />} main={<AdminCards cols={1} />} />

const AdminPageLarge = ({cols}) =>
  <LeftMenuLayout left={<AdminNav />} right={<AdminCards cols={cols} />} />

const AdminPageResponsive = () =>
  <div>
    <AdminHelmet />
    <Responsive as={AdminPageLarge} cols={3} {...Responsive.onlyComputer} />
    <Responsive as={AdminPageLarge} cols={2} {...Responsive.onlyTablet} />
    <Responsive as={AdminPageMobile} {...Responsive.onlyMobile} />
  </div>

class AdminRoute extends Component {
  static async getInitialProps({ req, res, match, history, location, ...ctx }) {
    return { whatever: 'stuff', customThing: ctx.customThing };
  }

  render() {
    return <AdminPageResponsive />
  }
}

export default AdminRoute;
