import React from 'react';
import { Route } from 'react-router-dom';
import {
  Grid,
  Icon,
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

export const AdminProjectTitle = ({project, linkTo}) =>
  <PageTitle
    linkTo={linkTo}
    left={<Icon name='angle left' />}
    middle={project.title}
    right={<AdminProjectMenu project={project} />}
    />

const AdminProjectDetail = ({project}) =>
  <div>
    <AdminProjectTitle project={project} linkTo='/admin' />
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
  </div>

const AdminProject = ({id}) =>
  <Query query={QUERY_GET_PROJECT} variables={{id}}>
    {({ loading, data: { getProject } }) => {
      if (loading) { return <div>LOADING...</div> }
      return (
        <div>
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


