import React from 'react';
import { List, Datagrid, EmailField, TextField, SimpleForm, DisabledInput, TextInput, LongTextInput, Edit, EditButton, Create} from 'admin-on-rest';
import { timeStampToDate } from '../utils';
import { host } from '../constants';
import RichTextInput from 'aor-rich-text-input';

const miniStyle = { maxWidth: '18em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' };

export const WorkList = (props) => {
  return (
    <List title="All blogs" {...props}>
        <Datagrid>
            <TextField source="name" />
            <TextField source="extrainfo" style={miniStyle}  />
            <TextField source="topic" style={miniStyle}  />
            <CustomImageField source="smallimage" size="small" />
            <CustomImageField source="bigimage" size="small" />
            <TextField source="location" />
            <EditButton />
        </Datagrid>
    </List>
  );
};


const CustomImageField = ({ record = {}, source, size }) =>
  <img src={`${host}${record[source]}`} style={{width: '100px'}} />

export const WorkEdit = (props) => (
    <Edit title="edit" {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" />
            <TextInput source="extrainfo" style={miniStyle}  />
            <TextInput source="topic" style={miniStyle}  />
            <TextInput source="location" />
        </SimpleForm>
    </Edit>
);

export const WorkCreate = (props) => (
    <Create title="edit" {...props}>
        <SimpleForm>
        <TextInput source="name" />
        <TextInput source="extrainfo" style={miniStyle}  />
        <TextInput source="topic" style={miniStyle}  />
        <TextInput source="location" />
        </SimpleForm>
    </Create>
);
