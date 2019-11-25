// tslint:disable typedef
import { Location, Topic, ValidUser, ValidRelevancyScore } from './types';
import * as constants from './constants';
import * as helpers from '../application/helpers/make_types';

export const buildTopicIdType = (id: string) => (
    helpers.makeTypeWithId(constants.TOPIC_ID_SUCCESS, id)
);

export const buildEmptyTopicIdType = () => (
    helpers.makeEmptyType(constants.TOPIC_ID_EMPTY)
);

export const buildLocationIdType = (id: number) => (
    helpers.makeTypeWithId(constants.LOCATION_ID_SUCCESS, id)
);

export const buildEmptyLocationIdType = () => (
    helpers.makeEmptyType(constants.LOCATION_ID_EMPTY)
);

export const buildServicesLoadingType = () => (
    helpers.makeEmptyType(constants.SERVICES_LOADING)
);

export const buildAlgorithmsLoadingType = () => (
    helpers.makeEmptyType(constants.ALGORITHMS_LOADING)
);

export const buildLocationsLoadingType = () => (
    helpers.makeEmptyType(constants.LOCATIONS_LOADING)
);

export const buildTopicsLoadingType = () => (
    helpers.makeEmptyType(constants.TOPICS_LOADING)
);

export const buildEmptyServicesType = () => (
    helpers.makeEmptyType(constants.SERVICES_EMPTY)
);

export const buildEmptyAlgorithmsType = () => (
    helpers.makeEmptyType(constants.ALGORITHMS_EMPTY)
);

export const buildEmptyLocationsType = () => (
    helpers.makeEmptyType(constants.LOCATIONS_EMPTY)
);

export const buildEmptyTopicsType = () => (
    helpers.makeEmptyType(constants.TOPICS_EMPTY)
);

export const buildEmptyAlgorithmIdType = () => (
    helpers.makeEmptyType(constants.ALGORITHM_EMPTY)
);

export const buildEmptyTopicsCollectionType = () => (
    helpers.makeEmptyType(constants.TOPICS_COLLECTION_EMPTY)
);

export const buildEmptyLocationsCollectionType = () => (
    helpers.makeEmptyType(constants.LOCATIONS_COLLECTION_EMPTY)
);

export const buildEmptyRelevancyScoreType = () => (
    helpers.makeEmptyType(constants.RELEVANCY_SCORE_EMPTY)
);

export const buildInvalidAlgorithmsType = (errorMessage: string) => (
    helpers.makeTypeWithErrorMessage(constants.ALGORITHMS_ERROR, errorMessage)
);

export const buildInvalidLocationsType = (errorMessage: string) => (
    helpers.makeTypeWithErrorMessage(constants.LOCATIONS_ERROR, errorMessage)
);

export const buildInvalidTopicsType = (errorMessage: string) => (
    helpers.makeTypeWithErrorMessage(constants.TOPICS_ERROR, errorMessage)
);

export const buildInvalidServicesType = (errorMessage: string) => (
    helpers.makeTypeWithErrorMessage(constants.SERVICES_ERROR, errorMessage)
);

export const buildInvalidUserType = (errorMessage: string) => (
    helpers.makeTypeWithErrorMessage(constants.USER_INVALID, errorMessage)
);

export const buildInvalidRelevancyScoreType = (errorMessage: string) => (
    helpers.makeTypeWithErrorMessage(constants.RELEVANCY_SCORE_INVALID, errorMessage)
);

export const buildSuccessLocationsCollectionType = (locations: ReadonlyArray<Location>) => (
    helpers.makeTypeWithItems(constants.LOCATIONS_COLLECTION_SUCCESS, locations)
);

export const buildSuccessTopicsCollectionsType = (topics: ReadonlyArray<Topic>) => (
    helpers.makeTypeWithItems(constants.TOPICS_COLLECTION_SUCCESS, topics)
);

export const buildSuccessRelevancyScoreType = (relevancyScore: ValidRelevancyScore) => (
    { type: constants.RELEVANCY_SCORE_VALID, id: relevancyScore.value}
);

export const buildEmptyUserType = () => (
    helpers.makeEmptyType(constants.USER_EMPTY)
);

export const buildValidUserType = (token: string): ValidUser => (
    { type: constants.USER_VALID, token: token }
);
