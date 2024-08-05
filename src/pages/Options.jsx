import { Link, useNavigate } from "react-router-dom";
import { LeftBar } from "../components/LeftBar";
useNavigate;
const options = [
  {
    title: "Generate Query",
    description:
      "Generate SQL query using everyday language and get data insights. Also NoSQL.",
  },
  {
    title: "Optimize Query",
    description:
      "Generate SQL query using everyday language and get data insights. Also NoSQL.",
  },
  {
    title: "Fix Query",
    description:
      "Generate SQL query using everyday language and get data insights. Also NoSQL.",
  },
  {
    title: "Explain Query",
    description:
      "Generate SQL query using everyday language and get data insights. Also NoSQL.",
  },
];

export const Options = () => {
  return (
    <div className="w-full h-screen grid grid-cols-table-2">
      <LeftBar />
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h2 className="mb-10 text-3xl">Hi, what would you like to do?</h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-4">
          {options.map((option, index) => (
            <Link
              to="/ai"
              key={index}
              className="border-[1px] px-12 py-6 rounded-md max-w-md w-full text-center hover:bg-gray-100 cursor-pointer"
            >
              <h3 className="text-2xl font-medium">{option.title}</h3>
              <hr className="my-4" />
              <p className="text-gray-500">{option.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
