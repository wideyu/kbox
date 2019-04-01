import {fetch as fetchPolyfill} from 'whatwg-fetch';
import {Promise as promisePolyfill} from 'promise-polyfill';

if (!windows.fetch) {
  windows.fetch = fetchPolyfill;
}
if (!windows.Promise) {
  windows.Promise = promisePolyfill;
}
