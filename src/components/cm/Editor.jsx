import { useCodeMirror } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { useEffect, useRef, useState } from "react";
import { githubLight } from "@uiw/codemirror-theme-github";
import useAIStore from "../../store/aiStore";
import * as prettier from "prettier/standalone";
import * as prettierPl from "prettier/parser-babel";
import * as prettierPluginEstree from "prettier/plugins/estree";

export const Editor = () => {
  const { markdown } = useAIStore((state) => state);
  const [formatted, setFormatted] = useState("");
  const editor = useRef(null);

  useEffect(() => {
    (async () => {
      const formatted = await prettier.format(markdown, {
        parser: "babel",
        plugins: [prettierPl, prettierPluginEstree],
        printWidth: 65,
        tabWidth: 2,
        semi: false,
      });

      setFormatted(formatted);
    })();
  }, [markdown]);

  const { setContainer } = useCodeMirror({
    container: editor.current,
    extensions: [javascript()],
    value: formatted,
    height: "100%",
    theme: githubLight,
    editable: false,
    readOnly: true,
    basicSetup: {
      lineNumbers: false,
      foldGutter: false,
    },
  });

  useEffect(() => {
    if (editor.current) {
      setContainer(editor.current);
    }
  }, [setContainer]);

  return <div ref={editor} className="overflow-auto border-r-[1px]"></div>;
};
