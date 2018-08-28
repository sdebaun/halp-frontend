import React from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';

import FormProject from './components/FormProject';
import { MUTATION_CREATE_PROJECT, refetchAll } from '../api/projects'
import { QuickNav } from './AdminProject/AdminProjectTitle'
import moment from 'moment';

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

const initialValues = () => ({
  ...PROJECT_INITIAL_VALUES,
  needStart: moment().format(moment.HTML5_FMT.DATETIME_LOCAL),
  needEnd: moment().add(1,'h').format(moment.HTML5_FMT.DATETIME_LOCAL),
})

const _FormProjectAdd = ({history}) =>
  <Mutation mutation={MUTATION_CREATE_PROJECT} refetchQueries={refetchAll}>
    {createProject =>
      <FormProject
        initialValues={initialValues()}
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
        >
        </FormProject>
    }
  </Mutation>

const FormProjectAdd = withRouter(_FormProjectAdd)

const AdminAddProject = ({id}) =>
<div>
  <QuickNav><span style={{color: '#999'}}>ADDING VO</span></QuickNav>
  <FormProjectAdd/>
</div>

export default AdminAddProject