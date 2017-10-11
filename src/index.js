import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import Cryptocurrency from './Cryptocurrency';

import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<Cryptocurrency/>, document.getElementById('root'));
registerServiceWorker();
