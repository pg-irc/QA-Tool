import React, { useState } from 'react';
import { ApiQueryPicker } from './api_query_picker/api_query_picker';
import { Services, SetServices } from './services/types';
import { ServicesList } from './services/services_list';

export const Application = (): JSX.Element => {
  const [services, setServices]: [Services, SetServices] = useState<Services>({type: 'Services:Empty'});
  return (
    <div>
      <ApiQueryPicker services={services} setServices={setServices} />
      <ServicesList services={services} />
    </div>
  );
};