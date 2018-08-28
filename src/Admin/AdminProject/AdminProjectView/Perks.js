import React from 'react';
import { Mutation } from 'react-apollo';
import {
  MUTATION_ADD_PROJECT_PERK,
  MUTATION_DELETE_PROJECT_PERK,
  MUTATION_UPDATE_PROJECT_PERK,
  refetchSpecific
} from '../../../api/projects';
import { Toggle } from 'react-powerplug';

import {
  Icon,
  List,
  Button,
} from 'semantic-ui-react';

// import FormDetail from '../../components/FormDetail';
import FormPerk from '../../components/FormPerk';

const PerkItem = ({projectId, perk: {id, text}}) =>
<Toggle initial={false} onChange={val => console.log('new toggle', val)}>
  {({toggle, on}) => on
    ? <List.Item>
        <PerkUpdate perk={{id, text}} projectId={projectId} toggle={toggle} />
      </List.Item>
    : <List.Item>
      <List.Content floated='right'>
        <Button icon='edit' onClick={toggle}/>
        <ButtonDeletePerk id={id} projectId={projectId}/>
      </List.Content>
      <Icon name='checkmark'/>
      <List.Content>{text}</List.Content>
    </List.Item>
  }
</Toggle>

const ButtonDeletePerk = ({projectId, id}) =>
<Mutation mutation={MUTATION_DELETE_PROJECT_PERK} refetchQueries={refetchSpecific(projectId)}>
  {deleteProjectPerk =>
    <Button icon='trash' onClick={() => deleteProjectPerk({variables: {id}})} />
  }
</Mutation>

const PerkUpdate = ({perk, projectId, toggle}) =>
<Mutation mutation={MUTATION_UPDATE_PROJECT_PERK} refetchQueries={refetchSpecific(projectId)}>
{updateProjectPerk => 
  <FormPerk
    initialValues={perk}
    okLabel={'Update'}
    cancelLabel={'Cancel'}
    onSubmit={(values, {setSubmitting, setErrors, resetForm}) => {
      updateProjectPerk({variables: {id: perk.id, ...values}})
      .then(({data: {updateProjectPerk: result}}) => {
        if (result) {
          console.log('result', result)
          setSubmitting(false)
          toggle()
        }
        else {
          setSubmitting(false)
          setErrors({failure: 'I can\'t find anyone with that email and password.'})
        }
      })
    }}
    onCancel={toggle}
    />
}
</Mutation>

const PerkAdd = ({id, onCancel}) =>
  <Mutation mutation={MUTATION_ADD_PROJECT_PERK} refetchQueries={refetchSpecific(id)}>
    {addProjectPerk => 
      <FormPerk
        initialValues={{text: ''}}
        okLabel={'Add'}
        cancelLabel={'Cancel'}
        onSubmit={(values, {setSubmitting, setErrors, resetForm}) => {
          addProjectPerk({variables: {projectId: id, ...values}})
          .then(({data: {addProjectPerk: result}}) => {
            if (result) {
              console.log('result', result)
              setSubmitting(false)
              resetForm()
              onCancel()
              // history.push(`/admin/project/${result.id}`)
            }
            else {
              setSubmitting(false)
              setErrors({failure: 'I can\'t find anyone with that email and password.'})
            }
          })
        }}
        onCancel={onCancel}
        />
    }
  </Mutation>

const PerkAddListItem = ({id, toggle}) =>
  <List.Item>
    <PerkAdd id={id} onCancel={toggle}/>
  </List.Item>

const PerkAddButton = ({onClick}) =>
    <Button fluid icon labelPosition='left' onClick={onClick}>
      <Icon name='plus'/>
      add a perk
    </Button>

const PerkAddToggle = ({id}) =>
  <Toggle initialValues={false}>
    {({toggle, on}) => on ? <PerkAddListItem id={id} toggle={toggle} /> : <PerkAddButton onClick={toggle}/> }
  </Toggle>

const Perks = ({id, perks}) =>
  <div>
    <h3>What perks do they get?</h3>
    <List divided verticalAlign='middle' size='large'>
      { perks.map(p => <PerkItem key={p.id} projectId={id} perk={p} />) }
      <PerkAddToggle id={id}/>
    </List>
  </div>

export default Perks