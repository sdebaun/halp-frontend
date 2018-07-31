import React from 'react';
import {
  Grid,
} from 'semantic-ui-react';

import AdminProjectTitle from './AdminProjectTitle';

const DELIVERY_METHOD_LABEL = {
  SCHEDULE: 'Schedule a Shift With',
  WALKUP: 'Walk up when needed'
}

const AdminProjectDetail = ({project}) =>
  <div>
    <AdminProjectTitle project={project} linkTo='/admin' />
    <Grid stackable>
      <Grid.Row columns={2}>
        <Grid.Column>
          <h3>{project.sourceGroup}</h3>
          <span>{project.needStart}</span>
          <span>{project.needEnd}</span>
          <p style={{fontSize: '1.5rem', fontWeight: 200}}>{project.pitch}</p>
          <h3>Needs</h3>
          <p>add a need</p>
        </Grid.Column>
        <Grid.Column>
          <h4>Deliver To</h4>
          Method: {DELIVERY_METHOD_LABEL[project.contactMethod]}
          Where: {project.contactAddress}
          Name: {project.contactName}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>

export default AdminProjectDetail


