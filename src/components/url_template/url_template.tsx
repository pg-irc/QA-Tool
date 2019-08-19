import React from 'react';
import { Dropdown } from '../dropdown/dropdown';
import { topicsForQA } from '../../dropdown_data/topics';

export const UrlTemplate = (): JSX.Element => (
    <div>
       Topics: <Dropdown dropdownData={topicsForQA}/>
    </div>
);