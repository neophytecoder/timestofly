import {fetchUtils} from 'admin-on-rest';

const convertFileToBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});


export const addUploadCapabilities = requestHandler => (type, resource, params) => {
  console.log(params.data);
  // if ((type === 'CREATE' || type === 'UPDATE')   && resource === 'blogs') {
  //     if (params.data.mediaurl && params.data.mediaurl.length > 0 && params.data.mediaurl[0] && params.data.mediaurl[0]['rawFile'] ) {
  //         const newPictures = [params.data.mediaurl[0]['rawFile']];
  //         console.log('newPictures', newPictures, params);
  //         return Promise.all(newPictures.map(convertFileToBase64))
  //             .then(base64pictures => requestHandler(type, resource, {
  //                 ...params,
  //                 data: {
  //                       ...params.data,
  //                       mediaurl: base64pictures[0],
  //                   },
  //             }));
  //   }
  // }

  // if ((type === 'CREATE' || type === 'UPDATE')   && resource === 'works') {
  //     if (params.data.smallimage && params.data.smallimage.length > 0  && params.data.smallimage[0]['rawFile'] &&
  //         params.data.bigimage && params.data.bigimage.length > 0  && params.data.bigimage[0]['rawFile'] ) {
  //         const newPictures = [params.data.smallimage[0]['rawFile'], params.data.bigimage[0]['rawFile']];
  //         console.log('newPictures', newPictures, params);
  //         return Promise.all(newPictures.map(convertFileToBase64))
  //             .then(base64pictures => requestHandler(type, resource, {
  //                 ...params,
  //                 data: {
  //                       ...params.data,
  //                       smallimage: base64pictures[0],
  //                       bigimage: base64pictures[1],
  //                   },
  //             }));
  //   }
  // }
  if ((type === 'GET_ONE' || type === 'UPDATE')   && resource === 'blogs/media') {
    console.log('UPDATE' ,type, resource, params);
    return requestHandler(type, 'blogs', params).then(result => {console.log(result); return result;});
  }

  return requestHandler(type, resource, params);
};

const convertHTTPResponseToREST = (response, type, resource, params) => {
    const { headers, json } = response;
    return { data: json };
};

export const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    options.headers.set('authorization', `Authorization: Bearer ${localStorage.jwt}`);
    return fetchUtils.fetchJson(url, options);
}
