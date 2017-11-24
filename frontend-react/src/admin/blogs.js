import React, {Component} from 'react';
import { List, Datagrid, EmailField, TextField, SimpleForm, DisabledInput, ImageField,
    TextInput, LongTextInput, ImageInput, Edit, EditButton, SimpleShowLayout,
    Show, Create, ListButton, DeleteButton, DateField, RichTextField, ShowButton,
    crudGetOne, refreshView} from 'admin-on-rest';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { timeStampToDate } from '../utils';
import { host } from '../constants';
import RichTextInput from 'aor-rich-text-input';

export const BlogList = (props) => (
    <List title="All blogs" {...props}>
        <Datagrid>
            <TextField source="title" />
            <RichTextField source="content"
              style={{ maxWidth: '18em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}  />
            <CustomImageField source="mediaurl" />
            <ShowButton />
        </Datagrid>
    </List>
);

const UnixDateField = ({ record = {}, source , label}) =>
    <div>
      {timeStampToDate(record[source])}
    </div>;

const CustomImageField = ({ record = {}, source }) =>
  <img src={`${host}${record[source]}`} style={{width: '100px'}} />

const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
};

const changeBlogImage = (basePath, record, history) => (event) => {
  event.preventDefault();
  history.push(`/blogs/${record.id}/media`);
}

const BlogShowActions = withRouter(({ basePath, data, refresh, history }) => (
      <CardActions style={cardActionStyle}>
          <EditButton basePath={basePath} record={data} />
          <ListButton basePath={basePath} />
          <DeleteButton basePath={basePath} record={data} />
          <FlatButton primary label="Upload Image" onClick={changeBlogImage(basePath, data, history)} />
      </CardActions>
));

export const BlogShow = (props) => {
  return (
    <Show {...props} actions={<BlogShowActions />} title='Blog detail' >
      <SimpleShowLayout>
              <TextField source="title" />
              <UnixDateField label="Publication date" source="posted" />
              <RichTextField source="content" />
              <CustomImageField source="mediaurl" />
      </SimpleShowLayout>
    </Show>
  );
}

class UploadBlogImage extends Component {
  save = (values, redirect) => {
    let boundary = "blob";
    console.log('save called', values.mediaurl, redirect);
    if (Array.isArray(values.mediaurl) && values.mediaurl.length > 0) {
      const headers = {
            // 'Content-Type': 'multipart/form-data;boundary=' + "--" + boundary,
            'Authorization': `Authorization: Bearer ${localStorage.jwt}`,
      };
      const form = new FormData();
      form.append('image', values.mediaurl[0].rawFile);
      fetch(`${host}/api/blogs/${values.id}/media`, {
              method:"POST",
              headers,
              body: form})
        .then(res => console.log(res.json()))
        .then(res => {
          this.props.getOne(values.id);
          this.props.refreshView();
          this.props.history.push(`/blogs/${values.id}/show`);
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
      getOne: (id) => dispatch(crudGetOne('blogs', id, `${host}/api`)),
      refreshView: () => dispatch(refreshView())
    })
  )(UploadBlogImage)
);

export const BlogUploadImage = (props) => {
  console.log('BlogUploadImage', props);
  return (
    <Edit title="Upload image" {...props}>
        <UploadBlogImageWithRouter>
          <SimpleForm>
              <DisabledInput source="blogid" />
              <TextField source="title" />
              <ImageInput source="mediaurl" label="new image" accept="image/*">
                <ImageField source="mediaurl" />
              </ImageInput>
              <RichTextField source="content" />
          </SimpleForm>
        </UploadBlogImageWithRouter>
    </Edit>
  );
}

export const BlogEdit = (props) => (
    <Edit title="edit" {...props}>
        <SimpleForm>
            <DisabledInput source="blogid" />
            <TextInput source="title" />
            <RichTextInput source="content" />
        </SimpleForm>
    </Edit>
);

export const BlogCreate = (props) => (
    <Create title="edit" {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <RichTextInput source="content" />
        </SimpleForm>
    </Create>
);
