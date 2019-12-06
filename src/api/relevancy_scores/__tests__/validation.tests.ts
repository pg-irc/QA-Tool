// tslint:disable:no-expression-statement
import { aString, anInteger } from '../../../pathways-frontend/src/helpers/random_test_values';
import { validateIncomingData } from '../../validation';
import { relevancyScoreData } from '../schema';

describe('Relevancy response validation', () => {
    describe('with valid data', () => {
        it('passes schema validation', () => {
            const validator = validateIncomingData(
                relevancyScoreData,
                {
                    id: anInteger(),
                    value: anInteger(),
                    algorithm: anInteger(),
                    search_location: anInteger(),
                    service_at_location: anInteger(),
                    topic: aString(),
                },
            );
            expect(validator.isValid).toBe(true);
        });
    });
    describe('with invalid data', () => {
        it('fails schema validation', () => {
            const validator = validateIncomingData(
                relevancyScoreData,
                [{
                    // id: anInteger(),
                    value: anInteger(),
                    algorithm: anInteger(),
                    search_location: anInteger(),
                    service_at_location: anInteger(),
                    topic: aString(),
                }],
            );
            expect(validator.isValid).toBe(false);
        });
    });
});