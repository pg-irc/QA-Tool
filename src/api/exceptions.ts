// tslint:disable: no-class no-this no-expression-statement
import { InvalidServices } from '../components/services/types';
import { InvalidLocations, InvalidTopics } from '../application/types';
import { InvalidAlgorithms } from './types';

export class ValidationException extends Error {
    constructor(m: string) {
        super(m);
        Object.setPrototypeOf(this, ValidationException.prototype);
    }
    buildErrorServiceType(): InvalidServices {
        return { type: 'Services:Error', errorMessage: this.message };
    }
    buildErrorLocationsType(): InvalidLocations {
        return { type: 'Locations:Error', errorMessage: this.message };
    }
    buildErrorTopicsType(): InvalidTopics {
        return { type: 'Topics:Error', errorMessage: this.message };
    }
    buildErrorAlgorithmsType(): InvalidAlgorithms {
        return { type: 'Algorithms:Error', errorMessage: this.message };
    }
}
