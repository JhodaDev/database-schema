import { v4 as uuidv4 } from "uuid";

function parseText(text) {
  const parts = text.split("========== FIELDS ==========");
  const dataJson = parts[1].trim();

  const dataJsonCorrected = dataJson
    .replace(/(\w+):/g, '"$1":')
    .replace(/'([^']+)'/g, '"$1"');

  const data = JSON.parse(dataJsonCorrected);

  const arr = Object.keys(data).map((key) => {
    return {
      [key]: data[key],
    };
  });

  return arr;
}

export function getMarkdown(text) {
  const parts = text.split("========== FIELDS ==========");
  const markdown = parts[0].trim();
  return markdown
}

export const getNodes = (arr) => {
  return arr.map((item, index) => {
    const { fields, tableName, relationFields, globalId } = getDataTable(item);
    return {
      id: `${globalId}-global`,
      type: "table",
      position: { x: 0, y: index * 300 },
      data: {
        fields,
        table: tableName
      },
      table: tableName,
      relationFields,
    };
  });
};

export const getDataTable = (obj) => {
  let tableName = "";
  const fields = [];
  let relationFields = false;
  let globalId = null;

  Object.keys(obj).map((key) => {
    const childrens = obj[key];
    Object.keys(childrens).forEach((child) => {

      let upperKey =
        typeof childrens[child] === "string"
          ? childrens[child].toLowerCase() 
          : childrens[child];

      globalId = generateUUIDWithoutHyphens();
      const objTable = {
        id: globalId,
        fields: [
          { id: generateUUIDWithoutHyphens(), value: child },
          {
            id: generateUUIDWithoutHyphens(),
            value:
              typeof upperKey === "object"
                ? upperKey.reference.table
                : upperKey,
          },
        ],
      };

      if (typeof upperKey === "object") {
        objTable["relations"] = upperKey.reference;
        relationFields = true;
      }

      fields.push(objTable);
      tableName = key;
    });
  });

  return { fields, tableName, relationFields, globalId };
};

export const getRelations = (arr) => {
  const relationFields = arr.filter((item) => item.relationFields);
  if (!relationFields.length) return arr;

  return relationFields.map((item) => {
    const { data } = item;
    const dataRelation = data.fields.filter((item) =>
      Object.prototype.hasOwnProperty.call(item, "relations")
    ); 

    return dataRelation.map((itemRelation) => {
      const { relations } = itemRelation
      const table = arr.find((item) => item.table === relations.table)
      const { data: dataTable } = table

      

      const dataField = dataTable.fields.find((item) => item[relations.field])

      const leftId = itemRelation.fields[0].id
      const rightId = dataField.fields[0].id

      const globalId = `e${leftId}-${rightId}`

      return {
        id: globalId,
        source: `${item.id}`,
        target: `${table.id}`,
        sourceHandle: `${leftId}-source`,
        targetHandle: `${rightId}-target`,
        animated: true,
        type: "smoothstep",
      }
    })
  }).flat();
};

export function generateUUIDWithoutHyphens() {
  const uuid = uuidv4();
  return uuid.replace(/-/g, "");
}

export default parseText;
