// tslint:disable:no-expression-statement

import React from 'react';
import ReactDOM from 'react-dom';
import { Application } from './application';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Application />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
