import React from 'react';
import { Link, Route } from 'react-router-dom';
import {
  Grid,
  Header,
  Icon,
} from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import AdminProjectMenu from './AdminProjectMenu';
import AdminProjectEdit from './AdminProjectEdit';

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
  <Grid columns={2} style={{overflow:'visible'}}>
    <Grid.Column>
      <Link to='/admin'>
        <Header as='h2'>
          <Icon name='angle left' />
          {project.title}
        </Header>
      </Link>
    </Grid.Column>
    <Grid.Column style={{overflow:'visible'}}>
      <AdminProjectMenu project={project} />
    </Grid.Column>
  </Grid>

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
          <Route path={`/admin/project/${id}`} exact render={() =>
            <AdminProjectDetail project={getProject} />
          } />
          <Route path={`/admin/project/${id}/edit`} exact render={() =>
            <AdminProjectEdit project={getProject} />
            } />
        </div>
      )
    }}
  </Query>

export default AdminProject


