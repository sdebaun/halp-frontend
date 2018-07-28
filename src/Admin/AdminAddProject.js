import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import {
  Header,
  Icon,
  Form,
  Message,
  Button,
  Container,
} from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Formik } from 'formik';
import { string, object } from 'yup';

import { FieldInputText, FieldInputDateTime, FieldSelect } from '../fields'

const MUTATION_CREATE_PROJECT = gql`
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

const schema = object().shape({
  title: string()
    .max(30, 'The title shouldn\'t be that long, less than 30 letters please!')
    .required('Enter a title.'),
  pitch: string()
    .max(160, 'The pitch shouldn\'t be longer than a tweet, 160 letters please!')
    .required('Enter a pitch.'),
  // sourceGroup: string()
  //   .max(30, 'The source shouldn\'t be longer than 30 letters.')
  //   .required('Enter a source.'),
  // needStart: string().required(),
  // needEnd: string().required(),
  // contactMethod: string().required(),
  // contactAddress: string().required(),
  // contactName: string().required(),
})

const contactOptions = [
  {
    key: 1,
    text: 'Contact to schedule a shift',
    value: 'SCHEDULE',
  },
  {
    key: 2,
    text: 'Just show up',
    value: 'WALKUP',
  }
]

const _FormAddProject = ({history}) =>
  <Mutation mutation={MUTATION_CREATE_PROJECT} refetchQueries={['AllProjects', 'activeProjects']}>
    {createProject =>
      <Formik
      initialValues={{title: '', pitch: '', sourceGroup: '', needStart: '', needEnd: '', contactMethod: '', contactAddress: '', contactName: ''}}
      validationSchema={schema}
      onSubmit={(values, {setSubmitting, setErrors}) => {
        console.log('values', values)
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
      }}>
      {(formik) =>
        <Container>
        <Form onSubmit={formik.handleSubmit}>
          {formik.errors.failure && <Message negative attached="bottom">{formik.errors.failure}</Message>}
          <Header as='h3'>Who needs HALP?</Header>

          <FieldInputText name='sourceGroup' formik={formik}
            fluid label='Project Source' placeholder='The group that needs help' />

          <Header as='h3'>What HALP do they need?</Header>

          <FieldInputText name='title' formik={formik}
             label='Project Title' placeholder='A short, concise description'  />

          <FieldInputText name='pitch' formik={formik}
             label='The Pitch' placeholder='Get people excited about this!'  />

          <Header as='h3'>When do they need HALP?</Header>

          <FieldInputDateTime name='needStart' formik={formik}
            label='Start' />

          <FieldInputDateTime name='needEnd' formik={formik}
            label='Start' />

          <Header as='h3'>How do we connect HALPers?</Header>

          <FieldSelect name='contactMethod' formik={formik}
            placeholder='what do you do' fluid  options={contactOptions} />

          <FieldInputText name='contactAddress' formik={formik}
             label='Location' placeholder='A playa address and name'  />

          <FieldInputText name='contactName' formik={formik}
             label='Who' placeholder='A person or title'  />

          <Button.Group fluid>
            <Button color='green' size='large' type='submit' disabled={formik.isSubmitting}>
              add
            </Button>
            <Button.Or />
            <Button size='large' type='button' onClick={history.goBack}>cancel</Button>
          </Button.Group>
        </Form>
        </Container>
      }
      </Formik>
    }
  </Mutation>

const FormAddProject = withRouter(_FormAddProject)

const AdminAddProject = ({id}) =>
  <div>
    <Title />
    <FormAddProject />
  </div>

export default AdminAddProject