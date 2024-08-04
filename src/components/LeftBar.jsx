import { IoMdCode } from "react-icons/io";
import { VscJson } from "react-icons/vsc";
import { JsonGenerator } from "./JsonGenerator";
import navigateStore from "../store/navigateStore";
import { Tooltip } from "react-tooltip";
import { Editor } from "./cm/Editor";
import { useState } from "react";

const menu = [
  { component: Editor, icon: <IoMdCode />, label: "Markdown" },
  { component: JsonGenerator, icon: <VscJson />, label: "Generate data" },
];

export const LeftBar = () => {
  const [selected, setSelected] = useState(menu[0].label);
  const { setShowComponent } = navigateStore();

  const handleClick = (component, label) => {
    setShowComponent(component);
    setSelected(label);
  };

  return (
    <div className="h-screen bg-[#1f1f1f] flex flex-col items-center text-white text-xl py-4 gap-3">
      {menu.map((item) => (
        <div
          className={`
            w-full flex justify-center h-9 relative ${
              selected === item.label
                ? "bg-white text-black rounded-tl-md rounded-bl-md "
                : ""
            }`}
          key={crypto.randomUUID()}
        >
          <button
            data-tooltip-content={item.label}
            data-tooltip-id={item.label}
            key={item.label}
            onClick={() => handleClick(item.component, item.label)}
          >
            {item.icon}
          </button>
          <Tooltip
            id={item.label}
            place="right"
            effect="solid"
            delayShow={500}
            variant="dark"
            className="z-50"
          />
        </div>
      ))}
    </div>
  );
};
