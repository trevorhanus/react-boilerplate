export default function parseQueryString(queryString) {
  let params = {};
  const regex = /([^&=]+)=([^&]*)/g;

  var m;
  while (m = regex.exec(queryString)) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }

  return params;
}
