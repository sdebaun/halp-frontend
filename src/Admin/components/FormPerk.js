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
  text: string()
    .max(160, 'The pitch shouldn\'t be longer than a tweet, 160 letters please!')
    .required('Describe the skill, thing, or attitude.'),
})

const FormPerk = ({initialValues, onSubmit, onCancel, okLabel, cancelLabel}) =>
  <Formik
    initialValues={initialValues}
    validationSchema={schema}
    onSubmit={onSubmit}
    >
    {(formik) =>
      <Form onSubmit={formik.handleSubmit}>
        {formik.errors.failure && <Message negative attached="bottom">{formik.errors.failure}</Message>}

        <FieldInputText name='text' formik={formik}
          fluid label='Add Perk' placeholder='A thing the volunteer gets' />

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

  export default FormPerk
