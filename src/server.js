import React from 'react';
import express from 'express';
import { render } from '@jaredpalmer/after';
import routes from './routes';
import { renderToString } from 'react-dom/server';
import Document from './Document';
import { Helmet } from 'react-helmet';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {

    try {
      const customRenderer = node => {
        // const App = <div>{node}</div>;
        const App = node;
        const html = renderToString(App);
        const helmet = Helmet.renderStatic();
        return { html, helmet }
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
      // res.send(error);
    }
  });

export default server;
