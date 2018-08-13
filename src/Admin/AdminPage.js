import React, { Component } from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import {
  Header,
  Button,
  Menu,
  Icon,
  Label,
} from '../ui';
import { Helmet } from 'react-helmet';
import { LeftMenuLayout, DrawerMenuLayout, ResponsiveSwitcher } from '../layouts';

import { Query } from 'react-apollo';

import AdminList from './AdminList';
import AdminProject from './AdminProject';
import AdminAddProject from './AdminAddProject';
import { QUERY_PROJECT_COUNTS } from '../api/projects';

const ButtonSignOut = () =>
  <Link to='/'>
    <Button fluid basic inverted>sign out</Button>
  </Link>

const ButtonCreateProject = ({nav}) =>
    <Button fluid primary size='huge' onClick={() => nav('/admin/add')}>
      + add project
    </Button>

const MenuItemLabelled = ({nav, label, count, color}) =>
  <Menu.Item name={label} onClick={nav}>
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
      <AdminList filterState='active' />
      } />
    <Route path='/admin/closed' exact render={() =>
      <AdminList filterState='closed'/>
      } />
    <Route path='/admin/old' exact render={() =>
      <AdminList filterState='old'/>
      } />
    <Route path='/admin/add' exact render={() =>
      <AdminAddProject />
      } />
    <Route path='/admin/project/:id' render={({match: {params: {id}}}) =>
      <AdminProject id={id}/>
      } />
  </div>

const AdminMenu = ({nav}) =>
  <Menu inverted vertical fluid>
    <Menu.Item header>
      <Header as="h1" size="huge" textAlign="center" inverted color="grey">
        HALP
      </Header>
    </Menu.Item>
    <Menu.Item>
      <ButtonCreateProject nav={nav}/>
    </Menu.Item>
    <Query query={QUERY_PROJECT_COUNTS}>
      {({loading, data: { projectCounts }}) => {
        if (loading) { return <div>LOADING...</div> }
        return <div>
          <MenuItemLabelled nav={() => nav('/admin')} label='active' color='green' count={projectCounts.active} />
          <MenuItemLabelled nav={() => nav('/admin/closed')} label='closed' color='grey' count={projectCounts.closed} />
          <MenuItemLabelled nav={() => nav('/admin/old')} label='old' color='grey' count={projectCounts.old} />
        </div>
      }}
    </Query>
    <Menu.Item>
      <ButtonSignOut />
    </Menu.Item>
  </Menu>

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
  <DrawerMenuLayout header={({toggle}) => <AdminAppBar toggle={toggle}/>} drawer={({nav}) => <AdminMenu nav={nav}/>} main={<AdminContent />} />

const _AdminPageLarge = ({history}) =>
  <LeftMenuLayout left={<AdminMenu nav={link => history.push(link)}/>} right={<AdminContent />} />

  const AdminPageLarge = withRouter(_AdminPageLarge)

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
