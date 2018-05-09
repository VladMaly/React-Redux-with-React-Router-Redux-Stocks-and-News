/**
 * Just like our store, we configure a 'Root' component that is
 * required based on the env variable. This component is typically one
 * surrounded by a <Provider>.
 */
import RootProd from './Root.prod.js';
import RootDev from './Root.dev.js';

let loadedModule = null;

if (process.env.NODE_ENV === 'production') {
  loadedModule = RootProd;
} else {
  // loadedModule = require('./Root.dev.js');
  loadedModule = RootDev;
}

export const Root = loadedModule;
