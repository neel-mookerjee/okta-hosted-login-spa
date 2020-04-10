import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';

class Health extends Component {
  render() {
    return (
        <div style={{ border: '2px solid green', borderRadius: '10px', padding: '10px', background: 'lightgreen', textAlign: 'center', font: 'inherit', fontSize: 'larger' }}>
        <p><Icon name='arrow circle up' color='green' />This application is up!</p>
    </div>
    );
  }
};
export default Health
