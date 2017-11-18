import {fetchUtils} from 'admin-on-rest';


export const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    // add your own headers here
    options.headers.set('authorization', `Authorization: Bearer ${localStorage.jwt}`);
    return fetchUtils.fetchJson(url, options);
}
