import PropTypes from "prop-types";
import { Handle, Position } from "@xyflow/react";
import { useRef, useState } from "react";
import tableStore from "../store/tableStore";
import { Diamon } from "./icons/Diamon";

export const Input = ({ id, position, valueInput = "Campo", ...props }) => {
  const { setActiveIndex } = tableStore();
  const [value, setValue] = useState(valueInput);
  const ref = useRef(null);
  const inputRef = useRef(null);

  const handleChange = (e) => setValue(e.target.value);

  const handleDoubleClick = () => {
    setActiveIndex(id);
    const current = ref.current;
    const input = inputRef.current;
    current.style.display = "none";
    input.focus();
  };

  const handleOnBlur = () => {
    const current = ref.current;
    const input = inputRef.current;
    current.style.display = "block";
    input.blur();
  };

  return (
    <div
      className={`w-full px-4 text-left select-none relative py-1 flex items-center gap-2`}
    >
      {position === "Left" && <Diamon />}
      <input
        type="text"
        className={`w-full focus:outline-none select-none bg-transparent border-none py-1 ${
          position === "Right" ? "text-right" : "text-left"
        } ${props.className}`}
        ref={inputRef}
        value={value}
        onChange={handleChange}
        onBlur={handleOnBlur}
      />
      <div
        className="w-full h-full absolute z-50 top-0 left-0"
        onDoubleClick={handleDoubleClick}
        ref={ref}
      ></div>
      {props.handle && (
        <>
          <Handle
            type="target"
            position={Position[position]}
            id={`${id}-target`}
          />
          <Handle
            type="source"
            position={Position[position]}
            id={`${id}-source`}
          />
        </>
      )}
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string,
  position: PropTypes.string,
  valueInput: PropTypes.string,
  bg: PropTypes.string,
  handle: PropTypes.bool,
  className: PropTypes.string,
};
