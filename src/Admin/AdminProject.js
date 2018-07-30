import React from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Header,
  Icon,
} from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import AdminProjectMenu from './AdminProjectMenu';

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
const TitleBar = ({project}) =>
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

const AdminProject = ({id}) =>
  <Query query={QUERY_GET_PROJECT} variables={{id}}>
    {({ loading, data: { getProject } }) => {
      if (loading) { return <div>LOADING...</div> }
      return (
        <div>
          <TitleBar project={getProject} />
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
      )
    }}
  </Query>

export default AdminProject