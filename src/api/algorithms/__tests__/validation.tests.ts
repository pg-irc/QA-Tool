// tslint:disable:no-expression-statement
import { anInteger, aString } from '../../../pathways-frontend/src/helpers/random_test_values';
import { validateIncomingData } from '../../validation';
import { algorithmsArray } from '../schema';

describe('Algorithms response validation', () => {
    describe('with valid data', () => {
        it('passes schema validation', () => {
            const validator = validateIncomingData(
                algorithmsArray,
                [{
                    id: anInteger(),
                    url: aString(),
                    name: aString(),
                }],
            );
            expect(validator.isValid).toBe(true);
        });
    });
    describe('with invalid data', () => {
        it('fails schema validation', () => {
            const validator = validateIncomingData(
                algorithmsArray,
                [{
                    // id: anInteger(),
                    url: aString(),
                    name: aString(),
                }],
            );
            expect(validator.isValid).toBe(false);
        });
    });
});