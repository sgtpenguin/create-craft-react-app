import React from "react";
import { Link as RouterLink } from "react-router-dom";
import ReactGA from "react-ga";

const Link = ({ url, text, element, children, __typename, type, ...rest }) => {
  switch (type) {
    case "entry":
      return (
        <RouterLink
          to={`/${element.uri === "__home__" ? "" : element.uri}`}
          {...rest}
        >
          {children || text}
        </RouterLink>
      );

    case "asset":
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          {...rest}
          onClick={() => {
            ReactGA.event({
              category: "Download",
              action: "Download",
              label: element.title || url,
            });
          }}
        >
          {children || text}
        </a>
      );

    default:
      return (
        <ReactGA.OutboundLink
          to={url}
          target="_blank"
          rel="noopener noreferrer"
          eventLabel={url}
          {...rest}
        >
          {children || text}
        </ReactGA.OutboundLink>
      );
  }
};

export default Link;
