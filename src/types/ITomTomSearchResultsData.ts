/*
    API Docs used for TypeMapping
    https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search#response-data

    I've only included the bare minimum for the current scope of works
*/

export interface ITomTomSearchResultAddress {
    streetNumber: string;
    streetName: string;
    countryCode: string;
    country: string;
    freeformAddress: string;
    municipality: string;
}

export interface ITomTomSearchResult {
    id: string;
    address: ITomTomSearchResultAddress;
    score: number;
}

export default interface ITomTomSearchResultsData {
    results: ITomTomSearchResult[];
}
