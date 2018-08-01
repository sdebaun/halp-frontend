import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Icon,
  Panel,
} from '../ui';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import FormProject from './FormProject';
import { PageTitle } from '../layouts';

export const MUTATION_CREATE_PROJECT = gql`
  mutation createProject(
    $title: String!,
    $pitch: String!,
    $sourceGroup: String,
    $needStart: String,
    $needEnd: String,
    $contactMethod: String,
    $contactAddress: String,
    $contactName: String,
    ) {
    createProject(
      title: $title,
      pitch: $pitch,
      sourceGroup: $sourceGroup,
      needStart: $needStart,
      needEnd: $needEnd,
      contactMethod: $contactMethod,
      contactAddress: $contactAddress,
      contactName: $contactName,
    ) @client
  }
`

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
}

const _FormProjectAdd = ({history}) =>
  <Mutation mutation={MUTATION_CREATE_PROJECT} refetchQueries={['AllProjects', 'activeProjects', 'projectCounts']}>
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