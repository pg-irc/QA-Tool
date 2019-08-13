import React from 'react';
import { Provider } from 'react-redux';
import { buildStore } from './store';
import { MainComponent } from '../components/main/main_component';

const store = buildStore();

export const Application: React.FC = (): JSX.Element => (
    <Provider store={store}>
        <MainComponent/>
    </Provider>
);