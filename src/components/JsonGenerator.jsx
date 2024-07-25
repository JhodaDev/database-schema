import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { streamText } from "ai";
import prompts from "../helpers/prompts";
import openai from "../helpers/openia";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import tableStore from "../store/tableStore";

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
  const [keyTables, setKeyTables] = useState([]);
  const [generatedText, setGeneratedText] = useState("");
  const { nodes } = tableStore();

  useEffect(() => {
    const keys = nodes.map((node) => ({
      value: node.table,
      label: node.table,
    }));
    setKeyTables(keys);
  }, [nodes]);

  const formik = useFormik({
    initialValues: {
      table: null,
      format: null,
      number: null,
    },
    onSubmit: async (values) => {
      const table = values.table.value;
      const fields = nodes.find((t) => t.table === table).data.fields;
      const obj = {};
      fields.forEach((field) => {
        const key = field.fields[0].value;
        const value = field.fields[1].value;

        obj[key] = value;
      });

      const data = {
        format: values.format.value,
        count: values.number.value,
        schema: { table, fields: obj },
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
    <div className="bg-[#2e2e2e] py-6 shadow-lg overflow-auto">
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-md mx-auto p-6 bg-[#3e3e3e] rounded-lg"
      >
        <div className="flex flex-col mb-6">
          <label className="text-white mb-2 font-semibold">
            Seleccione la tabla
          </label>
          <Select
            name="table"
            value={formik.values.table}
            options={keyTables}
            components={animatedComponents}
            className="text-black"
            onChange={(value) => formik.setFieldValue("table", value)}
          />
        </div>
        <div className="flex flex-col mb-6">
          <label className="text-white mb-2 font-semibold">Formato</label>
          <Select
            name="format"
            value={formik.values.format}
            options={lenguageValues}
            components={animatedComponents}
            className="text-black"
            onChange={(value) => formik.setFieldValue("format", value)}
          />
        </div>
        <div className="flex flex-col mb-6">
          <label className="text-white mb-2 font-semibold">
            Número de registros
          </label>
          <Select
            name="number"
            value={formik.values.number}
            options={numberValues}
            components={animatedComponents}
            className="text-black"
            onChange={(value) => formik.setFieldValue("number", value)}
          />
        </div>
        <button
          type="submit"
          className="bg-[#40CF8F] px-5 py-3 rounded-md font-semibold w-full text-white hover:bg-[#36b87a] transition-colors duration-300"
        >
          Generar
        </button>
      </form>
      <div className="max-w-lg mx-auto mt-8 shadow-md">
        {generatedText && (
          <>
            <div className="bg-[#3a3a3a] py-3 px-4 text-white rounded-tl-lg rounded-tr-lg font-semibold">
              <span>Resultado</span>
            </div>
            <div className="overflow-auto max-h-96 h-full bg-[#2e2e2e] p-4 rounded-bl-lg rounded-br-lg">
              <Markdown
                rehypePlugins={[rehypeHighlight, rehypeRaw]}
                className="text-white"
              >
                {generatedText}
              </Markdown>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
