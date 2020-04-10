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

import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import { checkAuthentication } from './helpers';

export default withAuth(class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { userinfo: null, ready: false, accesstoken: null };
    this.checkAuthentication = checkAuthentication.bind(this);
  }

  async componentDidMount() {
    await this.checkAuthentication();
    this.applyClaims();
  }

  async componentDidUpdate() {
    await this.checkAuthentication();
    this.applyClaims();
  }

  async applyClaims() {
    if (this.state.userinfo && !this.state.claims) {
      const claims = Object.entries(this.state.userinfo);
      this.setState({ claims, ready: true });
    }
  }
    render() {
    return (
      <div>
      {this.state.authenticated !== null && this.state.authenticated &&
      <div style={{ position: 'fixed', top:'6.5em', width: '15em', left: '4.5em', border: '2px solid #c9e8a0', borderRadius: '10px', padding: '10px', background: 'aliceblue', textAlign: 'center', font: 'inherit', fontSize: 'larger'}}>
                  <p>Welcome back, <b>{this.state.userinfo.name}!</b></p>
                  <p>This route is protected, which will ensure that this page cannot be accessed until you have authenticated.</p>
        </div>
      }
      </div>
    );
  }
});
