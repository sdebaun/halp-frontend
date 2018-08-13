import React from 'react';
import { withRouter } from 'react-router-dom';

import { Mutation } from 'react-apollo';
import {
  Grid,
  Segment,
  Header,
} from 'semantic-ui-react';

import FormProject from '../components/FormProject'
import AdminProjectTitle, {QuickNav} from './AdminProjectTitle';
import {
  MUTATION_UPDATE_PROJECT,
  refetchSpecific
} from '../../api/projects';

const _FormProjectUpdate = ({history, project}) =>
  <Mutation mutation={MUTATION_UPDATE_PROJECT} refetchQueries={refetchSpecific(project.id)}>
    {updateProject =>
      <FormProject
        initialValues={project}
        okLabel={'Update'}
        cancelLabel={'Cancel'}
        onSubmit={(values, {setSubmitting, setErrors}) => {
          updateProject({variables: {id: project.id, ...values}})
          .then(({data: {updateProject: result}}) => {
            if (result) {
              console.log('result', result)
              setSubmitting(false)
              history.push(`/admin/project/${project.id}`)
            }
            else {
              setSubmitting(false)
              setErrors({failure: 'I can\'t find anyone with that email and password.'})
            }
          })
        }}
        onCancel={history.goBack}
        >
        </FormProject>
    }
  </Mutation>

const FormProjectUpdate = withRouter(_FormProjectUpdate)

// const AdminProjectEdit = ({project}) =>
//   <div>
//     <AdminProjectTitle project={project} />
//     <Panel>
//     <FormProjectUpdate project={project}/>
//     </Panel>
//   </div>

const AdminProjectEdit = ({project}) =>
<div>
<QuickNav><span style={{color: '#999'}}>EDITING</span></QuickNav>
  <FormProjectUpdate project={project}/>
</div>

// const AdminProjectEdit = ({project}) =>
// <div>
// <Grid stackable>
// <Grid.Row columns={1}>
//   <Grid.Column>
//     <QuickNav project={project}/>
//   </Grid.Column>
// </Grid.Row>
// </Grid>
// <FormProjectUpdate project={project}/>
// </div>

export default AdminProjectEdit