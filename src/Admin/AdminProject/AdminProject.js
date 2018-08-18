import React from 'react';
import { Route } from 'react-router-dom';
import { Query } from 'react-apollo';

import AdminProjectEdit from './AdminProjectEdit';
import AdminProjectView from './AdminProjectView';

import { QUERY_GET_PROJECT, SUBSCRIPTION_PROJECT_CHANGED } from '../../api/projects';

const AdminProject = ({id}) =>
  <Query query={QUERY_GET_PROJECT} variables={{id}}>
    {({ loading, data: { getProject }, subscribeToMore }) => {
      const startSubscriptions = () => {
        subscribeToMore({
          document: SUBSCRIPTION_PROJECT_CHANGED,
          updateQuery: (prev, { subscriptionData }) => {
            // console.log('subscription prev', prev)
            // console.log('subscription data', subscriptionData)
            const { projectChanged } = subscriptionData.data
            const project = prev.getProject
            // console.log('original project', project)
            // console.log('changed project', projectChanged)
            return {
              getProject: projectChanged.id === project.id ? projectChanged : project
            }
          }
        })
      }
      if (loading) { return <div>LOADING...</div> }
      return (
        <div>
          <Route path={`/admin/project/${id}`} exact render={() =>
            <AdminProjectView project={getProject} startSubscriptions={startSubscriptions}/>
          } />
          <Route path={`/admin/project/${id}/edit`} exact render={() =>
            <AdminProjectEdit project={getProject} />
            } />
        </div>
      )
    }}
  </Query>

export default AdminProject


