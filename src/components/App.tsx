import React, { useState } from 'react';
import { UrlTemplate } from './url_template/url_template';
import { Services, SetServices } from '../components/services/types';

// tslint:disable:no-expression-statement

export const App = (): JSX.Element => {
  const [services, setServices]: [Services, SetServices] = useState({});
  console.log(services);
  return (
    <div>
      <UrlTemplate services={services} setServices={setServices}/>
    </div>
  );
};