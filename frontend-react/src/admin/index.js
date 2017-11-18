import React, {Component} from 'react';
import { jsonServerRestClient, Admin, Resource, Delete } from 'admin-on-rest';
import { host } from '../constants';
import {BlogList, BlogEdit, BlogCreate} from './blogs';

import authClient from './authClient';
import {httpClient} from './httpclient'

const MyAdmin = () => (
    <Admin authClient={authClient} restClient={jsonServerRestClient(host+'/api', httpClient)}>
      <Resource name="blogs" list={BlogList} edit={BlogEdit} create={BlogCreate} remove={Delete} />
    </Admin>
);

export default MyAdmin;
