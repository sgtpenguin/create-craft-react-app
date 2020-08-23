import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-common";

import fetch from "node-fetch";
import Layout from "components/app";
import { getDataFromTree } from "@apollo/react-ssr";
import createApolloClient from "create-apollo-client";

const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });

const SEOMATIC_ENDPOINT = `${process.env.DEFAULT_SITE_URL}/actions/seomatic/meta-container/all-meta-containers/?uri=`;

export default (req, res, next) => {
  // point to the html file created by CRA's build tool
  const filePath = path.resolve(__dirname, "..", "..", "build", "index.html");
  const client = createApolloClient({ baseUrl: process.env.DEFAULT_SITE_URL });

  fs.readFile(filePath, "utf8", (err, htmlData) => {
    if (err) {
      console.error("err", err);
      return res.status(404).end();
    }

    const context = {};

    const App = (
      <ApolloProvider client={client}>
        <StaticRouter context={context} location={req.url}>
          <Layout />
        </StaticRouter>
      </ApolloProvider>
    );

    getDataFromTree(App).then(() => {
      const initialState = client.extract();

      // render the app as a string
      const html = ReactDOMServer.renderToString(App);

      htmlData = htmlData.replace(
        '<div id="root"></div>',
        `<div id="root">${html}</div>
        <script>window.__APOLLO_STATE__ = ${JSON.stringify(
          initialState
        )};</script>`
      );

      const seoEndpoint = `${SEOMATIC_ENDPOINT}${req.url.replace(
        "index.html",
        ""
      )}`;
      const seo = fetch(seoEndpoint)
        .then((res) => res.json())
        .catch((err) => {
          console.log(err);
        });

      const dataRequirements = [seo];

      Promise.all(dataRequirements)
        .then(([seo]) => {
          const seoTags = [
            seo["MetaTitleContainer"],
            seo["MetaTagContainer"],
            seo["MetaLinkContainer"],
            seo["MetaJsonLdContainer"],
          ].join("");

          htmlData = htmlData.replace('<meta name="ssr">', seoTags);

          res.send(htmlData);
        })
        .catch(() => {
          res.send(htmlData);
        });
    });
  });
};
