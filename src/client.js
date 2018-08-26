import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ensureReady, After } from '@jaredpalmer/after';
import './client.css';
import 'semantic-ui-offline/semantic.min.css';
import routes from './routes';
import createApolloClient from './createApolloClient';
import { ApolloProvider } from 'react-apollo';

const client = createApolloClient({
  ssrMode: false,
  hostname: window.location.hostname,
})

ensureReady(routes).then(data =>
  hydrate(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <After data={data} routes={routes} />
      </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('root')
  )
);

if (module.hot) {
  module.hot.accept();
}
