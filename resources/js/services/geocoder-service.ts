import axios from 'axios';

export class GeocoderService {
    static getSuggestions(query) {
        const url = this.getGeocodingUrl('suggest', '&beginHighlight=<b>&endHighlight=</b>');
        return axios.get(url, {
            params: {
                query: query
            }
        });
    }

    static getLocation(location_id) {
        const url = this.getGeocodingUrl('geocode');
        return axios.get(url, { params: { locationid: location_id } });
    }

    static getGeocodingUrl(type: 'suggest' | 'geocode', additional?: string) {
        let url = 'http://' + (type === 'suggest' ? 'autocomplete.' : '') + 'geocoder.api.here.com/6.2/' + type + '.json';
        url += '?app_id=' + process.env.API_HERE_APP_ID;
        url += '&app_code=' + process.env.API_HERE_APP_CODE;
        url += '&jsonattributes=1';
        url += '&gen=9';

        if (additional) {
            url += additional;
        }
        return url;
    }
}
