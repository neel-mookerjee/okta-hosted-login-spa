const CLIENT_ID = process.env.CLIENT_ID;
const ISSUER = process.env.ISSUER;
const REDIRECT_URI = process.env.REDIRECT_URI;
const RESPONSE_TYPE= 'code';

export default {
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: REDIRECT_URI,
    scopes: ['openid','profile','email', 'lanid'],
    pkce: true,
    disableHttpsCheck: false,
    responseType: RESPONSE_TYPE
  }
};
