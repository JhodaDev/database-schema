import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

import { IconProject } from "../components/icons/IconProject";
import { IconSend } from "../components/icons/IconSend";
import { Background } from "../components/ui/Background";
import { useState } from "react";
import useAIStore from "../store/aiStore";
import { useNavigate } from "react-router-dom";
import parseText, { getMarkdown } from "../helpers/parseText";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const openai = createOpenAI({
  apiKey: import.meta.env.VITE_OPENIA_KEY,
});

export const Start = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const { setTables, setMarkdown } = useAIStore((state) => state);
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const prompt = `
        Eres un experto en modelado de bases de datos SQL y noSQL.

        Tu tarea es que a partir de la siguiente descripción, crees un esquema de base de datos que cumpla con los requerimientos.
        Si la descripcion no es la de un esquema de base de datos, debes responder con un mensaje de error.
        Tu respuesta debe cumplir los siguientes criterios:

        - Debe ser un esquema de base de datos SQL o noSQL.
        - La respuesta debe dividirse en dos partes: la primera parte debe ser la creacion de la base de datos en JavaScript y la segunda parte
            debe ser solo los campos de las tablas en un formato json, por ejemplo:

            ========== FIELDS ==========

            {
                table1: {
                    id: 'value type',
                    name: 'value type',
                    age: 'value type',
                },
                table2: {
                    id: 'value type',
                    name: 'value type',
                    age: 'value type',
                    "userId":{
                      valueType:"value type" ,
                      reference:{ table:"table" , field:"field"}
                    }
                },
            }

        EL EJEMPLO DE JAVASCRIPT SOLO ES UNA REFERENCIA, NO DEBES COPIARLO EXACTAMENTE, DEBES CREAR TU PROPIO ESQUEMA DE BASE DE DATOS Y DEBE SER REAL DE COMO SE CREARIA EN UNA BASE DE DATOS SQL O NO SQL EN JAVASCRIPT..

        - TAMBIEN TIENES PROHIBIDO PONER ASCENTOS O CARACTERES ESPECIALES EN LOS NOMBRES DE LAS TABLAS Y LOS CAMPOS, DEBES USAR SOLO LETRAS Y NUMEROS.
        - Debe ser una respuesta coherente y bien estructurada.
        - NO SE DEBE AGREGAR NINGUN TIPO DE CONTENIDO ADICIONAL, NI TAMPOCO LO DEVUELVAS CON FORMATO MARKDOWN, TAMPOCO AGREGUES COMENTARIOS AL CODIGO, SOLO TEXTO PLANO.
        - EN EL CODIGO TIENES PROHIBIDO AGREGAR COMENTARIOS, O CUALQUIER TIPO DE TEXTO ADICIONAL, UNICAMENTE DEBES RESPONDE CON CODIGO.
        - Limitate unicamante a responder como se te pidio en el ejemplo.
        - Los datos en el json me los debes dar en el formato de la base de datos que hayas elegido
        - Si ves que a la descripcion le hace falta informacion importante para la creacion de una base de datos como por ejemplo
        llaves primarias y llaves foraneas para base de datos relaciones y ids para base de datos no relacionales debes agregar estos campos en el mismo formato que los demas campos.
        - Siempre agrega la creacion de la base de datos y la creacion de los campos
        - CUANDO HAYAN RELACIONES ENTRE LAS TABLAS DEBES AGREGARLAS COMO SE MUESTRA EN EL EJEMPLO, ADICIONAL EL NOMBRE DE LA TABLA Y EL NOMBRE DEL CAMPO
          TIENE QUE SER EXACTAMENTE IGUAL A COMO ESTA EN EL JSON, TIENES PROHIBIDO PONERLO EN MAYUSCULAS O MINUSCULAS, TIENE QUE SER EXACTAMENTE IGUAL,
          POR EJEMPLO SI LA TABLA A QUE HACE REFERENCIA SE LLAMA "user" EN EL CAMPO TABLE DE LA PROPIEDA REFERENCE DEBE DECIR "user" Y NO "User" O "USER" O "uSeR" O "users" O CUALQUIER OTRA FORMA.

        esta es la descripcion:
        ${value}
    `;

    let str = "";

    setLoading(true);

    const { textStream } = await streamText({
      model: openai("gpt-4o"),
      prompt,
      maxTokens: 1000,
    });

    for await (const textPart of textStream) {
      str += textPart;
    }

    console.log(str);

    const elements = parseText(str);
    const markdown = getMarkdown(str);
    setTables(elements);
    setMarkdown(markdown);

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
