import React, { Component } from 'react';
import { List, Datagrid, ImageField, TextField, SimpleForm, DisabledInput,
  TextInput, ImageInput, Edit, EditButton, ListButton, DeleteButton, ShowButton,
  Create, Show, SimpleShowLayout, crudGetOne, refreshView, AutocompleteInput} from 'admin-on-rest';
import { timeStampToDate } from '../utils';
import { host } from '../constants';
import RichTextInput from 'aor-rich-text-input';
import { CardActions } from 'material-ui/Card';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import FlatButton from 'material-ui/FlatButton';

const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
};

const miniStyle = { maxWidth: '18em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' };

const CustomImageField = ({ record = {}, source, size }) =>(
  <div>
    {source}<br/>
    <img src={`${host}${record[source]}`} style={{width: '100px'}} />
  </div>
)


class UploadBlogImage extends Component {
  save = (values, redirect) => {
    const { mediaurl } = this.props;
    console.log('save called', values[mediaurl], redirect);
    if (Array.isArray(values[mediaurl]) && values[mediaurl].length > 0) {
      const headers = {
            'Authorization': `Authorization: Bearer ${localStorage.jwt}`,
      };
      const form = new FormData();
      form.append('image', values[mediaurl][0].rawFile);
      fetch(`${host}/api/works/${values.id}/media/${this.props.imageSize}`, {
              method:"POST",
              headers,
              body: form})
        .then(res => console.log(res.json()))
        .then(res => {
          this.props.getOne(values.id);
          this.props.refreshView();
          this.props.history.push(`/works/${values.id}/show`);
        });
    }
  }

  render() {
    const { children } = this.props;
    return React.cloneElement(this.props.children, {
                            save: this.save,
                            resource: this.props.resource,
                            basePath: this.props.basePath,
                            record: this.props.record,
                            translate: this.props.translate,
                            version: this.props.version,
                            redirect: true,
      });
  }
};

const UploadBlogImageWithRouter = withRouter(
  connect(
    (state, props) => ({...props}),
    (dispatch) => ({
      getOne: (id) => dispatch(crudGetOne('works', id, `${host}/api`)),
      refreshView: () => dispatch(refreshView())
    })
  )(UploadBlogImage)
);

export const WorkUploadSmallImage = (props) => {
  console.log('WorkUploadSmallImage', props);
  return (
    <Edit title="Upload small image" {...props}>
      <UploadBlogImageWithRouter imageSize='small' mediaurl='smallimage'>
          <SimpleForm>
              <DisabledInput source="id" />
              <TextField source="name" />
              <TextField source="extrainfo"  style={miniStyle} />
              <TextField source="topic" style={miniStyle}  />
              <ImageInput source="smallimage" label="Small image" accept="image/*">
                <ImageField source="smallimage" />
              </ImageInput>
          </SimpleForm>
        </UploadBlogImageWithRouter>
    </Edit>
  );
}

export const WorkUploadBigImage = (props) => {
  console.log('WorkUploadBigImage', props);
  return (
    <Edit title="Upload big image" {...props}>
      <UploadBlogImageWithRouter imageSize='big' mediaurl='bigimage'>
          <SimpleForm>
              <DisabledInput source="id" />
              <TextField source="name" />
              <TextField source="extrainfo"  style={miniStyle} />
              <TextField source="topic" style={miniStyle}  />
              <ImageInput source="bigimage" label="Big image" accept="image/*">
                <ImageField source="bigimage" />
              </ImageInput>
          </SimpleForm>
      </UploadBlogImageWithRouter>
    </Edit>
  );
}


const WorkShowActions = withRouter(({ basePath, data, refresh, history }) => (
      <CardActions style={cardActionStyle}>
          <EditButton basePath={basePath} record={data} />
          <ListButton basePath={basePath} />
          <DeleteButton basePath={basePath} record={data} />
          <FlatButton primary label="Upload Small Image" onClick={() => history.push(`/works/${data.id}/media/small`)} />
          <FlatButton primary label="Upload Big Image" onClick={() => history.push(`/works/${data.id}/media/big`)} />
      </CardActions>
));

export const WorkShow = (props) => {
  return (
    <Show {...props} actions={<WorkShowActions />} title='Blog detail' >
      <SimpleShowLayout>
              <TextField source="name" />
              <TextField source="extrainfo" style={miniStyle}  />
              <TextField source="topic" style={miniStyle}  />
              <TextField source="location" />
              <CustomImageField source="smallimage" size="small" />
              <CustomImageField source="bigimage" size="big" />
      </SimpleShowLayout>
    </Show>
  );
};

const choices = [
    { id: 'visualIdentityContentBranding', name: 'Visual Identity & Content Branding' },
    { id: 'promotionalAd', name: 'Promotional Ad' },
    { id: 'packagingDesign', name: 'Packaging Design' },
    { id: 'editorialMagazine Design', name: 'Editorial & Magazine Design' },
];

export const WorkCreate = (props) => (
    <Create title="edit" {...props}>
      <SimpleForm>
        <TextInput source="name" />
        <TextInput source="extrainfo" style={miniStyle}  />
        <AutocompleteInput source="topic" style={miniStyle} choices={choices} />
        <TextInput source="location" />
        <ImageInput source="smallimage" label="Small image" accept="image/*">
          <ImageField source="smallimage" />
        </ImageInput>
        <ImageInput source="bigimage" label="Big image" accept="image/*">
          <ImageField source="bigimage" />
        </ImageInput>
      </SimpleForm>
    </Create>
);

export const WorkEdit = (props) => (
    <Edit title="edit" {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" />
            <TextInput source="extrainfo" style={miniStyle}  />
            <AutocompleteInput source="topic" style={miniStyle} choices={choices} />
            <TextInput source="location" />
        </SimpleForm>
    </Edit>
);

export const WorkList = (props) => {
  return (
    <List title="All works" {...props}>
        <Datagrid>
            <TextField source="name" />
            <TextField source="extrainfo" style={miniStyle}  />
            <TextField source="topic" style={miniStyle} />
            <CustomImageField source="smallimage" size="small" />
            <CustomImageField source="bigimage" size="big" />
            <TextField source="location" />
            <ShowButton />
        </Datagrid>
    </List>
  );
};
