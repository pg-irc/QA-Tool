// tslint:disable:no-expression-statement
import { aString, aNumber } from '../../../pathways-frontend/src/helpers/random_test_values';
import { validateIncomingToken } from '../../validation';

describe('Login response validation', () => {
    describe('with valid data', () => {
        it('passes schema validation', () => {
            const validator = validateIncomingToken(
                {
                    token: aString(),
                },
            );
            expect(validator.isValid).toBe(true);
        });
    });
    describe('with invalid data', () => {
        it('fails schema validation', () => {
            const validator = validateIncomingToken(
                {
                    token: aNumber(),
                },
            );
            expect(validator.isValid).toBe(false);
        });
    });
});