import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import {
  MUTATION_ADD_PROJECT_SENTPERSON,
  MUTATION_DELETE_PROJECT_SENTPERSON,
  MUTATION_UPDATE_PROJECT_SENTPERSON,
  refetchSpecific
} from '../../../api/projects';

import {
  Grid,
  Segment,
  Icon,
  Header,
  List,
  Button,
  Menu,
  Dropdown,
} from 'semantic-ui-react';

import { State } from 'react-powerplug'

import FormSentPerson from '../../components/FormSentPerson';

const SentPersonMenu = ({id, projectId, state}) =>
      <Dropdown button icon='caret down' className='icon' direction='right'>
        <Dropdown.Menu style={{left: 'auto', right:0}}>
          <DropdownItemUpdate id={id} projectId={projectId} state='confirmed' icon='checkmark box' color='green' text='confirm' />
          <DropdownItemUpdate id={id} projectId={projectId} state='noshow' icon='exclamation triangle box' color='red' text='noshow' />
          <DropdownItemUpdate id={id} projectId={projectId} state='sent' icon='play circle' color='yellow' text='sent' />
          <Dropdown.Divider/>
          <DropdownItemDelete id={id} projectId={projectId} />
        </Dropdown.Menu>
      </Dropdown>

const DropdownItemUpdate = ({id, projectId, state, icon, color, text}) =>
<Mutation mutation={MUTATION_UPDATE_PROJECT_SENTPERSON} refetchQueries={refetchSpecific(projectId)}>
  {(updateProjectSentPerson) =>
    <Dropdown.Item
      onClick={() => updateProjectSentPerson({variables: { id, state }})}
      >
      <Icon color={color} name={icon}/>
      {text}
    </Dropdown.Item>
  }
</Mutation>

const DropdownItemDelete = ({id, projectId}) =>
<Mutation mutation={MUTATION_DELETE_PROJECT_SENTPERSON} refetchQueries={refetchSpecific(projectId)}>
  {(deleteProjectSentPerson) =>
    <Dropdown.Item
      onClick={() => deleteProjectSentPerson({variables: { id }})}
      >
      <Icon name='trash'/>
      DELETE!
    </Dropdown.Item>
  }
</Mutation>

const SentPersonAdd = ({id}) =>
<Mutation mutation={MUTATION_ADD_PROJECT_SENTPERSON} refetchQueries={refetchSpecific(id)}>
{(addProjectDetail, {error}) => 
  <FormSentPerson
    initialValues={{name: '', email: ''}}
    okLabel={'Add'}
    cancelLabel={'Cancel'}
    onSubmit={(values, {setSubmitting, setErrors, resetForm}) => {
      addProjectDetail({variables: {projectId: id, ...values}})
      .then(({data: {addProjectSentPerson: result}}) => {
        if (result) {
          console.log('result', result)
          setSubmitting(false)
          resetForm()
        }
        else {
          console.log('err', error)
          setSubmitting(false)
          setErrors({failure: error})
        }
      })
    }}
    onCancel={() => {}}
    />
}
</Mutation>

const propsForState = state => {
  if (state == 'sent') return {
    name: 'play circle',
    color: 'yellow',
    emptyTextForState: 'Nobody has been sent to help.'
  }
  if (state == 'confirmed') return {
    name: 'checkmark box',
    color: 'green',
    emptyTextForState: 'Nobody has been confirmed as arriving.'
  }
  if (state == 'all') return {
    emptyTextForState: 'Nobody has been sent, confirmed, or failed to confirm.'
  }
  return {
    name: 'exclamation triangle',
    color: 'red',
    emptyTextForState: 'Nobody has failed to show up',
  }
}

const SentPersonItem = ({projectId, stateProps, sentPerson: {id, name, email, state}}) =>
  <List.Item>
    <List.Content floated='right'>
      <SentPersonMenu id={id} projectId={projectId} state={state} />
    </List.Content>
    <Icon name={propsForState(state).name} color={propsForState(state).color}/>
    <List.Content>
      <List.Header>{name}</List.Header>
      <List.Description>{email}</List.Description>
    </List.Content>
  </List.Item>

const logProp = (Component, propName) => props => {
  console.log('prop', propName, props[propName])
  return <Component {...props}/>
}

const _SentPersonsList = ({id, sentPersons, stateProps}) =>
  <List divided verticalAlign='middle' size='large'>
    { sentPersons.length == 0 && <List.Item>{stateProps.emptyTextForState}</List.Item> }
    { sentPersons.map(p => <SentPersonItem stateProps={stateProps} key={p.id} projectId={id} sentPerson={p}/>)}
    <List.Item>
      <SentPersonAdd id={id}/>
    </List.Item>
  </List>

const SentPersonsList = logProp(_SentPersonsList, 'sentState')

// const SentPersonsFilter = ({filter, setState}) =>
//   <div>
//     <Button onClick={()=>setState({filter: 'sent'})}>sent</Button>
//     <Button onClick={()=>setState({filter: 'confirmed'})}>confirmed</Button>
//     <Button onClick={()=>setState({filter: 'noshow'})}>noshow</Button>
//   </div>

const SentPersonsFilter = ({filter, setState}) =>
  <Menu pointing secondary>
    <Menu.Item active={filter=='sent'} onClick={()=>setState({filter: 'sent'})}>sent</Menu.Item>
    <Menu.Item active={filter=='confirmed'} onClick={()=>setState({filter: 'confirmed'})}>confirmed</Menu.Item>
    <Menu.Item active={filter=='noshow'} onClick={()=>setState({filter: 'noshow'})}>noshow</Menu.Item>
    <Menu.Item active={filter=='all'} onClick={()=>setState({filter: 'all'})}>all</Menu.Item>
  </Menu>

const sentByFilter = (sentPersons, filter) => {
  if (filter == 'all') return [...sentPersons['sent'], ...sentPersons['confirmed'], ...sentPersons['noshow']]
  return sentPersons[filter]
}

const SentPersons = ({id, sentPersons}) =>
  <State initial={{filter: 'sent'}}>
    {({state: {filter}, setState}) =>
    <div>
      <Header as='h3'>People {filter}</Header>
      <SentPersonsFilter filter={filter} setState={setState}/>
      <SentPersonsList id={id} sentPersons={sentByFilter(sentPersons, filter)} stateProps={propsForState(filter)} />
    </div>
    }
  </State>

export default logProp(SentPersons, 'sentPersons')