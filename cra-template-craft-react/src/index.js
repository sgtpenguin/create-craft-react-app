import lazySizes from "lazysizes";
import React from "react";
import { render, hydrate } from "react-dom";
import App from "components/app";
import { BrowserRouter } from "react-router-dom";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import { InMemoryCache } from "apollo-cache-inmemory";
import { IntrospectionFragmentMatcher } from "apollo-cache-inmemory";
import introspectionQueryResultData from "fragmentTypes.json";

import "./index.css";

import * as serviceWorker from "./serviceWorker";

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const cache = new InMemoryCache({ fragmentMatcher });

export const client = new ApolloClient({
  uri: "/api",
  headers: {
    "X-Craft-Token": window.location.search.match(/\btoken=([^&]+)/)
      ? window.location.search.match(/\btoken=([^&]+)/)[1]
      : "",
  },
  cache,
});

const renderMethod = !!module.hot ? render : hydrate;

lazySizes.init();

renderMethod(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
