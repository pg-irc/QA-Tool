import React, { useState } from 'react';
import { UrlTemplate } from './url_template/url_template';
import { Services, SetServices } from '../components/services/types';
import { ServicesList } from './services/services_list';
// tslint:disable:no-expression-statement typedef no-any

export const App = (): JSX.Element => {
  const [services, setServices]: [Services, SetServices] = useState<Services>({type: 'Services:Empty'});
  console.log(services);
  return (
    <div>
      <UrlTemplate services={services} setServices={setServices}/>
      <ServicesList services={services} />
    </div>
  );
};