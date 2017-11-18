import React from 'react';
import { List, Datagrid, EmailField, TextField, SimpleForm, DisabledInput, TextInput, LongTextInput, Edit, EditButton, Create} from 'admin-on-rest';
import { timeStampToDate } from '../utils';
import { host } from '../constants';
import RichTextInput from 'aor-rich-text-input';

export const BlogList = (props) => (
    <List title="All blogs" {...props}>
        <Datagrid>
            <TextField source="title" />
            <TextField source="content"
              style={{ maxWidth: '18em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}  />
            <UnixDateField source="posted" />
            <CustomImageField source="mediaurl" />
            <EditButton />
        </Datagrid>
    </List>
);

const UnixDateField = ({ record = {}, source }) =>
    <div>
        {timeStampToDate(record[source])}
    </div>;

const CustomImageField = ({ record = {}, source }) =>
  <img src={`${host}${record[source]}`} style={{width: '100px'}} />

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
