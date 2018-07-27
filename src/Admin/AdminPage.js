import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import {
  Header,
  Button,
  Menu,
  Icon,
  Label,
} from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import { LeftMenuLayout, DrawerMenuLayout, ResponsiveSwitcher } from '../layouts';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import AdminCards from './AdminCards';
import AdminProject from './AdminProject';
import AdminAddProject from './AdminAddProject';

import { QUERY_GET_PROJECT } from './AdminProject';

export const QUERY_PROJECT_COUNTS = gql`
  query projectCounts {
    projectCounts @client
  }
`

const ButtonSignOut = () =>
  <Link to='/'>
    <Button fluid basic inverted>sign out</Button>
  </Link>

const ButtonCreateProject = () =>
  <Link to='/admin/add'>
    <Button fluid primary size='huge'>
      + add project
    </Button>
  </Link>

const MenuItemLabelled = ({label, count, color}) =>
  <Menu.Item name={label}>
    <Label color={color}>{count}</Label>
    {label}
  </Menu.Item>

const AdminHelmet = () =>
  <Helmet>
    <title>Admin : HALP</title>
  </Helmet>

const AdminContent = () =>
  <div>
    <Route path='/admin' exact render={() =>
      <AdminCards />
      } />
    <Route path='/admin/add' exact render={() =>
      <AdminAddProject />
      } />
    <Route path='/admin/project/:id' render={({match: {params: {id}}}) =>
      <AdminProject id={id}/>
      } />
  </div>

const AdminMenu = () =>
  <Menu inverted vertical fluid>
    <Menu.Item header>
      <Header as="h1" size="huge" textAlign="center" inverted color="grey">
        HALP
      </Header>
    </Menu.Item>
    <Menu.Item>
      <ButtonCreateProject />
    </Menu.Item>
    <Query query={QUERY_PROJECT_COUNTS}>
      {({loading, data: { projectCounts }}) => {
        if (loading) { return <div>LOADING...</div> }
        return <div>
          <MenuItemLabelled label='active' color='green' count={projectCounts.active} />
          <MenuItemLabelled label='closed' color='grey' count={projectCounts.closed} />
          <MenuItemLabelled label='old' color='grey' count={projectCounts.old} />
        </div>
      }}
    </Query>
    <Menu.Item>
      <ButtonSignOut />
    </Menu.Item>
  </Menu>

// const AdminMenu = () =>
//   <Menu inverted vertical fluid>
//     <Menu.Item header>
//       <Header as="h1" size="huge" textAlign="center" inverted color="grey">
//         HALP
//       </Header>
//     </Menu.Item>
//     <Menu.Item>
//       <ButtonCreateProject />
//     </Menu.Item>
//     <Query query={QUERY_PROJECT_COUNTS}>
//       {({loading, data: { projectCounts }}) => {
//         if (loading) { return <div>LOADING...</div> }
//         return <div>
//           <MenuItemLabelled label='active' color='green' count={projectCounts.active} />
//           <MenuItemLabelled label='closed' color='grey' count={projectCounts.closed} />
//           <MenuItemLabelled label='old' color='grey' count={projectCounts.old} />
//         </div>
//       }}
//     </Query>
//     <Menu.Item>
//       <ButtonSignOut />
//     </Menu.Item>
//   </Menu>

const AdminAppBar = ({toggle}) =>
  <Menu fixed='top' inverted>
    <Menu.Item>
      <Button icon onClick={toggle}><Icon name='sidebar' /></Button>
    </Menu.Item>
    <Menu.Item position='right'>
      <ButtonSignOut />
    </Menu.Item>
  </Menu>

const AdminPageMobile = () =>
  <DrawerMenuLayout header={({toggle}) => <AdminAppBar toggle={toggle}/>} drawer={<AdminMenu />} main={<AdminContent />} />

const AdminPageLarge = () =>
  <LeftMenuLayout left={<AdminMenu />} right={<AdminContent />} />

class AdminPage extends Component {
  static async getInitialProps({ req, res, match, history, location, ...ctx }) {
    return { whatever: 'stuff', customThing: ctx.customThing };
  }

  render() {
    return (
      <div style={{height: '100%'}}>
        <AdminHelmet />
        <ResponsiveSwitcher
          mobile={<AdminPageMobile />}
          tablet={<AdminPageLarge />}
          computer={<AdminPageLarge />}
          />
      </div>      
    )
  }
}

export default AdminPage;
