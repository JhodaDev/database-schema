import { IoMdCode } from "react-icons/io";
import { VscJson } from "react-icons/vsc";
import navigateStore from "../store/navigateStore";
import { Tooltip } from "react-tooltip";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { IconData } from "./icons/IconData";

const menu = [
  { href: "/dashboard", icon: <IoMdCode />, label: "Code" },
  { href: "/ai", icon: <VscJson />, label: "Generate data" },
  { href: "/generator", icon: <IconData />, label: "Generate data" },
];

export const LeftBar = () => {
  const [selected, setSelected] = useState(menu[0].label);
  const { setHref } = navigateStore();

  const handleClick = (href, label) => {};

  return (
    <div className="h-screen bg-[#1f1f1f] flex flex-col items-center text-white text-xl py-4 gap-3">
      {menu.map((item) => (
        <div
          className="w-full flex justify-center items-center h-9"
          key={crypto.randomUUID()}
        >
          <NavLink
            to={item.href}
            data-tooltip-content={item.label}
            data-tooltip-id={item.label}
            key={item.label}
            onClick={() => handleClick(item.href, item.label)}
            className={({ isActive }) =>
              isActive
                ? "bg-white text-black rounded-tl-md rounded-bl-md w-full flex justify-center items-center h-9 relative"
                : "w-full flex justify-center items-center h-9 relative"
            }
          >
            {item.icon}
          </NavLink>
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
