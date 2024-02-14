import MapsApi from '../src/maps-api';
import axios from 'axios';

describe('MapsApi', () => {
    let axiosGetSpy: jest.SpyInstance;
    const OLD_ENV = process.env;

    beforeEach(() => {
        jest.resetAllMocks();

        axiosGetSpy = jest.spyOn(axios, 'get').mockResolvedValue({
            status: 200,
            data: [],
        });
        process.env = { ...OLD_ENV };
    });

    afterAll(() => {
        process.env = OLD_ENV;
    });

    describe('tomTomGetApiRequest', () => {
        it('should throw an error if TomTomAPI key env var is undefiend', async () => {
            expect.assertions(2);

            process.env.TOMTOM_API_KEY = undefined;

            try {
                await MapsApi.tomTomGetApiRequest('asfasffasfasafsafs', {
                    countrySet: ['AU'],
                });
            } catch (ex) {
                expect(ex).toBeInstanceOf(Error);
                expect((ex as Error).message).toEqual(
                    'TomTom API key not provided'
                );
            }
        });

        it('should throw an error if TomTomAPI key env var is empty', async () => {
            expect.assertions(2);

            process.env.TOMTOM_API_KEY = '';

            try {
                await MapsApi.tomTomGetApiRequest('asfasffasfasafsafs', {
                    countrySet: ['AU'],
                });
            } catch (ex) {
                expect(ex).toBeInstanceOf(Error);
                expect((ex as Error).message).toEqual(
                    'TomTom API key not provided'
                );
            }
        });

        it('should throw an error if url is empty', async () => {
            expect.assertions(2);

            try {
                await MapsApi.tomTomGetApiRequest('', {
                    countrySet: ['AU'],
                });
            } catch (ex) {
                expect(ex).toBeInstanceOf(Error);
                expect((ex as Error).message).toEqual('URL not provided');
            }
        });

        it('should call axios.get correctly', async () => {
            await MapsApi.tomTomGetApiRequest('asfasffasfasafsafs', {
                countrySet: 'AU',
            });

            expect(axiosGetSpy).toHaveBeenCalledTimes(1);
            expect(axiosGetSpy).toHaveBeenLastCalledWith('asfasffasfasafsafs', {
                params: {
                    countrySet: 'AU',
                    key: process.env.TOMTOM_API_KEY,
                },
            });
        });

        it('should throw an error if axios.get returns status !== 200', async () => {
            expect.assertions(2);
            axiosGetSpy.mockResolvedValueOnce({
                status: 201,
            });

            try {
                await MapsApi.tomTomGetApiRequest('asfasffasfasafsafs', {
                    countrySet: ['AU'],
                });
            } catch (ex) {
                expect(ex).toBeInstanceOf(Error);
                expect((ex as Error).message).toEqual(
                    `TomTom API request failed HTTP Code 201`
                );
            }
        });
    });

    describe('getPlaceAutocomplete', () => {
        let tomTomGetApiRequestSpy: jest.SpyInstance;

        beforeEach(() => {
            tomTomGetApiRequestSpy = jest
                .spyOn(MapsApi, 'tomTomGetApiRequest')
                .mockResolvedValue([]);
        });

        afterAll(() => {
            tomTomGetApiRequestSpy.mockRestore();
        });

        it('should throw an error if address is empty', async () => {
            expect.assertions(2);
            axiosGetSpy.mockResolvedValueOnce({
                status: 201,
            });

            try {
                await MapsApi.getPlaceAutocomplete('', {
                    countrySet: ['AU'],
                });
            } catch (ex) {
                expect(ex).toBeInstanceOf(Error);
                expect((ex as Error).message).toEqual(`Address not provided`);
            }
        });

        it('should call tomTomGetApiRequest correctly with countrySet', async () => {
            axiosGetSpy.mockResolvedValueOnce({
                status: 201,
            });

            await MapsApi.getPlaceAutocomplete('address', {
                limit: 999,
                countrySet: ['AU'],
            });

            expect(tomTomGetApiRequestSpy).toHaveBeenCalledTimes(1);
            expect(tomTomGetApiRequestSpy).toHaveBeenCalledWith(
                'https://api.tomtom.com/search/2/search/address.json',
                {
                    limit: 999,
                    countrySet: 'AU',
                }
            );
        });

        it('should call tomTomGetApiRequest correctly without countrySet', async () => {
            axiosGetSpy.mockResolvedValueOnce({
                status: 201,
            });

            await MapsApi.getPlaceAutocomplete('address', {
                limit: 999,
            });

            expect(tomTomGetApiRequestSpy).toHaveBeenCalledTimes(1);
            expect(tomTomGetApiRequestSpy).toHaveBeenCalledWith(
                'https://api.tomtom.com/search/2/search/address.json',
                {
                    limit: 999,
                    countrySet: undefined,
                }
            );
        });
    });
});
