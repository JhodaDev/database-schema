import { Tooltip } from "react-tooltip";
import { IconTable } from "./icons/IconTable";
import tableStore from "../store/tableStore";
import { generateUUIDWithoutHyphens } from "../helpers/parseText";

export const AddTableButton = () => {
  const { nodes, setNodes } = tableStore();

  const handleClick = () => {
    const obj = {
      id: `${generateUUIDWithoutHyphens()}-global`,
      type: "table",
      position: { x: 0, y: 0 },
      data: {
        fields: [
          {
            id: generateUUIDWithoutHyphens(),
            fields: [
              {
                id: generateUUIDWithoutHyphens(),
                value: "campo",
              },
              {
                id: generateUUIDWithoutHyphens(),
                value: "string",
              },
            ],
          },
        ],
        table: "Nueva tabla",
      },
      table: "Nueva tabla",
      relationFields: false,
    };

    setNodes([...nodes, obj]);
  };

  return (
    <>
      <button
        className="focus:outline-none"
        data-tooltip-content="Add table"
        data-tooltip-id="add-table-tooltip"
        onClick={handleClick}
      >
        <IconTable />
      </button>
      <Tooltip
        id="add-table-tooltip"
        place="bottom"
        effect="solid"
        delayShow={500}
        variant="dark"
      />
    </>
  );
};
