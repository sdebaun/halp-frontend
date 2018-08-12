import React from 'react';
import {
  Form,
  Message,
  Button,
} from 'semantic-ui-react';
import { Formik } from 'formik';
import { string, object } from 'yup';

import { FieldInputText } from '../../fields'

const schema = object().shape({
  name: string()
    .max(80, 'Do they really need a name larger than 80 letters?')
    .required('What\'s their playa name?'),
  email: string()
    .email()
})

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
          fluid label='Playa Name' placeholder='What crazy name do they go by' />

        <FieldInputText name='email' formik={formik}
          fluid label='Email (optional)' placeholder='If we get the email they use for burner profiles, we can send them a thank you card!' />

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
