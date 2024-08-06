import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { IconTable } from "./icons/IconTable";
import { useState } from "react";
import { IconJPG } from "./icons/IconJPG";
import { IconField } from "./icons/IconField";

export const ItemTable = ({ title, childrens }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mb-2">
      <div
        className="flex items-center gap-2 cursor-pointer select-none"
        onClick={handleToggle}
      >
        <IconTable fill="#40CF8F" />
        <span className="text-sm">{title}</span>
      </div>
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
        style={{ overflow: "hidden" }}
        className="px-4"
      >
        <ul className="flex flex-col">
          {childrens.map((title, index) => (
            <li key={index} className="flex items-center text-sm gap-2 my-1">
              <IconField fill="#40CF8F" />
              <span>{title}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

ItemTable.propTypes = {
  title: PropTypes.string,
  childrens: PropTypes.array,
};
