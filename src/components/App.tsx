import React, { useState } from 'react';
import { APIQueryPicker } from './api_query_picker/api_query_picker';
import { Services, SetServices } from '../components/services/types';
import { ServicesList } from './services/services_list';

export const App = (): JSX.Element => {
  const [services, setServices]: [Services, SetServices] = useState<Services>({type: 'Services:Empty'});
  return (
    <div>
      <APIQueryPicker services={services} setServices={setServices} />
      <ServicesList services={services} />
    </div>
  );
};