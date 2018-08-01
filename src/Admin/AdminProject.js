import React from 'react';
import { Route } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import AdminProjectEdit from './AdminProjectEdit';
import AdminProjectDetail from './AdminProjectDetail';

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
      contactMethod
      contactAddress
      contactName
    }
  }
`

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


