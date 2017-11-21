import {fetchUtils} from 'admin-on-rest';

const convertFileToBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});


export const addUploadCapabilities = requestHandler => (type, resource, params) => {
  console.log(params.data);
  if ((type === 'CREATE' || type === 'UPDATE')   && resource === 'blogs') {
      if (params.data.mediaurl && params.data.mediaurl.length > 0 && params.data.mediaurl[0] && params.data.mediaurl[0]['rawFile'] ) {
          const newPictures = [params.data.mediaurl[0]['rawFile']];
          console.log('newPictures', newPictures, params);
          return Promise.all(newPictures.map(convertFileToBase64))
              .then(base64pictures => requestHandler(type, resource, {
                  ...params,
                  data: {
                        ...params.data,
                        mediaurl: base64pictures[0],
                    },
              }));
    }
  }

  return requestHandler(type, resource, params);
};

export const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    options.headers.set('authorization', `Authorization: Bearer ${localStorage.jwt}`);
    return fetchUtils.fetchJson(url, options);
}
