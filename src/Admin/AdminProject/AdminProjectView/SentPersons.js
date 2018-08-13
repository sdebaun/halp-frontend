import React from 'react';
import { Mutation } from 'react-apollo';
import {
  MUTATION_ADD_PROJECT_SENTPERSON,
  MUTATION_DELETE_PROJECT_SENTPERSON,
  MUTATION_UPDATE_PROJECT_SENTPERSON,
  refetchSpecific
} from '../../../api/projects';

import {
  Icon,
  Header,
  List,
  Menu,
  Dropdown,
} from 'semantic-ui-react';

import { State } from 'react-powerplug'

import Moment from 'react-moment';

import FormSentPerson from '../../components/FormSentPerson';

const SentPersonMenu = ({id, projectId, state}) =>
      <Dropdown button icon='caret down' className='icon' direction='right'>
        <Dropdown.Menu style={{left: 'auto', right:0}}>
          <DropdownItemUpdate id={id} projectId={projectId} state='noshow' icon='star half outline' color='yellow' text='maybe' />
          <DropdownItemUpdate id={id} projectId={projectId} state='sent' icon='star outline' color='yellow' text='probably' />
          <DropdownItemUpdate id={id} projectId={projectId} state='confirmed' icon='star' color='green' text='made it' />
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

export const SentPersonAdd = ({id}) =>
<Mutation mutation={MUTATION_ADD_PROJECT_SENTPERSON} refetchQueries={refetchSpecific(id)}>
{(addProjectDetail, {error}) => 
  <FormSentPerson
    initialValues={{name: '', email: '', state: 'noshow'}}
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
  if (state === 'sent') return {
    name: 'star outline',
    color: 'yellow',
    emptyTextForState: 'Nobody has been sent to help.'
  }
  if (state === 'confirmed') return {
    name: 'star',
    color: 'green',
    emptyTextForState: 'Nobody has been confirmed as arriving.'
  }
  if (state === 'all') return {
    emptyTextForState: 'Nobody has been sent, confirmed, or failed to confirm.'
  }
  return {
    name: 'star half outline',
    color: 'yellow',
    emptyTextForState: 'Nobody has failed to show up',
  }
}

const SentPersonItem = ({projectId, stateProps, sentPerson: {id, name, email, state, createdAt}}) =>
  <List.Item>
    <List.Content floated='right'>
      <SentPersonMenu id={id} projectId={projectId} state={state} />
    </List.Content>
    <Icon name={propsForState(state).name} color={propsForState(state).color}/>
    <List.Content>
      <List.Header>{name}</List.Header>
      <List.Description>{email}</List.Description>
      <List.Description>Sent <Moment fromNow>{createdAt}</Moment></List.Description>
    </List.Content>
  </List.Item>

const logProp = (Component, propName) => props => {
  // console.log('prop', propName, props[propName])
  return <Component {...props}/>
}

const _SentPersonsList = ({id, sentPersons, stateProps}) =>
  <List divided verticalAlign='middle' size='large'>
    { sentPersons.length === 0 && <List.Item>{stateProps.emptyTextForState}</List.Item> }
    { sentPersons.map(p => <SentPersonItem stateProps={stateProps} key={p.id} projectId={id} sentPerson={p}/>)}
  </List>

const SentPersonsList = logProp(_SentPersonsList, 'sentState')

const SentPersonsFilter = ({filter, setState}) =>
  <Menu pointing secondary>
    <Menu.Item active={filter==='sent'} onClick={()=>setState({filter: 'sent'})}>
      <Icon name='star half outline' color='yellow'/>
      <Icon name='star outline' color='yellow'/>
      on the way
    </Menu.Item>
    <Menu.Item active={filter==='confirmed'} onClick={()=>setState({filter: 'confirmed'})}>
      <Icon name='star' color='green'/>
      made it
    </Menu.Item>
    <Menu.Item active={filter==='all'} onClick={()=>setState({filter: 'all'})}>
      <Icon name='star half outline' color='yellow'/>
      <Icon name='star outline' color='yellow'/>
      <Icon name='star' color='green'/>
      all
    </Menu.Item>
  </Menu>

const sentByFilter = (sentPersons, filter) => {
  if (filter === 'sent') return [...sentPersons['sent'], ...sentPersons['noshow']]
  if (filter === 'all') return [...sentPersons['sent'], ...sentPersons['confirmed'], ...sentPersons['noshow']]
  return sentPersons[filter]
}

const SentPersons = ({id, sentPersons}) =>
  <State initial={{filter: 'sent'}}>
    {({state: {filter}, setState}) =>
    <div>
      {/* <Header as='h3'>People {filter.replace(/^\w/, c => c.toUpperCase())}</Header> */}
      <SentPersonsFilter filter={filter} setState={setState}/>
      <SentPersonsList id={id} sentPersons={sentByFilter(sentPersons, filter)} stateProps={propsForState(filter)} />
    </div>
    }
  </State>

export default logProp(SentPersons, 'sentPersons')