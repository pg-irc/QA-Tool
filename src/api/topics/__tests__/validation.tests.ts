// tslint:disable:no-expression-statement
import { aNumber, aString } from '../../../pathways-frontend/src/helpers/random_test_values';
import { validateIncomingData } from '../../validation';
import { topicsArray } from '../schema';

describe('Topics response validation', () => {
    describe('with valid data', () => {
        it('passes schema validation', () => {
            const validator = validateIncomingData(
                topicsArray,
                [{
                    id: aString(),
                }],
            );
            expect(validator.isValid).toBe(true);
        });
    });
    describe('with invalid data', () => {
        it('fails schema validation', () => {
            const validator = validateIncomingData(
                topicsArray,
                [{
                    id: aNumber(),
                }],
            );
            expect(validator.isValid).toBe(false);
        });
    });
});