import { Tooltip } from "react-tooltip";
import { IconTable } from "./icons/IconTable";
import useAIStore from "../store/aiStore";

export const AddTableButton = () => {
  const { tables, setTables } = useAIStore((state) => state);

  const handleClick = () => {
    const obj = {
      "Nueva tabla": {
        campo: "string",
      },
    };

    setTables([...tables, obj]);
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
