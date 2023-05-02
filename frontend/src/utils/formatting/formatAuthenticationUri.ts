const getAuthenticationRedictionUri = (uri: string) =>
  uri
    .split(`${process.env.REACT_APP_DOMAIN_URL}`)
    .slice(-1)[0]
    .split("uri=")
    .slice(-1)[0]
    .replaceAll("&", "%26");

export default getAuthenticationRedictionUri;
