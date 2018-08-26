import express from 'express';
import React from 'react';
import { Helmet } from 'react-helmet';
import { renderToString } from 'react-dom/server';
import { render } from '@jaredpalmer/after';
import Document from './Document';
import routes from './routes';
import createApolloClient from './createApolloClient';
import { ApolloProvider, getDataFromTree } from 'react-apollo';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {

    try {
      const client = createApolloClient({
        ssrMode: true,
        hostname: req.hostname,
      })
  
      const customRenderer = node => {
        const App = <ApolloProvider client={client}>{node}</ApolloProvider>;
        return getDataFromTree(App).then(() => {
          const initialApolloState = client.extract()
          const html = renderToString(App);
          const helmet = Helmet.renderStatic();
          return { html, helmet, initialApolloState }
        })
      }

      const html = await render({
        req,
        res,
        routes,
        assets,
        // Anything else you add here will be made available
        // within getInitialProps(ctx)
        // e.g a redux store...
        customRenderer,
        document: Document,
      });
      res.send(html);
    } catch (error) {
      console.log(error)
      res.json(error);
    }
  });

export default server;
