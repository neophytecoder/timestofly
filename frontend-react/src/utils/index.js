import {sprintf} from 'sprintf-js';

export const makeid = (length) => {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export const makeUniqueId = (length, posts) => {
  let generatedId = makeid(length);
  while (posts.filter((post) => post.id === generatedId).length !== 0) {
    generatedId = makeid(length);
  }
  return generatedId;
}

export const timeStampToDate = (timestamp) => {
  var d = new Date(timestamp*1000);
  return sprintf("%02d/%02d/%2d", d.getDate(), d.getMonth() + 1, d.getFullYear());
}
