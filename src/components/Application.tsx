// tslint:disable:no-expression-statement no-let
import React, { useState } from 'react';
import { ApiQueryPicker } from './api_query_picker/api_query_picker';
import { Services, SetServices } from './services/types';
import { ServicesList } from './services/services_list';
import { SendFeedbackButton } from './feedback_buttons/send_feedback_button';
import { SetTopic, SelectedTopic, SetLocation, SelectedLocation } from './api_query_picker/types';

export const Application = (): JSX.Element => {
  let selectedTopic: SelectedTopic = {
    type: 'Topic',
    value: '',
  };
  let selectedLocation: SelectedLocation = {
    type: 'Location',
    value: '',
  };
  const [services, setServices]: [Services, SetServices] = useState<Services>({type: 'Services:Empty'});
  const [topic, setTopic]: [SelectedTopic, SetTopic] = useState(selectedTopic);
  const [location, setLocation]: [SelectedLocation, SetLocation] = useState(selectedLocation);
  return (
    <div>
      <ApiQueryPicker services={services} setServices={setServices} selectedTopic={topic} selectedLocation={location}
        setTopic={setTopic} setLocation={setLocation} />
      <ServicesList services={services} />
      <SendFeedbackButton />
    </div>
  );
};