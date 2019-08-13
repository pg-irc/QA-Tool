import React from 'react';
import { Provider } from 'react-redux';
import { buildStore } from './store';

const store = buildStore();

export const Application: React.FC = (): JSX.Element => (
    <Provider store={store}>
    <div>Hello world</div>
    </Provider>
);