/*
 * Copyright (c) 2018, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';
import { Button, Header } from 'semantic-ui-react';
import { checkAuthentication } from './helpers';

export default withAuth(class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null, userinfo: null };
    this.checkAuthentication = checkAuthentication.bind(this);
    this.login = this.login.bind(this);
  }

  async componentDidMount() {
    this.checkAuthentication()
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  async login() {
    this.props.auth.login('/');
  }

  render() {

    return (
      <div>
        {this.state.authenticated !== null &&
          <div>
            {this.state.authenticated &&
              <div>
                <Header as="h1">Home</Header>
                <p>
                  You have successfully authenticated against Okta, and have been redirected back to here.
              </p>
                <p>You now have an ID token and Access token in local storage.</p>

                <ul>
                  <li>Visit the <a href="/profile">Profile</a> page to take a look inside the ID token claims.</li>
                  <li>Visit the <a href="/token">Token</a> page to access the ID token and Access token.</li>
                </ul>
                <h3>Next Steps</h3>
                <p>This application is a stand-alone frontend application.  At this point you can use the access token to authenticate yourself against resources that you are granted access to.</p>
              </div>
            }
            {!this.state.authenticated &&
              <div>
                <Header as="h1">OKTA Login Page</Header>
                <p>If you&lsquo;re viewing this page then you have successfully landed on the OKTA Login support application. The content you see on this page is public.</p>
                <p>
                  When you click the login button below, you will be redirected to the login page on the authentication provider.
                  After you authenticate, you will be returned to this application with an ID token and Access token.  These tokens will be stored in local storage and can be retrieved at a later time.
              </p>
                <br />
                <Button id="login-button" primary onClick={this.login}>Login</Button>
              </div>
            }
          </div>
        }
      </div>
    );
  }
});
