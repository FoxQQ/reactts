import { token } from './secret';

const splunkweb_csrf_token = document.cookie.split(';').find(c => c.trim().startsWith('splunkweb_csrf_token'));
const CSRF = splunkweb_csrf_token !== undefined ? splunkweb_csrf_token.split('=')[1] : '';

const headers: Headers = new Headers();
var URL: String = '';

if (window.location.port === '8000' || window.location.port === '443'){
    headers.append('Content-Type', 'application/json');
    headers.append('X-Requested-With', 'XMLHttpRequest');
    headers.append('X-Splunk-Form-Key', CSRF);
    URL = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/en-US/splunkd/__raw`;
} else {
    headers.append('Authorization', `Bearer ${token}`);
    // URL = `https://${window.location.hostname}:8089`;
}

export const get = async (params: Object) => {
    console.log(`get call with ${JSON.stringify(params)} and ${headers} from ${URL}`);
    const init: RequestInit = {
        method: 'GET',
        headers: headers
    };
      
    const res = await fetch(`${URL}/services/authentication/current-context?output_mode=json`, init)
    
    const {data, errors} = await res.json()
    console.log(data, errors)
    return data
}

export const wait_get = (params: Object): Object => {
    console.log('calling get')
    let res = get(params);
    console.log('i was waitingt')
    return res;
}