// tslint:disable: no-class no-this no-expression-statement
import { InvalidServices } from '../components/services/types';

export class ValidationException extends Error {
    constructor(m: string) {
        super(m);
        Object.setPrototypeOf(this, ValidationException.prototype);
    }
    buildErrorServiceType(): InvalidServices {
        return { type: 'Services:Error', errorMessage: this.message };
    }
}
