import MapsApi from './maps-api';
import IPlaceAutoCompleteResult from './types/IPlaceAutoCompleteResult';

export async function getAutoCompleteDetails(
    address: string,
    countrySet: string[] = ['AU']
): Promise<IPlaceAutoCompleteResult[]> {
    // Change limit to 10, as this is for auto complete for an address
    const results = await MapsApi.getPlaceAutocomplete(address, {
        countrySet,
        limit: 10,
    });

    // No need to sort results as they come in DESC order from the API
    // Format the results to the desired output
    const formattedPlaces: IPlaceAutoCompleteResult[] =
        results.map<IPlaceAutoCompleteResult>((place) => {
            return {
                placeId: place.id,
                streetNumber: place.address.streetNumber,
                countryCode: place.address.countryCode,
                country: place.address.country,
                freeformAddress: place.address.freeformAddress,
                municipality: place.address.municipality,
            };
        });

    return formattedPlaces;
}
