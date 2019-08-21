import React, { useState } from 'react';
import { UrlTemplate } from './url_template/url_template';
import { ServiceMap, SetServices } from '../components/services/types';
// tslint:disable:no-expression-statement

export const App = (): JSX.Element => {
  const [services, setServices]: [ServiceMap, SetServices] = useState({});
  return (
    <div>
      <UrlTemplate services={services} setServices={setServices}/>
    </div>
  );
};