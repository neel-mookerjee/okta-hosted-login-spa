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
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import { Container } from 'semantic-ui-react';
import config from './config';
import Home from './Home';
import Health from './Health';
import Navbar from './Navbar';
import Bottombar from './Bottombar';
import Sidebar from './Sidebar';
import Profile from './Profile';
import Token from './Token';
import NotFound from './NotFound.jsx';
import { Icon } from 'semantic-ui-react';

class App extends Component {
  render() {
    return (
      <Router>
        <Security {...config.oidc}>
          <Navbar />
          <Container text style={{ marginTop: '7em' }}>
            <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/health" exact component={Health} />
              <SecureRoute exact path="/profile" component={Profile} />
              <SecureRoute exact path="/token" component={Token} />
              <React.Fragment>
              <div style={{ border: '2px solid red', borderRadius: '10px', padding: '10px', background: '#ffcc99', textAlign: 'center', font: 'inherit', fontSize: 'larger'}}>
                <p><Icon name='warning sign' color='red' />The page could not be retrieved. Try clearing cookies and refresh?</p>
                <pre>
                <Route exact path="/implicit/callback" component={ImplicitCallback} />
                </pre>
              </div>
              </React.Fragment>
              <Route path="*" component={NotFound} />
            </Switch>
          </Container>
          <Bottombar />
          <Sidebar />
        </Security>
      </Router>
    );
  }
}

export default App;
