import axios from 'axios';
import ITomTomSearchResultsData, {
    ITomTomSearchResult,
} from './types/ITomTomSearchResultsData';
import { ITomTomSearchParams } from './types/ITomTomSearchParams';

export default class MapsApi {
    private static readonly _tomTomApiUrl = process.env.TOMTOM_API_URL;

    public static async tomTomGetApiRequest<T>(
        url: string,
        params?: object
    ): Promise<T> {
        const apiKey = process.env.TOMTOM_API_KEY;

        if (!apiKey || apiKey.trim() === '') {
            throw new Error(`TomTom API key not provided`);
        }

        if (!url || url.trim() === '') {
            throw new Error(`URL not provided`);
        }

        const result = await axios.get<T>(url, {
            params: { ...params, key: apiKey },
        });

        if (result.status != 200) {
            throw new Error(
                `TomTom API request failed HTTP Code ${result.status}`
            );
        }

        return result.data;
    }

    // https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search
    public static async getPlaceAutocomplete(
        address: string,
        params: ITomTomSearchParams
    ): Promise<ITomTomSearchResult[]> {
        if (address.trim() === '') {
            throw new Error('Address not provided');
        }

        const url = `${this._tomTomApiUrl}/search/2/search/${address}.json`;
        const autocomplete =
            await this.tomTomGetApiRequest<ITomTomSearchResultsData>(url, {
                ...params,
                countrySet: params.countrySet
                    ? params.countrySet.join(',')
                    : undefined,
            });

        return autocomplete.results;
    }
}
