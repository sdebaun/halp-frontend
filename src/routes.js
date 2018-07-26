import React from 'react';

import { asyncComponent } from '@jaredpalmer/after';

export default [
  {
    path: '/',
    exact: true,
    component: asyncComponent({
      loader: () => import('./Home'), // required
      Placeholder: () => <div>...LOADING...</div>, // this is optional, just returns null by default
    }),
  },
  {
    path: '/signin',
    exact: true,
    component: asyncComponent({
      loader: () => import('./Signin'),
    })
  },
  {
    path: '/admin',
    exact: true,
    component: asyncComponent({
      loader: () => import('./Admin'), // required
      Placeholder: () => <div>...LOADING...</div>, // this is optional, just returns null by default
    }),
  },
];
