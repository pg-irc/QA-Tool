import { Dispatch, SetStateAction } from 'react';

export interface Location {
    readonly type: 'LOCATION';
    readonly id: number;
    readonly name: string;
    readonly latitude: number;
    readonly longitude: number;
}

export interface EmptyLocations {
    readonly type: 'LOCATIONS:EMPTY';
}

export interface ValidLocations {
    readonly type: 'LOCATIONS:SUCCESS';
    readonly locations: ReadonlyArray<Location>;
}

export interface InvalidLocations {
    readonly type: 'LOCATIONS:ERROR';
    readonly errorMessage: string;
}

export interface LoadingLocations {
    readonly type: 'LOCATIONS:LOADING';
}

export type Locations = ValidLocations | InvalidLocations | LoadingLocations | EmptyLocations;

export type SetLocations = Dispatch<SetStateAction<Locations>>;

export interface Topic {
    readonly type: 'TOPIC';
    readonly id: string;
}

export interface EmptyTopics {
    readonly type: 'TOPICS:EMPTY';
}

export interface ValidTopics {
    readonly type: 'TOPICS:SUCCESS';
    readonly topics: ReadonlyArray<Topic>;
}

export interface InvalidTopics {
    readonly type: 'TOPICS:ERROR';
    readonly errorMessage: string;
}

export interface LoadingTopics {
    readonly type: 'TOPICS:LOADING';
}

export type Topics = ValidTopics | InvalidTopics | LoadingTopics | EmptyTopics;

export type SetTopics = Dispatch<SetStateAction<Topics>>;

export interface EmptyAlgorithmId {
    readonly type: 'ALGORITHM:EMPTY';
}

export interface ValidAlgorithmId {
    readonly type: 'ALGORITHM:SUCCESS';
    readonly id: number;
}

export type AlgorithmId = EmptyAlgorithmId | ValidAlgorithmId;

export interface Algorithm {
    readonly id: AlgorithmId;
    readonly url: string;
    readonly name?: string;
    readonly notes?: string;
}

export type SetAlgorithms = Dispatch<SetStateAction<Algorithms>>;
export type SetAlgorithmId = Dispatch<SetStateAction<AlgorithmId>>;

export interface EmptyAlgorithms {
    readonly type: 'ALGORITHMS:EMPTY';
}

export interface ValidAlgorithms {
    readonly type: 'ALGORITHMS:SUCCESS';
    readonly algorithms: ReadonlyArray<Algorithm>;
}

export interface InvalidAlgorithms {
    readonly type: 'ALGORITHMS:ERROR';
    readonly errorMessage: string;
}

export interface LoadingAlgorithms {
    readonly type: 'ALGORITHMS:LOADING';
}

export type Algorithms = ValidAlgorithms | InvalidAlgorithms | LoadingAlgorithms | EmptyAlgorithms;

export type ScoreValue = string;

export interface PhoneNumber {
    readonly type: string;
    readonly phoneNumber: string;
}

export interface Address {
    readonly id: number;
    readonly type: string;
    readonly address: string;
    readonly city: string;
    readonly stateProvince: string;
    readonly postalCode: string;
    readonly country: string;
}

export interface Service {
    readonly id: string;
    readonly latitude?: number;
    readonly longitude?: number;
    readonly name: string;
    readonly description: string;
    readonly phoneNumbers: ReadonlyArray<PhoneNumber>;
    readonly addresses: ReadonlyArray<Address>;
    readonly website: string;
    readonly email: string;
    readonly organizationName: string;
    readonly type?: string;
}

export type SetServices = Dispatch<SetStateAction<Services>>;

export interface EmptyServices {
    readonly type: 'SERVICES:EMPTY';
}

export interface ValidServices {
    readonly type: 'SERVICES:SUCCESS';
    readonly services: ReadonlyArray<Service>;
}

export interface InvalidServices {
    readonly type: 'SERVICES:ERROR';
    readonly errorMessage: string;
}

export interface LoadingServices {
    readonly type: 'SERVICES:LOADING';
}

export type Services = ValidServices | InvalidServices | LoadingServices | EmptyServices;

export interface ValidatedPhoneNumberJSON {
    readonly phone_number_type: string;
    readonly phone_number: string;
}

export interface ValidatedAddressJSON {
    readonly id: number;
    readonly address: string;
    readonly city: string;
    readonly state_province: string;
    readonly postal_code: string;
    readonly country: string;
}

export interface ValidatedAddressWithTypeJSON {
    readonly address_type: string;
    readonly address: ValidatedAddressJSON;
}

export interface ValidatedServiceJSON {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly organization_url: string;
    readonly organization_email: string;
    readonly organization_name: string;
}

export interface ValidatedLocationJSON {
    readonly latitude?: number;
    readonly longitude?: number;
    readonly phone_numbers: ReadonlyArray<ValidatedPhoneNumberJSON>;
    readonly addresses: ReadonlyArray<ValidatedAddressWithTypeJSON>;
}

export interface ValidatedServiceAtLocationJSON {
    readonly id: number;
    readonly service: ValidatedServiceJSON;
    readonly location: ValidatedLocationJSON;
}

export interface EmptyUser {
    readonly type: 'USER:EMPTY';
}
export interface ValidUser {
    readonly type: 'USER:VALID';
    readonly token: string;
}

export interface InvalidUser {
    readonly type: 'USER:INVALID';
}

export type User = EmptyUser | ValidUser | InvalidUser;

export type SetUser = Dispatch<SetStateAction<User>>;

export interface UserProps {
    readonly user: User;
    readonly setUser: SetUser;
}