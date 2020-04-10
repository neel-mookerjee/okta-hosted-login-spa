# Okta Hosted Login Single Page Application

This stack uses the [Okta React Library](https://github.com/okta/okta-oidc-js/tree/master/packages/okta-react) to login a user to EAS (Okta) and retrieve ID and Access Token.  The login is achieved through the [PKCE Flow](https://developer.okta.com/docs/guides/implement-auth-code-pkce), where the user is redirected to the Okta-Hosted login page.  After the user authenticates they are redirected back to the application with an ID token and access token.

## Running This Application

To run this application, you first need to clone this repo and then enter into this directory, and use the appropriate `.env`. For local development, use `.env.local`

```bash
cd js
cp .env.local .env
```

Then install dependencies:

```bash
npm install
```

Now you need to gather the following information from the Okta Developer Console:

- **Client Id** - The client ID of the SPA application that you created earlier. This can be found on the "General" tab of an application, or the list of applications.  This identifies the application that tokens will be minted for.
- **Issuer** - This is the URL of the authorization server that will perform authentication.  All Developer Accounts have a "default" authorization server.  The issuer is a combination of your Org URL (found in the upper right of the console home page) and `/oauth2/default`. For example, `https://dev-1234.oktapreview.com/oauth2/default`.

These values must exist as environment variables.

```ini
ISSUER=https://yourOktaDomain.com/oauth2/default
CLIENT_ID=123xxxxx123
```

With variables set, start the app server:

```
npm start
```

Now navigate to http://localhost:8080 in your browser.

If you see a home page that prompts you to login, then things are working!  Clicking the **Log in** button will redirect you to the Okta hosted sign-in page.

You can login with the same account that you created when signing up for your Developer Org, or you can use a known username and password from your Okta Directory.

**Note:** If you are currently using your Developer Console, you already have a Single Sign-On (SSO) session for your Org.  You will be automatically logged into your application as the same user that is using the Developer Console.  You may want to use an incognito tab to test the flow from a blank slate.

## Deploy using Makefile
```bash
  ## OKTA-LOGIN

  okta-login =>    make docker/build         build and tag the Docker image. vars:workspace
  okta-login =>    make docker/push          push the Docker image to ECR. vars:release, workspace
  okta-login =>    make docker/run           Run the Docker image (latest) locally.
  okta-login =>    make tf/plan              Run the terraform plan. vars:stack, workspace, release
  okta-login =>    make tf/apply             Run the terraform apply command. vars:stack, workspace, release
  okta-login =>    make tf/destroy           Run the terraform destroy command. vars:stack, workspace, release
  okta-login =>    make tf/taint             Taint a terraform resource. vars:stack, workspace, resource
  okta-login =>    make deploy               Compiles, builds and deploys a stack for a release as tag. vars: release, stack, workspace
  okta-login =>    make deploy-slim          Compiles, builds and deploys a stack with the docker image and release from .release directory. vars: stack, workspace
  ```

## Instances
| environment | endpoint |
| --- | --- |
| dev | https://okta-dev.aghanil.com |

## Client ID and Issuer URL for Okta Connectivity
Refer the `.env` file ending with environment dev|nonprod|prod|local


## References

* Create React App: https://github.com/facebook/create-react-app
* Okta React Library: https://github.com/okta/okta-oidc-js/tree/master/packages/okta-react
* OIDC SPA Setup Instructions: https://developer.okta.com/docs/guides/sign-into-spa/react/before-you-begin
* PKCE Flow: https://developer.okta.com/docs/guides/implement-auth-code-pkce
* Okta Sign In Widget: https://github.com/okta/okta-signin-widget
