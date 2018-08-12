import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Icon,
  Panel,
} from '../ui';
import { Mutation } from 'react-apollo';

import FormProject from './components/FormProject';
import { PageTitle } from '../layouts';
import { MUTATION_CREATE_PROJECT, refetchAll } from '../api/projects'

const Title = ({project}) =>
  <PageTitle
    left={<Icon name='angle left' />}
    middle='Add Project'
    />

const PROJECT_INITIAL_VALUES = {
  title: '',
  pitch: '',
  sourceGroup: '',
  needStart: '10/25/1974 10:00 AM',
  needEnd: '10/25/1974 4:00 PM',
  contactMethod: '',
  contactAddress: '',
  contactName: '',
  sentPersonsNeeded: '',
}

const _FormProjectAdd = ({history}) =>
  <Mutation mutation={MUTATION_CREATE_PROJECT} refetchQueries={refetchAll}>
    {createProject =>
      <FormProject
        initialValues={PROJECT_INITIAL_VALUES}
        okLabel={'Create'}
        cancelLabel={'Back'}
        onSubmit={(values, {setSubmitting, setErrors}) => {
          createProject({variables: values})
          .then(({data: {createProject: result}}) => {
            if (result) {
              console.log('result', result)
              setSubmitting(false)
              history.push(`/admin/project/${result.id}`)
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

const FormProjectAdd = withRouter(_FormProjectAdd)

const AdminAddProject = ({id}) =>
  <div>
    <Title />
    <Panel>
    <FormProjectAdd />
    </Panel>
  </div>

export default AdminAddProject