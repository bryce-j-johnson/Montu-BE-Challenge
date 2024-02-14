import { getAutoCompleteDetails } from '../src';
import MapsApi from '../src/maps-api';
import { ITomTomSearchResult } from '../src/types/ITomTomSearchResultsData';

jest.mock('../src/maps-api');

describe('Index', () => {
    let getPlaceAutocompleteSpy: jest.SpyInstance;

    const tomTomMockResultData: ITomTomSearchResult[] = [
        {
            id: 'placeId1',
            address: {
                streetNumber: 'streetNumber1',
                countryCode: 'AU',
                country: 'Australia',
                freeformAddress: 'Free Form Address',
                municipality: 'municipality',
            },
        } as ITomTomSearchResult,
    ];

    beforeEach(() => {
        jest.resetAllMocks();

        getPlaceAutocompleteSpy = jest
            .spyOn(MapsApi, 'getPlaceAutocomplete')
            .mockResolvedValue(tomTomMockResultData);
    });

    describe('getAutoCompleteDetails', () => {
        it('returns a promise', () => {
            const res = getAutoCompleteDetails('Charlotte Street');
            expect(res).toBeInstanceOf(Promise);
        });

        it('should call MapsApi.getPlaceAutocomplete correctly', async () => {
            await getAutoCompleteDetails('Charlotte Street');
            expect(getPlaceAutocompleteSpy).toHaveBeenCalledTimes(1);
            expect(getPlaceAutocompleteSpy).toHaveBeenCalledWith(
                'Charlotte Street',
                {
                    countrySet: ['AU'],
                    limit: 10,
                }
            );
        });

        it('should formats data returned from MapsApi correctly', async () => {
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
