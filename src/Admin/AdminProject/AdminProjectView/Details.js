import React from 'react';
import { Mutation } from 'react-apollo';
import {
  MUTATION_ADD_PROJECT_DETAIL,
  MUTATION_DELETE_PROJECT_DETAIL,
  MUTATION_UPDATE_PROJECT_DETAIL,
  refetchSpecific
} from '../../../api/projects';
import { Toggle } from 'react-powerplug';

import {
  Icon,
  List,
  Button,
} from 'semantic-ui-react';

import FormDetail from '../../components/FormDetail';

const DetailItem = ({projectId, detail: {id, text}}) =>
<Toggle initial={false} onChange={val => console.log('new toggle', val)}>
  {({toggle, on}) => on
    ? <List.Item>
        <DetailUpdate detail={{id, text}} projectId={projectId} toggle={toggle} />
      </List.Item>
    : <List.Item>
      <List.Content floated='right'>
        <Button icon='edit' onClick={toggle}/>
        <ButtonDeleteDetail id={id} projectId={projectId}/>
      </List.Content>
      <Icon name='checkmark'/>
      <List.Content>{text}</List.Content>
    </List.Item>
  }
</Toggle>

const ButtonDeleteDetail = ({projectId, id}) =>
<Mutation mutation={MUTATION_DELETE_PROJECT_DETAIL} refetchQueries={refetchSpecific(projectId)}>
  {deleteProjectDetail =>
    <Button icon='trash' onClick={() => deleteProjectDetail({variables: {id}})} />
  }
</Mutation>

const DetailUpdate = ({detail, projectId, toggle}) =>
<Mutation mutation={MUTATION_UPDATE_PROJECT_DETAIL} refetchQueries={refetchSpecific(projectId)}>
{updateProjectDetail => 
  <FormDetail
    initialValues={detail}
    okLabel={'Update'}
    cancelLabel={'Cancel'}
    onSubmit={(values, {setSubmitting, setErrors, resetForm}) => {
      updateProjectDetail({variables: {id: detail.id, ...values}})
      .then(({data: {updateProjectDetail: result}}) => {
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

const DetailAdd = ({id, onCancel}) =>
  <Mutation mutation={MUTATION_ADD_PROJECT_DETAIL} refetchQueries={refetchSpecific(id)}>
    {addProjectDetail => 
      <FormDetail
        initialValues={{text: ''}}
        okLabel={'Add'}
        cancelLabel={'Cancel'}
        onSubmit={(values, {setSubmitting, setErrors, resetForm}) => {
          addProjectDetail({variables: {projectId: id, ...values}})
          .then(({data: {addProjectDetail: result}}) => {
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

const DetailAddListItem = ({id, toggle}) =>
  <List.Item>
    <DetailAdd id={id} onCancel={toggle}/>
  </List.Item>

const DetailAddButton = ({onClick}) =>
    <Button fluid icon labelPosition='left' onClick={onClick}>
      <Icon name='plus'/>
      add a thing
    </Button>

const DetailAddToggle = ({id}) =>
  <Toggle initialValues={false}>
    {({toggle, on}) => on ? <DetailAddListItem id={id} toggle={toggle} /> : <DetailAddButton onClick={toggle}/> }
  </Toggle>

const Details = ({id, details}) =>
  <div>
    <h3>What are they looking for?</h3>
    <List divided verticalAlign='middle' size='large'>
      { details.map(d => <DetailItem key={d.id} projectId={id} detail={d} />) }
      <DetailAddToggle id={id}/>
    </List>
  </div>

export default Details