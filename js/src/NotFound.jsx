import React from 'react';
import { Icon } from 'semantic-ui-react';

const NotFound = () => (
    <div style={{ border: '2px solid red', borderRadius: '10px', padding: '10px', background: '#ffcc99', textAlign: 'center', font: 'inherit', fontSize: 'larger' }}>
        <p><Icon name='warning sign' color='red' />Page not found [404]. Make sure your URL is right.</p>
    </div>
);
export default NotFound;