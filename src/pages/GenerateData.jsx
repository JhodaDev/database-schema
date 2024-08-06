import Select from "react-select";
import { LeftBar } from "../components/LeftBar";
import useAIStore from "../store/aiStore";
import { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import prompts from "../helpers/prompts";
import { streamText } from "ai";
import openai from "../helpers/openia";
import { MarkdownComponente } from "../components/Markdown";

export const GenerateData = () => {
  const { jsonTables } = useAIStore();
  const [databases] = useState(() => {
    return jsonTables.map((table) => ({
      value: Object.keys(table)[0],
      label: Object.keys(table)[0],
    }));
  });
  const [markdown, setMarkdown] = useState("");
  const [fields, setFields] = useState([]);
  const [initComponent, setInitComponent] = useState(true);

  const formik = useFormik({
    initialValues: {
      database: "",
      format: "",
    },
    onSubmit: async (values) => {
      const obj = {
        format: values.format.value,
        count: 15,
        fields,
      };

      const prompt = prompts.GENERATE_DATA(JSON.stringify(obj));

      let str = "";
      setInitComponent(false);
      const { textStream } = await streamText({
        model: openai("gpt-4o"),
        prompt,
        maxTokens: 1000,
      });

      for await (const textPart of textStream) {
        str += textPart;
        setMarkdown(str);
      }
    },
  });

  const getFields = useCallback(
    (name) => {
      const table = jsonTables.find((item) => Object.keys(item)[0] === name);
      const [childrens] = Object.values(table);
      const fields = Object.keys(childrens).map((item) => {
        const value = childrens[item];
        if (typeof value === "object") {
          return {
            value: item,
            type: value.valueType.toLowerCase(),
          };
        }

        return {
          value: item,
          type: value.toLowerCase(),
        };
      });

      setFields(fields);
    },
    [jsonTables]
  );

  useEffect(() => {
    getFields(databases[0].value);
  }, [databases, getFields]);

  return (
    <div className="w-full h-screen grid grid-cols-table-2">
      <LeftBar />
      <div className="w-full h-creen flex flex-col justify-center items-center">
        <h2 className="text-3xl mb-4">Generate data</h2>
        <div className="w-full grid grid-cols-2 max-w-5xl gap-3">
          <form className="w-full" onSubmit={formik.handleSubmit}>
            <div className="flex gap-2">
              <div className="w-full">
                <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3 inline-block">
                  Select your database
                </span>
                <Select
                  name="database"
                  defaultValue={{ value: "asd", label: "123123" }}
                  options={databases}
                  value={formik.values.database}
                  onChange={(value) => {
                    formik.setFieldValue("database", value);
                    getFields(value.value);
                  }}
                />
              </div>
              <div className="w-full">
                <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3 inline-block">
                  Data format
                </span>
                <Select
                  name="format"
                  value={formik.values.format}
                  onChange={(value) => formik.setFieldValue("format", value)}
                  defaultValue={{ value: "SQL", label: "SQL" }}
                  className="text-sm"
                  options={[
                    { value: "SQL", label: "SQL" },
                    { value: "MongoDB", label: "MongoDB" },
                    { value: "JSON", label: "JSON" },
                    { value: "CSV", label: "CSV" },
                  ]}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="grid grid-cols-2 mt-4">
                <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3 inline-block">
                  Title
                </span>
                <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3 inline-block">
                  Type
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {fields.map((item, index) => (
                  <>
                    <div className="w-full border-[1px] px-3 py-1 rounded-md">
                      <span className="text-sm">{item.value}</span>
                    </div>
                    <div className="w-full border-[1px] px-3 py-1 rounded-md">
                      <span className="text-sm">{item.type}</span>
                    </div>
                  </>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="
              inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus:outline-none disabled:pointer-events-none 
              disabled:opacity-50 bg-[#40CF8F] text-white mt-4 text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3"
            >
              Generate Data
            </button>
          </form>

          <div>
            <div className="flex justify-end">
              <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3 inline-block">
                Select your database
              </span>
            </div>
            <div className="max-h-[450px] h-ato overflow-auto p-3 bg-gray-50 rounded-md">
              {initComponent ? (
                <span>Generation...</span>
              ) : (
                <MarkdownComponente markdown={markdown} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
