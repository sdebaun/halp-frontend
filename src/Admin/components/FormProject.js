import React from 'react';
import {
  Header,
  Form,
  Message,
  Button,
  Segment,
  Grid,
} from 'semantic-ui-react';
import { Formik } from 'formik';
import { string, object, number } from 'yup';

import { FieldInputText, FieldInputTextArea, FieldInputDateTime, FieldSelect } from '../../fields'

const schema = object().shape({
  title: string()
    .max(30, 'The title shouldn\'t be that long, less than 30 letters please!')
    .required('Enter a title.'),
  pitch: string()
    // .max(160, 'The pitch shouldn\'t be longer than a tweet, 160 letters please!')
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

const FormProject = ({children, initialValues, onSubmit, onCancel, okLabel, cancelLabel}) =>
  <Formik
    initialValues={initialValues}
    validationSchema={schema}
    onSubmit={onSubmit}
    >
    {(formik) =>
      <Form onSubmit={formik.handleSubmit}>
        {formik.errors.failure && <Message negative attached="bottom">{formik.errors.failure}</Message>}
        <Grid stackable>
        <Grid.Row columns={2}>
        <Grid.Column>
        {children}
        <Segment>
          <Header as='h3'>Who is this for?</Header>

          <FieldInputText name='sourceGroup' formik={formik} style={{fontSize: '1.5rem'}}
            fluid label='Group' placeholder='BRC Team, Theme Camp, Art Project, or Event' />

          <FieldInputText name='title' formik={formik} style={{fontSize: '2rem'}}
            label='Project' placeholder='What will people be doing?'  />
        </Segment>

        <Segment>
          <Header as='h3'>What is the pitch?</Header>
          <FieldInputTextArea rows={4} name='pitch' formik={formik} style={{fontSize: '1.5rem'}}
            placeholder='Get people excited about this!'  />
        </Segment>

        </Grid.Column>
        <Grid.Column>
          <Segment>
            <Header as='h3'>What do they need?</Header>
            <FieldInputText name='sentPersonsNeeded' formik={formik}
              label='How Many People' placeholder='A number'  />

            <FieldInputDateTime name='needStart' formik={formik}
              label='Start' />

            <FieldInputDateTime name='needEnd' formik={formik}
              label='End' />
          </Segment>
          <Segment>
            <Header as='h3'>Who do we connect volunteers with?</Header>
            <FieldSelect name='contactMethod' formik={formik}
              placeholder='what do you do' fluid  options={contactOptions} />

            <FieldInputText name='contactName' formik={formik}
              label='Who' placeholder='A person or title'  />

            <FieldInputText name='contactAddress' formik={formik}
              label='Location' placeholder='A playa address and name'  />

          </Segment>
        <Button.Group fluid>
          <Button color='green' size='large' type='submit' disabled={formik.isSubmitting}>
            {okLabel}
          </Button>
          <Button.Or />
          <Button size='large' type='button' onClick={onCancel}>{cancelLabel}</Button>
        </Button.Group>
        </Grid.Column>
        </Grid.Row>
        </Grid>
      </Form>
    }
  </Formik>

  export default FormProject
