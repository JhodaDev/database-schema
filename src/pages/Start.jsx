import { streamText } from "ai";

import { IconProject } from "../components/icons/IconProject";
import { IconSend } from "../components/icons/IconSend";
import { Background } from "../components/ui/Background";
import { useState } from "react";
import useAIStore from "../store/aiStore";
import { useNavigate } from "react-router-dom";
import parseText, { getMarkdown, getNodes } from "../helpers/parseText";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import openai from "../helpers/openia";
import tableStore from "../store/tableStore";
import prompts from "../helpers/prompts";

export const Start = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const { setMarkdown, setJsonTables } = useAIStore((state) => state);
  const { setNodes } = tableStore();

  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const prompt = prompts.GENERATE_DB(value).prompt;

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

    const elements = parseText(str);
    const markdown = getMarkdown(str);
    setMarkdown(markdown);
    setJsonTables(elements);
    setNodes(getNodes(elements));

    navigate("/dashboard");
  };

  return (
    <Background>
      <div className="flex flex-col items-center text-white">
        <IconProject />
        <h1 className="text-4xl mt-4 font-bold">New Project</h1>
        <p className="mt-1">
          Create database schemas, optimize queries and much more
        </p>
        <form
          className="max-w-2xl w-full bg-[#181622] mt-6 py-2 px-4 rounded-md flex items-center gap-4"
          onSubmit={handleFormSubmit}
        >
          {!loading ? (
            <>
              <input
                type="text"
                placeholder="Create a SQL database with 2 tables"
                className="w-full h-full bg-transparent focus:outline-none"
                value={value}
                onChange={(event) => setValue(event.target.value)}
              />
              <button type="submit">
                <IconSend />
              </button>
            </>
          ) : (
            <div className="flex justify-center w-full">
              <div className="flex flex-col items-center">
                <Skeleton circle={true} height={40} width={40} />
                <Skeleton width={300} height={40} />
              </div>
            </div>
          )}
        </form>
      </div>
    </Background>
  );
};
