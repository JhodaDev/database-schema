import { IoMdCode } from "react-icons/io";
import { VscJson } from "react-icons/vsc";
import navigateStore from "../store/navigateStore";
import { Tooltip } from "react-tooltip";
import { useState } from "react";
import { Link } from "react-router-dom";

const menu = [
  { href: "/dashboard", icon: <IoMdCode />, label: "Code" },
  { href: "/ai", icon: <VscJson />, label: "Generate data" },
];

export const LeftBar = () => {
  const [selected, setSelected] = useState(menu[0].label);
  const { setHref } = navigateStore();

  const handleClick = (href, label) => {
    setHref(href);
    setSelected(label);
  };

  return (
    <div className="h-screen bg-[#1f1f1f] flex flex-col items-center text-white text-xl py-4 gap-3">
      {menu.map((item) => (
        <div
          className={`
            w-full flex justify-center items-center h-9 relative ${
              selected === item.label
                ? "bg-white text-black rounded-tl-md rounded-bl-md "
                : ""
            }`}
          key={crypto.randomUUID()}
        >
          <Link
            to={item.href}
            data-tooltip-content={item.label}
            data-tooltip-id={item.label}
            key={item.label}
            onClick={() => handleClick(item.href, item.label)}
          >
            {item.icon}
          </Link>
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
