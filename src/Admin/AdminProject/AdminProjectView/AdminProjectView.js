import React from 'react';

import {
  Grid,
} from 'semantic-ui-react';

import AdminProjectTitle from '../AdminProjectTitle';
import TimeRange from '../../../components/TimeRange';
import PeopleStats from '../../../components/PeopleStats';
import SentPersons from './SentPersons';
import Details from './Details';

import DeliveryMethod from '../../../components/DeliveryMethod';
import DeliveryContact from '../../../components/DeliveryContact';

const AdminProjectView = ({project}) =>
  <div>
    <AdminProjectTitle project={project} linkTo='/admin' />
    <Grid stackable>
      <Grid.Row columns={2}>
        <Grid.Column>
          <p style={{fontSize: '1.5rem', fontWeight: 200}}>{project.pitch}</p>
          <TimeRange {...project} />
          <Details {...project} />
        </Grid.Column>
        <Grid.Column>
          <PeopleStats size='tiny' {...project} />
          <DeliveryMethod {...project} />
          <DeliveryContact {...project} />
          <SentPersons {...project} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>

export default AdminProjectView


