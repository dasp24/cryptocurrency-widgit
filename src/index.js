/* eslint-disable no-unused-vars*/
import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import Cryptocurrency from './Cryptocurrency';
import registerServiceWorker from './registerServiceWorker';
/* eslint-enable no-unused-vars*/

ReactDOM.render(<Cryptocurrency/>, document.getElementById('root'));
registerServiceWorker();
