/**
 * Based on the current environment variable, we need to make sure
 * to exclude any DevTools-related code from the production builds.
 * The code is envify'd - using 'DefinePlugin' in Webpack.
 */
import configureDev from './configureStore.dev';
import configureProd from './configureStore.prod';

let loadedStore = null;

if (process.env.NODE_ENV === 'production') {
  loadedStore = configureProd;
} else {
  loadedStore = configureDev;
}

export const configureStore = loadedStore;
