import React from 'react';
import {
  Form,
  Message,
  Button,
  Icon,
} from 'semantic-ui-react';
import { Formik } from 'formik';
import { string, object } from 'yup';

import { FieldInputText, FieldRadio } from '../../fields'

const schema = object().shape({
  name: string()
    .max(80, 'Do they really need a name larger than 80 letters?')
    .required('What\'s their playa name?'),
  email: string()
    .email(),
  state: string()
    .required('Are they a maybe or a probably?')
})

const RadioLabel = ({label, icon, color}) =>
  <span>
    <Icon name={icon} color={color}/>
    <span style={{color: '#EEE'}}>{label}</span>
  </span>

const MaybeLabel = () =>
  <RadioLabel label='Maybe Showing Up' icon='star half outline' color='yellow'/>

const ProbablyLabel = () =>
  <RadioLabel label='Probably Showing Up' icon='star outline' color='yellow'/>

const WhiteLabel = ({children}) =>
  <span style={{color: 'white', fontSize: '1.25rem', lineHeight: '2rem'}}>{children}</span>

const FormDetail = ({initialValues, onSubmit, onCancel, okLabel, cancelLabel}) =>
  <Formik
    initialValues={initialValues}
    validationSchema={schema}
    onSubmit={onSubmit}
    >
    {(formik) =>
      <Form onSubmit={formik.handleSubmit}>
        {formik.errors.failure && <Message negative attached="bottom">{formik.errors.failure}</Message>}

        <FieldInputText name='name' formik={formik}
          fluid label={<WhiteLabel>Who are you sending?</WhiteLabel>} placeholder='What crazy name do they go by' />
        <br/>
        <Form.Group inline style={{lineHeight: '2rem'}}>
          <FieldRadio name='state' label={{children: <MaybeLabel />}} value='noshow' formik={formik} style={{fontSize: '1.25rem'}}/>
          <span style={{padding: '0 20px'}}/>
          <FieldRadio name='state' label={{children: <ProbablyLabel/>}} value='sent' formik={formik} style={{fontSize: '1.25rem'}}/>
        </Form.Group>
  
        <FieldInputText name='email' formik={formik}
          fluid label={<WhiteLabel>Email (optional)</WhiteLabel>} placeholder='If we get the email they use for burner profiles, we can send them a thank you card!' />
        <br/>
        <Button.Group fluid>
          <Button color='green' size='large' type='submit' disabled={formik.isSubmitting}>
            {okLabel}
          </Button>
          <Button.Or />
          <Button size='large' type='button' onClick={onCancel}>{cancelLabel}</Button>
        </Button.Group>
      </Form>
    }
  </Formik>

  export default FormDetail
