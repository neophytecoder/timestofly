import { host, headers } from '../constants';

export const SET_WORKS = "SET_WORKS";

export const setWorks = (works = []) => ({
  type: SET_WORKS,
  works
});

export const addWorksAsync = () => (dispatch) => {
  fetch(host + '/api/works', {headers})
    .then(data => {
      return data.json();
    })
    .then(works => {
      dispatch(setWorks(works));
    });
}
