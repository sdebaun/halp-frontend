import React from 'react';
import {
  Header,
  Form,
  Message,
  Button,
  Container,
} from 'semantic-ui-react';
import { Formik } from 'formik';
import { string, object, number } from 'yup';

import { FieldInputText, FieldInputDateTime, FieldSelect } from '../fields'

const schema = object().shape({
  title: string()
    .max(30, 'The title shouldn\'t be that long, less than 30 letters please!')
    .required('Enter a title.'),
  pitch: string()
    .max(160, 'The pitch shouldn\'t be longer than a tweet, 160 letters please!')
    .required('Enter a pitch.'),
  sourceGroup: string()
    .max(30, 'The source shouldn\'t be longer than 30 letters.')
    .required('Enter a source.'),
  needStart: string().required(),
  needEnd: string().required(),
  contactMethod: string().required(),
  contactAddress: string().required(),
  contactName: string().required(),
  sentPersonsNeeded: number().integer().required(),
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

const FormProject = ({initialValues, onSubmit, onCancel, okLabel, cancelLabel}) =>
  <Formik
    initialValues={initialValues}
    validationSchema={schema}
    onSubmit={onSubmit}
    >
    {(formik) =>
      <Container>
      <Form onSubmit={formik.handleSubmit}>
        {formik.errors.failure && <Message negative attached="bottom">{formik.errors.failure}</Message>}
        <Header as='h3'>Who needs HALP?</Header>

        <FieldInputText name='sourceGroup' formik={formik}
          fluid label='Project Source' placeholder='The group that needs help' />

        <Header as='h3'>What HALP do they need?</Header>

        <FieldInputText name='sentPersonsNeeded' formik={formik}
          label='How Many People' placeholder='A number'  />

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
            {okLabel}
          </Button>
          <Button.Or />
          <Button size='large' type='button' onClick={onCancel}>{cancelLabel}</Button>
        </Button.Group>
      </Form>
      </Container>
    }
  </Formik>

  export default FormProject
