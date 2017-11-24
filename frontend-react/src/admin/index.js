import React, {Component} from 'react';
import { jsonServerRestClient, Admin, Resource, Delete } from 'admin-on-rest';
import { host } from '../constants';
import {BlogList, BlogEdit, BlogCreate, BlogShow, BlogUploadImage} from './blogs';
import {WorkList, WorkEdit, WorkCreate, WorkShow, WorkUploadSmallImage, WorkUploadBigImage} from './works';

import authClient from './authClient';
import {httpClient, addUploadCapabilities} from './httpclient'

import { Card, CardText } from 'material-ui/Card';
import { ViewTitle } from 'admin-on-rest/lib/mui';
import { Route } from 'react-router';

const NotFound = () => (
    <Card>
        <ViewTitle title="Not Found" />
        <CardText>
            <h1>404: Page not found</h1>
        </CardText>
    </Card>
);

const customRoutes = [
    <Route exact path="/blogs/:id/media" render={(props) => (<BlogUploadImage resource="blogs" {...props} />)} /> ,
    <Route exact path="/works/:id/media/small" render={(props) => (<WorkUploadSmallImage resource="works" {...props} />)} /> ,
    <Route exact path="/works/:id/media/big" render={(props) => (<WorkUploadBigImage resource="works" {...props} />)} />
];

const MyAdmin = () => (
    <Admin catchAll={NotFound} customRoutes={customRoutes}  authClient={authClient} restClient={addUploadCapabilities(jsonServerRestClient(host+'/api', httpClient))}>
      <Resource name="blogs" show={BlogShow}  list={BlogList} edit={BlogEdit} create={BlogCreate} remove={Delete} />
      <Resource name="works" show={WorkShow} list={WorkList} edit={WorkEdit} create={WorkCreate} remove={Delete} />
    </Admin>
);

export default MyAdmin;
