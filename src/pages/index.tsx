import type { ReactNode } from "react";
import * as React from "react";
import { graphql, type HeadFC, type PageProps } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS } from "@contentful/rich-text-types";
import Query = Queries.Query;

const pageStyles = {
  padding: 96,
  fontSize: "18px",
  lineHeight: "24px",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
  maxWidth: "600px",
  margin: "0 auto",
};

const paragraphStyles = {
  marginBottom: "1.5em",
};

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_: unknown, children: ReactNode) => (
      <p style={paragraphStyles}>{children}</p>
    ),
  },
};

const IndexPage: React.FC<PageProps<Query>> = ({ data }) => {
  const introText = data.contentfulIntro?.body ?? null;
  const body =
    introText != null ? (
      renderRichText(introText as never, options)
    ) : (
      <p>There was a problem loading the content.</p>
    );

  return <main style={pageStyles}>{body}</main>;
};

export default IndexPage;

export const pageQuery = graphql`
  query {
    contentfulIntro {
      body {
        raw
      }
    }
  }
`;

export const Head: HeadFC = () => <title>Home Page</title>;
