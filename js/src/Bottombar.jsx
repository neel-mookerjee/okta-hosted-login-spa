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
import { Icon, Menu } from 'semantic-ui-react';
import ReactTooltip from 'react-tooltip'

class Bottombar extends Component {
  render() {
    return (
      <div style={{ position: 'fixed', top:'80%', width: '100%', left: '96%'}}>

        <Menu style={{ display: 'table-row', right: '0', backgroundColor: 'lightgreen' }}>
          <Menu.Item
            name='mail'
            as="a" target="blank" href="mailto:arghanil@gmail.com"
            link={true}
            position='right'
            tooltip='mail'
          >
            <p data-tip="mail"><Icon name='mail' /></p>
          </Menu.Item>

        </Menu>
        <ReactTooltip />
        </div>

    );
  }
};
export default Bottombar
