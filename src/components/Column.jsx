import { useState } from "react";
import { Input } from "./Input";
import tableStore from "../store/tableStore";

const DEFAULT_ITEMS = [
  {
    id: crypto.randomUUID(),
    fields: [{ id: crypto.randomUUID() }, { id: crypto.randomUUID() }],
  },
  {
    id: crypto.randomUUID(),
    fields: [{ id: crypto.randomUUID() }, { id: crypto.randomUUID() }],
  },
  {
    id: crypto.randomUUID(),
    fields: [{ id: crypto.randomUUID() }, { id: crypto.randomUUID() }],
  },
  {
    id: crypto.randomUUID(),
    fields: [{ id: crypto.randomUUID() }, { id: crypto.randomUUID() }],
  },
];

export const Column = () => {
  const [items, setItems] = useState(DEFAULT_ITEMS);
  const { activeIndex, setActiveIndex } = tableStore();

  const handleAddField = () => {
    const globalId = crypto.randomUUID();

    setItems((prev) => [
      ...prev,
      {
        id: globalId,
        fields: [{ id: crypto.randomUUID() }, { id: crypto.randomUUID() }],
      },
    ]);

    setActiveIndex(globalId);
  };

  return (
    <>
      <div className="w-full relative bg-white before:h-full before:w-[1px]">
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex items-center border border-1 ${
              item.id === activeIndex
                ? " border-cyan-500"
                : "border-transparent"
            }`}
          >
            <Input key={item.fields[0].id} id={item.id} position="Left" />
            <Input key={item.fields[1].id} id={item.id} position="Right" />
          </div>
        ))}
      </div>
      <button
        onClick={handleAddField}
        className="w-full text-center bg-slate-100 py-1 rounded-bl-sm rounded-br-sm border-t-transparent"
      >
        Agregar campo
      </button>
    </>
  );
};
