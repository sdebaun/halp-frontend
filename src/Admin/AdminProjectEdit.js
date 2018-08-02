import React from 'react';
import { withRouter } from 'react-router-dom';

import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import {
  Panel
} from '../ui';

import FormProject from './FormProject'
import AdminProjectTitle from './AdminProjectTitle';
import { MUTATION_UPDATE_PROJECT, refetchQueries } from '../api/projects';

const _FormProjectUpdate = ({history, project}) =>
  <Mutation mutation={MUTATION_UPDATE_PROJECT} refetchQueries={refetchQueries}>
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
        />
    }
  </Mutation>

const FormProjectUpdate = withRouter(_FormProjectUpdate)

const AdminProjectEdit = ({project}) =>
  <div>
    <AdminProjectTitle project={project} />
    <Panel>
    <FormProjectUpdate project={project}/>
    </Panel>
  </div>

export default AdminProjectEdit