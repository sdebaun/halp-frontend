import React from 'react';

import { asyncComponent } from '@jaredpalmer/after';

export default [
  {
    path: '/signin',
    component: asyncComponent({
      loader: () => import('./Signin.js'),
    })
  },
  {
    path: '/admin',
    component: asyncComponent({
      loader: () => import('./Admin'), // required
      Placeholder: () => <div>...LOADING...</div>, // this is optional, just returns null by default
    }),
  },
  {
    path: '/',
    component: asyncComponent({
      loader: () => import('./Home'), // required
      Placeholder: () => <div>...LOADING...</div>, // this is optional, just returns null by default
    }),
  },
];
