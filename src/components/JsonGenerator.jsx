import Select from "react-select";
import makeAnimated from "react-select/animated";
import useAIStore from "../store/aiStore";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { streamText } from "ai";
import prompts from "../helpers/prompts";
import openai from "../helpers/openia";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";

const animatedComponents = makeAnimated();

const lenguageValues = [
  { value: "sql", label: "SQL" },
  { value: "mongodb", label: "MongoDB" },
  { value: "csv", label: "CSV" },
  { value: "json", label: "JSON" },
];

const numberValues = [
  { value: 10, label: "10" },
  { value: 20, label: "20" },
];

export const JsonGenerator = () => {
  const { tables } = useAIStore();
  const [keyTables, setKeyTables] = useState([]);
  const [generatedText, setGeneratedText] = useState("");

  useEffect(() => {
    const keys = tables.map((table) => {
      return { value: Object.keys(table)[0], label: Object.keys(table)[0] };
    });
    setKeyTables(keys);
  }, [tables]);

  const formik = useFormik({
    initialValues: {
      table: null,
      format: null,
      number: null,
    },
    onSubmit: async (values) => {
      const table = values.table.value;
      const fields = tables.find((t) => Object.keys(t)[0] === table)[table];
      const schema = { table, fields };

      const data = {
        format: values.format.value,
        count: values.number.value,
        schema,
      };

      const prompt = prompts.GENARATE_DATA(data).prompt;
      const { textStream } = await streamText({
        model: openai("gpt-4o"),
        prompt,
        maxTokens: 1000,
        temperature: 1.1,
        presencePenalty: 0.75,
      });

      setGeneratedText("");
      for await (const textPart of textStream) {
        setGeneratedText((prev) => prev + textPart);
      }
    },
  });

  return (
    <div className="bg-[#1c1c1c] py-4 shadow overflow-auto">
      <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto">
        <div className="flex flex-col mb-4">
          <span className="text-white mb-2 inline-block">
            Seleccione la tabla
          </span>
          <Select
            name="table"
            value={formik.values.table}
            onChange={(option) => formik.setFieldValue("table", option)}
            options={keyTables}
            components={animatedComponents}
          />
        </div>
        <div className="flex flex-col mb-4">
          <span className="text-white mb-2 inline-block">Formato</span>
          <Select
            name="format"
            value={formik.values.format}
            onChange={(option) => formik.setFieldValue("format", option)}
            options={lenguageValues}
            components={animatedComponents}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-white mb-2 inline-block">
            Numero de registros
          </span>
          <Select
            name="number"
            value={formik.values.number}
            onChange={(option) => formik.setFieldValue("number", option)}
            options={numberValues}
            components={animatedComponents}
          />
        </div>
        <button
          type="submit"
          className="bg-[#40CF8F] px-5 py-2 rounded-md mt-5 font-medium w-full text-white"
        >
          Generar
        </button>
      </form>
      <div className="max-w-lg mx-auto mt-8 shadow-md shadow-[#27272794]">
        {generatedText && (
          <>
            <div className="bg-[#1f1f1f] py-2 px-4 text-white rounded-tl-sm rounded-tr-sm">
              <span>bash</span>
            </div>
            <div className="overflow-auto max-h-96 h-full">
              <Markdown rehypePlugins={[rehypeHighlight, rehypeRaw]}>
                {generatedText}
              </Markdown>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
