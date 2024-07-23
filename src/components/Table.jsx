import { useState } from "react";
import tableStore from "../store/tableStore";
import { Input } from "./Input";
import PropTypes from "prop-types";
import { generateUUIDWithoutHyphens } from "../helpers/parseText";

function Table({ data }) {
  const [items, setItems] = useState(data);
  const { activeIndex, setActiveIndex } = tableStore();

  const handleAddField = () => {
    const globalId = generateUUIDWithoutHyphens();

    setItems((prev) => [
      ...prev,
      {
        id: globalId,
        fields: [
          { id: generateUUIDWithoutHyphens() },
          { id: generateUUIDWithoutHyphens() },
        ],
      },
    ]);

    setActiveIndex(globalId);
  };

  // ${
  //   item.id === activeIndex
  //     ? " border-cyan-500"
  //     : "border-transparent"
  // }

  return (
    <>
      <div className="w-full text-center py-2 rounded-tr-lg rounded-tl-lg bg-[#40CF8F] border-b-transparent">
        <h1>Column</h1>
      </div>
      <div className="w-full relative bg-white">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`flex items-center ${
              index % 2 === 0 ? "bg-[#292929]" : "bg-[#242424]"
            }`}
          >
            <Input
              key={`${item.fields[0].id}-left`}
              id={item.fields[0].id}
              position="Left"
              valueInput={item.fields[0].value}
            />
            <Input
              key={`${item.fields[1].id}-right`}
              id={item.fields[1].id}
              position="Right"
              valueInput={item.fields[1].value}
            />
          </div>
        ))}
      </div>
      <button
        onClick={handleAddField}
        className="w-full text-center bg-white py-1 rounded-bl-lg rounded-br-lg border border-1 "
      >
        Agregar campo
      </button>
    </>
  );
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Table;
