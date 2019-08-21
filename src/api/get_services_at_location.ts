// tslint:disable:no-expression-statement
import axios from 'axios';
import { SelectedOption } from '../components/url_template/url_template';
import { ServiceMap, SetServices } from '../components/services/types';

export interface AxiosResponse {
    // tslint:disable-next-line:no-any
    readonly data: any;
 }

export const requestServicesAtLocation = 
    async (topic: SelectedOption, manualLocation: SelectedOption, setServices: SetServices): Promise<ServiceMap> => {
    const endpoint = 'services_at_location';
    const query = `user_location=${manualLocation}&related_to_topic=${topic}`;
    const url = buildUrl(endpoint, query);
    const response = await getServicesAtLocation(url);
    setServices(response);
    return response;
};

const getServicesAtLocation = async (url: string): Promise<ServiceMap> => {
    const data = await axios.get(url)
    // tslint:disable-next-line:no-any
      .then((response: any): ServiceMap => {
        return response;
    });
    return data;
};

const buildUrl = (endpoint: string, query: string): string => {
    const baseUrl = 'https://fierce-ravine-89308.herokuapp.com';
    const version = 'v1';
    return `${baseUrl}/${version}/${endpoint}?${query}`;
};