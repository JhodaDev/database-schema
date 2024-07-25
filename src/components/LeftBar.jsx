import { IoMdCode } from "react-icons/io";
import { VscJson } from "react-icons/vsc";
import { JsonGenerator } from "./JsonGenerator";
import navigateStore from "../store/navigateStore";
import { MarkdownComponente } from "./Markdown";

const menu = [
  { component: MarkdownComponente, icon: <IoMdCode />, label: "Markdown" },
  { component: JsonGenerator, icon: <VscJson />, label: "Json" },
];

export const LeftBar = () => {
  const { setShowComponent } = navigateStore();

  const handleClick = (component) => {
    setShowComponent(component);
  };

  return (
    <div className="h-screen bg-[#1f1f1f] flex flex-col items-center text-white text-xl py-4 gap-6">
      {menu.map((item) => (
        <button key={item.label} onClick={() => handleClick(item.component)}>
          {item.icon}
        </button>
      ))}
    </div>
  );
};
