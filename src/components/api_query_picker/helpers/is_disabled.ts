import { ApiQueryPickerProps } from '../api_query_picker';
import * as constants from '../../../application/constants';

export const isDisabled = (props: ApiQueryPickerProps): boolean => (
    props.topic.type !== constants.TOPIC_ID_SUCCESS || props.location.type !== constants.LOCATION_ID_SUCCESS
);