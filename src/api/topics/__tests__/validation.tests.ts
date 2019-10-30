// tslint:disable:no-expression-statement
import { aNumber, aString } from '../../../pathways-frontend/src/helpers/random_test_values';
import { validateTopicsArray } from '../validate';

describe('Topics response validation', () => {
    describe('with valid data', () => {
        it('passes schema validation', () => {
            const validator = validateTopicsArray([{
                id: aString(),
            }]);
            expect(validator.isValid).toBe(true);
        });
    });
    describe('with invalid data', () => {
        it('fails schema validation', () => {
            const validator = validateTopicsArray([{
                id: aNumber(),
            }]);
            expect(validator.isValid).toBe(false);
        });
    });
});