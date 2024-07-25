import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import Markdown from "react-markdown";
import useAIStore from "../store/aiStore";

import "highlight.js/styles/github-dark.css";

export const MarkdownComponente = () => {
  const { markdown } = useAIStore((state) => state);
  return (
    <div className="overflow-auto content-code">
      <Markdown rehypePlugins={[rehypeHighlight, rehypeRaw]}>
        {markdown}
      </Markdown>
    </div>
  );
};
