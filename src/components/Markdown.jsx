import PropTypes from "prop-types";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import Markdown from "react-markdown";

import "highlight.js/styles/github-dark.css";

export const MarkdownComponente = ({ markdown }) => {
  return (
    <div className="overflow-auto content-code h-full">
      <Markdown rehypePlugins={[rehypeHighlight, rehypeRaw]}>
        {markdown}
      </Markdown>
    </div>
  );
};

MarkdownComponente.propTypes = {
  markdown: PropTypes.string,
};
