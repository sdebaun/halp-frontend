import React from 'react';
import { Route } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import AdminProjectEdit from './AdminProjectEdit';
import AdminProjectDetail from './AdminProjectDetail';

import { QUERY_GET_PROJECT } from '../api/projects';

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


