import { getAutoCompleteDetails } from '../src';

// These are end-to-end tests and need an api key
describe('TomTom Places E2E Tests', () => {
    describe('getAutoCompleteDetails', () => {
        it('returns a promise', () => {
            const res = getAutoCompleteDetails('Charlotte Street');
            expect(res).toBeInstanceOf(Promise);
        });

        it('can fetch from the autocomplete api', async () => {
            const res = await getAutoCompleteDetails('Charlotte Street');
            const firstRes = res[0];
            expect(firstRes).toHaveProperty('placeId');
            expect(firstRes).toHaveProperty('streetNumber');
            expect(firstRes).toHaveProperty('countryCode');
            expect(firstRes).toHaveProperty('country');
            expect(firstRes).toHaveProperty('freeformAddress');
            expect(firstRes).toHaveProperty('municipality');
        });
    });
});
