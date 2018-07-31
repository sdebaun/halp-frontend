import React from 'react';
import { Link, Route } from 'react-router-dom';
import {
  Grid,
  Header,
  Icon,
  Menu,
} from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import AdminProjectMenu from './AdminProjectMenu';
import AdminProjectEdit from './AdminProjectEdit';
import { PageTitle } from '../layouts';

export const QUERY_GET_PROJECT = gql`
  query getProject($id: Number!) {
    getProject(id: $id) @client {
      id
      title
      sourceGroup
      pitch
      needStart
      needEnd
      state
    }
  }
`

export const AdminProjectTitle = ({project}) =>
  <PageTitle
    linkTo='/admin'
    left={<Icon name='angle left' />}
    middle={project.title}
    right={<AdminProjectMenu project={project} />}
    />

export const xxAdminProjectTitle = ({project}) =>
  <Grid verticalAlign='middle' style={{marginTop: 0, backgroundColor:'#CCC'}}>
    <Grid.Column width={13}>
      <Link to='/admin'>
        <Grid verticalAlign='middle'>
          <Grid.Column width={2}>
            <Header as='h3'><Icon name='angle left' /></Header>
          </Grid.Column>
          <Grid.Column width={10}>
            <Header as='h2'>
              {project.title}
            </Header>
          </Grid.Column>
        </Grid>
      </Link>
    </Grid.Column>
    <Grid.Column float='right' width={3} style={{overflowY: 'visible'}}>
      <AdminProjectMenu project={project} />
    </Grid.Column>
  </Grid>

        

export const xAdminProjectTitle = ({project}) =>
  <Grid>
    <Grid.Row columns='equal'>
    <Grid.Column width={3}>
      <Link to='/admin'>
        <Icon name='angle left' />
      </Link>
    </Grid.Column>
    <Grid.Column>
      <Link to='/admin'>
        <Header as='h2'>
          {project.title}
        </Header>
      </Link>
    </Grid.Column>
    <Grid.Column float='right' width={3} style={{overflowY:'visible'}}>
      <AdminProjectMenu project={project} />
    </Grid.Column>
    </Grid.Row>
  </Grid>

export const MenuAdminProjectTitle = ({project}) =>
  <Menu text borderless width={3}>
    <Menu.Item as={Link} to='/admin'>
      <h3>
      <Icon size='large' name='angle left' />
      {project.title}
      </h3>
    </Menu.Item>
    <Menu.Item>
      {/* <h3>{project.title}</h3> */}
      {/* <Header inverted as='h3'>
        {project.title}
      </Header> */}
    </Menu.Item>
    <Menu.Item position='right'>
      <AdminProjectMenu project={project} />
    </Menu.Item>
  </Menu>

const AdminProjectDetail = ({project}) =>
  <Grid stackable>
    <Grid.Row columns={2}>
      <Grid.Column>
        Content A
      </Grid.Column>
      <Grid.Column>
        Content B
      </Grid.Column>
    </Grid.Row>
  </Grid>

const AdminProject = ({id}) =>
  <Query query={QUERY_GET_PROJECT} variables={{id}}>
    {({ loading, data: { getProject } }) => {
      if (loading) { return <div>LOADING...</div> }
      return (
        <div>
          <AdminProjectTitle project={getProject} />
          <Grid><Grid.Column>

          <Route path={`/admin/project/${id}`} exact render={() =>
            <AdminProjectDetail project={getProject} />
          } />
          <Route path={`/admin/project/${id}/edit`} exact render={() =>
            <AdminProjectEdit project={getProject} />
            } />
      </Grid.Column></Grid>
        </div>
      )
    }}
  </Query>

export default AdminProject


