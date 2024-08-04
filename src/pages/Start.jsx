import { streamText } from "ai";

import { IconProject } from "../components/icons/IconProject";
import { IconSend } from "../components/icons/IconSend";
import { Background } from "../components/ui/Background";
import { useState } from "react";
import useAIStore from "../store/aiStore";
import { useNavigate } from "react-router-dom";
import parseText, { getMarkdown, getNodes } from "../helpers/parseText";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import openai from "../helpers/openia";
import tableStore from "../store/tableStore";
import prompts from "../helpers/prompts";

const str = `// Creacion de la base de datos en JavaScript

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

const Empleados = sequelize.define('Empleados', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    departamento_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Departamentos',
            key: 'id'
        }
    },
    puesto_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Puestos',
            key: 'id'
        }
    }
});

const Departamentos = sequelize.define('Departamentos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const Puestos = sequelize.define('Puestos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const Proyectos = sequelize.define('Proyectos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gerente_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Empleados',
            key: 'id'
        }
    },
    presupuesto: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

const Tareas = sequelize.define('Tareas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    proyecto_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Proyectos',
            key: 'id'
        }
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    responsable_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Empleados',
            key: 'id'
        }
    },
    fecha_inicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fecha_fin: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

sequelize.sync();

========== FIELDS ==========

{
    Empleados: {
        id: 'INTEGER',
        nombre: 'STRING',
        departamento_id: {
            valueType: 'INTEGER',
            reference: { table: 'Departamentos', field: 'id' }
        },
        puesto_id: {
            valueType: 'INTEGER',
            reference: { table: 'Puestos', field: 'id' }
        }
    },
    Departamentos: {
        id: 'INTEGER',
        nombre: 'STRING'
    },
    Puestos: {
        id: 'INTEGER',
        titulo: 'STRING'
    },
    Proyectos: {
        id: 'INTEGER',
        nombre: 'STRING',
        gerente_id: {
            valueType: 'INTEGER',
            reference: { table: 'Empleados', field: 'id' }
        },
        presupuesto: 'FLOAT'
    },
    Tareas: {
        id: 'INTEGER',
        proyecto_id: {
            valueType: 'INTEGER',
            reference: { table: 'Proyectos', field: 'id' }
        },
        nombre: 'STRING',
        responsable_id: {
            valueType: 'INTEGER',
            reference: { table: 'Empleados', field: 'id' }
        },
        fecha_inicio: 'DATE',
        fecha_fin: 'DATE'
    }
}`;

export const Start = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const { setMarkdown } = useAIStore((state) => state);
  const { setNodes } = tableStore();

  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const prompt = prompts.GENERATE_DB(value).prompt;

    // let str = "";

    // setLoading(true);

    // const { textStream } = await streamText({
    //   model: openai("gpt-4o"),
    //   prompt,
    //   maxTokens: 1000,
    // });

    // for await (const textPart of textStream) {
    //   str += textPart;
    // }

    console.log(str);

    const elements = parseText(str);
    const markdown = getMarkdown(str);
    setMarkdown(markdown);
    setNodes(getNodes(elements));

    navigate("/dashboard");
  };

  return (
    <Background>
      <div className="flex flex-col items-center text-white">
        <IconProject />
        <h1 className="text-4xl mt-4 font-bold">New Project</h1>
        <p className="mt-1">
          Create database schemas, optimize queries and much more
        </p>
        <form
          className="max-w-2xl w-full bg-[#181622] mt-6 py-2 px-4 rounded-md flex items-center gap-4"
          onSubmit={handleFormSubmit}
        >
          {!loading ? (
            <>
              <input
                type="text"
                placeholder="Create a SQL database with 2 tables"
                className="w-full h-full bg-transparent focus:outline-none"
                value={value}
                onChange={(event) => setValue(event.target.value)}
              />
              <button type="submit">
                <IconSend />
              </button>
            </>
          ) : (
            <div className="flex justify-center w-full">
              <div className="flex flex-col items-center">
                <Skeleton circle={true} height={40} width={40} />
                <Skeleton width={300} height={40} />
              </div>
            </div>
          )}
        </form>
      </div>
    </Background>
  );
};
