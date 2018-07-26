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
} from 'semantic-ui-react';


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

const _SigninPage = ({history}) =>
  <Mutation mutation={MUTATION_SIGNIN_USER}>
    {signinUser =>
      <SigninPanel>
        <Form>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
          <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password' />
          <Button color='green' fluid size='large' onClick={e => {
            e.preventDefault()
            signinUser({variables: {email: 'sdebaun74@gmail.com', password: 'sdebaun'}})
              .then(({data: {signinUser: result}}) => {
                if (result) { history.push('/admin') }
                else { console.log('sign in failed')}
              })
          }}>
            sign in
          </Button>
          <Button fluid size='large'>back</Button>
        </Form>
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
