// in src/authClient.js
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'admin-on-rest';
import { host, headers } from '../constants';

export default (type, params) => {
    // called when the user attempts to log in
    if (type === AUTH_LOGIN) {
        const { username, password } = params;

        const body = JSON.stringify({username, password});
        // accept all username/password combinations
        return fetch(`${host}/api/auth`, {
              method:"POST",
              headers,
              body
        }).then(res => res.json() )
        .then(data => localStorage.jwt = data['jwt']);
    }
    // called when the user clicks on the logout button
    if (type === AUTH_LOGOUT) {
        if (localStorage.jwt) {
          const newheaders = {
            'Authorization': `Authorization: Bearer ${localStorage.jwt}`,
            ...headers
          };
          return fetch(`${host}/api/auth`, {
                method:"DELETE",
                headers: newheaders
          }).then(res => localStorage.removeItem('jwt') );
        }
        return Promise.resolve();
    }
    // called when the API returns an error
    if (type === AUTH_ERROR) {
        const { status } = params;
        if (status === 401 || status === 403) {
            localStorage.removeItem('jwt');
            return Promise.reject();
        }
        return Promise.resolve();
    }
    // called when the user navigates to a new location
    if (type === AUTH_CHECK) {
        return localStorage.jwt ? Promise.resolve() : Promise.reject();
    }
    return Promise.reject('Unknown method');
};
