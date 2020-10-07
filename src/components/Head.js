import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

//title of page
export default function Head({ title }) {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  return <Helmet title={`${title} | ${data.site.siteMetadata.title}'s blog`} />;
}
