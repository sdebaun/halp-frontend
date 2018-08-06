import React from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Header,
  Icon,
} from 'semantic-ui-react';
import { Query } from 'react-apollo';
import { QUERY_GET_PROJECT } from '../api/projects';

const HomeProject = ({id}) =>
  <Query query={QUERY_GET_PROJECT} variables={{id}}>
    {({ loading, data: { getProject } }) => {
      if (loading) { return <div>LOADING...</div> }
      return <Grid stackable columns={2}>
        <Grid.Column>
          <Link to='/'>
          <Header as='h2'>
            <Icon name='angle left' />
            {getProject.title}
          </Header>
          </Link>
        </Grid.Column>
        <Grid.Column>
          More Content
        </Grid.Column>
      </Grid>
    }}
  </Query>

export default HomeProject