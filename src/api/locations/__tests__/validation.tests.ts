// tslint:disable:no-expression-statement
import { aNumber, aString, anInteger } from '../../../pathways-frontend/src/helpers/random_test_values';
import { validateLocationsArray } from '../validate';

describe('Locations response validation', () => {
    describe('with valid data', () => {
        it('passes schema validation', () => {
            const validator = validateLocationsArray([{
                id: anInteger(),
                name: aString(),
                latitude: aNumber(),
                longitude: aNumber(),
            }]);
            expect(validator.isValid).toBe(true);
        });
    });
    describe('with invalid data', () => {
        it('fails schema validation', () => {
            const validator = validateLocationsArray([{
                id: aNumber(),
                name: aString(),
                latitude: aString(),
                longitude: aString(),
            }]);
            expect(validator.isValid).toBe(false);
        });
    });
});