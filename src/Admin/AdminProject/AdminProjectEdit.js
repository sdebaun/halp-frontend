import React from 'react';
import { withRouter } from 'react-router-dom';

import { Mutation } from 'react-apollo';

import FormProject from '../components/FormProject'
import {QuickNav} from './AdminProjectTitle';
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

const AdminProjectEdit = ({project}) =>
<div>
<QuickNav><span style={{color: '#999'}}>EDITING</span></QuickNav>
  <FormProjectUpdate project={project}/>
</div>

export default AdminProjectEdit