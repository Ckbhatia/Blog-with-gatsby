import React, { useContext } from "react";
import { useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import Context from "../context";

export default function Footer() {
  const { isDay } = useContext(Context);

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author
        }
      }
    }
  `);

  return (
    <FooterElement
      className={`footer-main-container footer-bg-${isDay ? "light" : "dark"}`}
    >
      <div className="footer-container">
        <span className="footer-text">
          2020 @ {data.site.siteMetadata.author}'s blog
        </span>
      </div>
    </FooterElement>
  );
}



const FooterElement = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 6rem;
  .footer-text {
    font-size: 1rem;
    color: #a6adc9;
  }
`;
