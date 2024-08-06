import useAIStore from "../store/aiStore";
import { ItemTable } from "./ItemTable";

export const ListTables = () => {
  const { jsonTables } = useAIStore();

  return (
    <div className="w-full h-full border-r-[1px] px-4 py-8">
      <h3 className="font-medium mb-3">Tables</h3>
      {jsonTables.map((table, index) => {
        return (
          <ItemTable
            key={index}
            title={Object.keys(table)[0]}
            childrens={Object.values(table).map((item) => Object.keys(item))[0]}
          />
        );
      })}
    </div>
  );
};
