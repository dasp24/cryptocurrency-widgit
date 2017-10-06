import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import Cryptocurrency from './Cryptocurrency';
import CreateStore from './redux/store';
import registerServiceWorker from './registerServiceWorker';

const App = () => {
    return (
      <Provider store={CreateStore()}>
          <Cryptocurrency/>
      </Provider>);
  };


ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
