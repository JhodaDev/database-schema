import { useFormik } from "formik";
import { Editor } from "../components/cm/Editor";
import { LeftBar } from "../components/LeftBar";
import useAIStore from "../store/aiStore";
import prompts from "../helpers/prompts";
import { streamText } from "ai";
import openai from "../helpers/openia";
import { useState } from "react";
import { ListTables } from "../components/ListTables";
import Select from "react-select";

export const AI = () => {
  const { jsonTables } = useAIStore();
  const [responseText, setResponseText] = useState("");
  const [language, setLaguange] = useState("");
  const [loading, setLoading] = useState(false);
  const [initComponent, setInitComponent] = useState(true);

  const formik = useFormik({
    initialValues: {
      query: "",
      language: "",
    },
    onSubmit: async (values) => {
      const prompt = prompts.GENERATE_QUERY(
        JSON.stringify(jsonTables),
        values.query,
        values.language.value
      );
      let str = "";

      setLoading(true);
      const { textStream } = await streamText({
        model: openai("gpt-4o"),
        prompt,
        maxTokens: 1000,
      });

      for await (const textPart of textStream) {
        str += textPart;
      }

      console.log(values.language.value);

      setLoading(false);
      const responseJson = JSON.parse(str);
      setResponseText(responseJson.query);
      setLaguange(values.language.value);
      setInitComponent(false);
    },
  });

  return (
    <div className="w-full h-screen grid grid-cols-table-3">
      <LeftBar />
      <ListTables />
      <div className="flex flex-col justify-center items-center max-w-7xl mx-auto w-full">
        <h2 className="text-3xl mb-4">Optimize Your Query</h2>
        <span className="mb-10">Make queries perform better.</span>
        <div className="grid grid-cols-2 gap-x-4 w-full">
          <form onSubmit={formik.handleSubmit}>
            <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3 inline-block">
              Select your database
            </span>

            <div className="mb-4 text-sm">
              <Select
                name="language"
                value={formik.values.language}
                onChange={(value) => formik.setFieldValue("language", value)}
                defaultValue="Example"
                options={[
                  { value: "SQL", label: "SQL" },
                  { value: "SHELL", label: "MongoDB" },
                ]}
              />
            </div>
            <textarea
              placeholder="Obtener los nombres de los empleados que están trabajando en un proyecto específico, junto con el título del puesto que ocupan y el nombre del departamento al que pertenecen."
              value={formik.values.query}
              onChange={formik.handleChange}
              name="query"
              className="
                flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background 
                placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
                focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-sm"
            ></textarea>
            <button
              type="submit"
              className="
              inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus:outline-none disabled:pointer-events-none 
              disabled:opacity-50 bg-[#40CF8F] text-white mt-4 text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3"
            >
              Generate Query
            </button>
          </form>
          <div className="w-full">
            <div className="flex justify-end mb-2">
              <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3 inline-block">
                Result
              </span>
            </div>
            <div className="p-3 bg-gray-50 rounded-md font-light text-gray-500">
              {loading ? (
                <span>Cargando...</span>
              ) : initComponent ? (
                <span>Generation...</span>
              ) : (
                <div className=" max-h-[450px] h-full overflow-auto">
                  <Editor
                    language={language}
                    code={responseText}
                    format={false}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
