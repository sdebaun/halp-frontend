import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import {
  Header,
  Icon,
} from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import FormProject from './FormProject'

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
      contactName: $contactName,
    ) @client
  }
`

const Title = () =>
  <div>
    <Link to='/admin'>
      <Header as='h2'>
        <Icon name='angle left' />
        Add Project
      </Header>
    </Link>
  </div>

const PROJECT_INITIAL_VALUES = {
  title: '',
  pitch: '',
  sourceGroup: '',
  needStart: '',
  needEnd: '',
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
    <FormProjectAdd />
  </div>

export default AdminAddProject