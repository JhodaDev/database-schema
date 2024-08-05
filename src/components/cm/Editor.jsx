import PropTypes from "prop-types";
import { useCodeMirror } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { useEffect, useRef, useState } from "react";
import { githubLight } from "@uiw/codemirror-theme-github";
import * as prettier from "prettier/standalone";
import * as prettierPl from "prettier/parser-babel";
import * as prettierPluginEstree from "prettier/plugins/estree";
import prettierPluginSql from "prettier-plugin-sql";
import { sql } from "@codemirror/lang-sql";

const languages = {
  JS: {
    language: javascript,
    parser: "babel",
    plugins: [prettierPl, prettierPluginEstree],
  },
  SQL: {
    language: sql,
    parser: "sql",
    plugins: [prettierPluginSql],
  },
};

export const Editor = ({ code, language = "JS" }) => {
  const [formatted, setFormatted] = useState("");
  const editor = useRef(null);

  useEffect(() => {
    if (language.length) {
      (async () => {
        const formatted = await prettier.format(code, {
          parser: languages[language].parser,
          plugins: languages[language].plugins,
          printWidth: 65,
          tabWidth: 2,
          semi: false,
        });

        setFormatted(formatted);
      })();
    }
  }, [code, language]);

  const { setContainer } = useCodeMirror({
    container: editor.current,
    extensions: [languages[language]?.language()],
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

Editor.propTypes = {
  code: PropTypes.string.isRequired,
  language: PropTypes.string,
  format: PropTypes.boolean,
};
