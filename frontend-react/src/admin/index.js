import React, {Component} from 'react';
import { jsonServerRestClient, Admin, Resource, Delete } from 'admin-on-rest';
import { host } from '../constants';
import {BlogList, BlogEdit, BlogCreate} from './blogs';
import {WorkList, WorkEdit, WorkCreate} from './works';

import authClient from './authClient';
import {httpClient, addUploadCapabilities} from './httpclient'

const MyAdmin = () => (
    <Admin authClient={authClient} restClient={addUploadCapabilities(jsonServerRestClient(host+'/api', httpClient))}>
      <Resource name="blogs" list={BlogList} edit={BlogEdit} create={BlogCreate} remove={Delete} />
      <Resource name="works" list={WorkList} edit={WorkEdit} create={WorkCreate} remove={Delete} />
    </Admin>
);

export default MyAdmin;
