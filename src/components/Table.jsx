import { useState } from "react";
// import tableStore from "../store/tableStore";
import { Input } from "./Input";
import PropTypes from "prop-types";
import { generateUUIDWithoutHyphens } from "../helpers/parseText";
import { IconCube } from "./icons/IconCube";
import { IconAdd } from "./icons/IconAdd";

function Table({ data }) {
  const [items, setItems] = useState(data.fields);
  // const { activeIndex, setActiveIndex } = tableStore();

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

    // setActiveIndex(globalId);
  };

  return (
    <div className="">
      <div className="w-full text-center rounded-tr-lg rounded-lg bg-[#40CF8F] border-b-transparent px-1 pb-1">
        <div className="flex px-3 py-2 gap-2">
          <IconCube />
          <span className="font-medium">{data.table}</span>
        </div>
        <div className="w-full bg-white rounded-tl-md rounded-tr-md flex flex-col">
          {items.map((item) => (
            <div key={item.id} className="flex hover:bg-gray-100">
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
        <div
          className="py-2 bg-white flex items-center justify-center gap-2 rounded-bl-lg rounded-br-lg"
          onClick={handleAddField}
        >
          <IconAdd />
          <button className="text-gray-400 font-medium">Add Field</button>
        </div>
      </div>
    </div>
  );
}

Table.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Table;
