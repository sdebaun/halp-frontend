import React from 'react';
import {
  Form,
  Message,
  Dropdown,
} from 'semantic-ui-react';

export const FieldWithMessage = ({children, touched, error}) =>
  <div>
    {children}
    {touched && error && <Message negative attached='bottom'>{error}</Message>}
  </div>

export const FormikField = ({Klass, name, formik: {values, touched, errors, handleChange, handleBlur}, ...otherProps}) =>
  <FieldWithMessage touched={touched[name]} error={errors[name]}>
    <Klass name={name} {...otherProps} onChange={handleChange} onBlur={handleBlur} value={values[name]}/>
  </FieldWithMessage>

export const FieldInputText = props =>
  <FormikField type='text' Klass={Form.Input} {...props} />

export const FieldInputDateTime = props =>
  <FormikField type='datetime-local' Klass={Form.Input} {...props} />

export const FieldSelect = ({Klass, formik: {handleBlur, handleChange, setFieldValue, setFieldTouched, ...formik}, ...props}) =>
  <FormikField Klass={Dropdown} selection {...props} formik={{
    handleChange: (e,{value}) => setFieldValue(props.name, value),
    handleBlur: e => setFieldTouched(props.name, true),
    ...formik
    }}/>

export const FieldRadio = props =>
    <FormikField Klass={Form.Radio} {...props}
      checked={props.formik.values[props.name]===props.value}
      formik={{
        ...props.formik,
        handleChange: () => {
          console.log(props.name, props.value)
          props.formik.setFieldValue(props.name, props.value)
        },
        handleBlur: e => props.formik.setFieldTouched(props.name, true),
        }}/>
