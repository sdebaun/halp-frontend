import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import {
  Form,
  Button,
  Grid,
  Header,
  Segment,
  Message,
} from 'semantic-ui-react';
import { Formik } from 'formik';
import { string, object } from 'yup';

const MUTATION_SIGNIN_USER = gql`
  mutation signinUser($email: String!, $password: String!) {
    signinUser(email: $email, password: $password) @client
  }
`

const SigninPanel = ({children}) =>
  <Grid textAlign='center' style={{height: '100%', backgroundColor: '#000', paddingLeft: '1rem'}} verticalAlign='middle'>
    <Grid.Column style={{maxWidth: 450}}>
      <Segment style={{backgroundColor: '#CCC'}}>
        <Header as="h1" size="huge" textAlign="center"  color="black">
          work for<br/>the man
        </Header>
        {children}
      </Segment>
    </Grid.Column>
  </Grid>

const schema = object().shape({
  email: string().email('Enter a valid email.').required('Enter an email.'),
  password: string().min(3, 'Enter a password of at least 3 characters.').required('Enter a password.')
})

const _SigninPage = ({history}) =>
  <Mutation mutation={MUTATION_SIGNIN_USER}>
    {signinUser =>
      <SigninPanel>
        <Formik
          initialValues={{email: '', password: ''}}
          validationSchema={schema}
          onSubmit={(values, {setSubmitting, setErrors}) => {
            signinUser({variables: values})
              .then(({data: {signinUser: result}}) => {
                if (result) {
                  setSubmitting(false)
                  history.push('/admin')
                }
                else {
                  setSubmitting(false)
                  setErrors({failure: 'I can\'t find anyone with that email and password.'})
                }
              })
          }}>
          {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, isValid}) =>
            <Form onSubmit={handleSubmit}>
              {!errors.failure && <Message info attached="bottom">Sign in to administer HALP.</Message>}
              {errors.failure && <Message negative attached="bottom">{errors.failure}</Message>}
              <Form.Input name='email' fluid icon='user' iconPosition='left' placeholder='E-mail address' type='email' onChange={handleChange} onBlur={handleBlur} value={values.email}/>
              {touched.email && errors.email && <Message negative attached="bottom">{errors.email}</Message>}
              <Form.Input name='password' fluid icon='lock' iconPosition='left' placeholder='Password' type='password' onChange={handleChange} onBlur={handleBlur} value={values.password} />
              {touched.password && errors.password && <Message negative attached="bottom">{errors.password}</Message>}
              <Button color='green' fluid size='large' type='submit' disabled={isSubmitting || !isValid}>
                sign in
              </Button>
              <Button fluid size='large' type='button' onClick={history.goBack}>back</Button>
            </Form>
          }
        </Formik>
      </SigninPanel>
    }
  </Mutation>

const SigninPage = withRouter(_SigninPage)

class SigninRoute extends Component {
  static async getInitialProps({ req, res, match, history, location, ...ctx }) {
    return { whatever: 'stuff', customThing: ctx.customThing };
  }

  render() {
    return <SigninPage />
  }
}

export default SigninRoute;
