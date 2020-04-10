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
import { Header, Icon } from 'semantic-ui-react';

import { checkAuthentication } from './helpers';
import CopyToClipboard from "@vigosan/react-copy-to-clipboard";


export default withAuth(class Token extends Component {
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
        {!this.state.ready && <p>Fetching tokens..</p>}
        {this.state.ready &&
          <div>
            <Header as="h1"><Icon name="ticket" /> Tokens </Header>
            <CopyToClipboard
              onCopy={({ success, text }) => {
                var msg = success ? "Copied!" : "Whoops, not copied!";
                this.button1.innerHTML = msg;
                this.button2.innerHTML = 'Copy';
              }}
              render={({ copy }) => (
                <div>
                  <p>Below is the <span style={{ backgroundColor: '#fcc2d7', borderBottom: '2px dashed #fcc2d7', fontWeight: 'bold' }}>ID token</span> which was obtained and is now stored in local storage.</p>
                  <textarea id="visible-input-idtoken" readOnly value={this.state.idtoken} spellCheck="false" cols={100} rows={15} style={{ border: '2px solid #fcc2d7', borderRadius: '10px', backgroundColor: '#fcc2d7', fontSize: '.7em', fontFamily: 'Verdana, Arial, Helvetica, sans-serif' }}
                    ref={input => {
                      this.textInput1 = input;
                    }} />
                  <button
                    onClick={() => copy(this.textInput1.value)}
                    ref={button => {
                      this.button1 = button;
                    }}
                  >
                    Copy
                  </button>
                </div>
              )}
            />
            <p />
            <CopyToClipboard
              onCopy={({ success, text }) => {
                var msg = success ? "Copied!" : "Whoops, not copied!";
                this.button1.innerHTML = 'Copy';
                this.button2.innerHTML = msg;
                console.log(msg, text);
              }}
              render={({ copy }) => (
                <div>
                  <p>Below is the <span style={{ backgroundColor: '#a3daff', borderBottom: '2px dashed #a3daff', fontWeight: 'bold' }}>Access token</span> which was obtained and is now stored in local storage.</p>
                  <textarea id="visible-input-accesstoken" readOnly value={this.state.accesstoken} spellCheck="false" cols={100} rows={15} style={{ border: '2px solid #a3daff', borderRadius: '10px', backgroundColor: '#a3daff', fontSize: '.7em', fontFamily: 'Verdana, Arial, Helvetica, sans-serif' }}
                    ref={input => {
                      this.textInput2 = input;
                    }} />
                  <button
                    onClick={() => copy(this.textInput2.value)}
                    ref={button => {
                      this.button2 = button;
                    }}
                  >
                    Copy
                  </button>
                </div>
              )}
            />

          </div>
        }
      </div>
    );
  }
});
