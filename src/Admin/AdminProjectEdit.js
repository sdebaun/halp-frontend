import React from 'react';
import { withRouter } from 'react-router-dom';

import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import FormProject from './FormProject'

export const MUTATION_UPDATE_PROJECT = gql`
  mutation updateProject(
    $id: String!
    $title: String!,
    $pitch: String!,
    $sourceGroup: String,
    $needStart: String,
    $needEnd: String,
    $contactMethod: String,
    $contactAddress: String,
    $contactName: String,
    ) {
    updateProject(
      id: $id
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

const _FormProjectUpdate = ({history, project}) =>
  <Mutation mutation={MUTATION_UPDATE_PROJECT} refetchQueries={['AllProjects', 'activeProjects', 'projectCounts']}>
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
  <FormProjectUpdate project={project}/>

export default AdminProjectEdit