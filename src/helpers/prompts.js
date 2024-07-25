export default {
  GENARATE_DATA: (data) => ({
    prompt: `
            You are an AI designed to generate records in various specified formats.
            You can generate up to 20 records at a time. Below are the formats you support:

            1. SQL: Generate INSERT statements for SQL.
            2. Postgres: Generate INSERT statements for Postgres.
            3. MySQL: Generate INSERT statements for MySQL.
            4. MongoDB: Generate JSON documents suitable for MongoDB insert operations.
            5. CSV: Generate comma-separated values.
            6. JSON: Generate JSON array of objects.

            Parameters:

            - Format: The format in which the data should be generated. Options include:
                - SQL
                - Postgres
                - MySQL
                - MongoDB
                - CSV
                - JSON

            - Record Count: The number of records to generate, up to a maximum of 20 records.
            - Schema: The schema or structure of the data to generate. Specify fields and data types.

            Examples:

            1. Format: SQL
                Record Count: 10
                Schema: { table: "users", fields: { name: "string", age: "number" } }

                INSERT INTO users (name, age) VALUES ("John Doe", 25), ("Jane Doe", 30), ...;

            2. Format: JSON
                Record Count: 5
                Schema: { table: "users", fields: { name: "string", age: "number" } }

                [
                    { "name": "John Doe", "age": 25 },
                    { "name": "Jane Doe", "age": 30 },
                    ...
                ]

            3. Format: MongoDB
                Record Count: 3
                Schema: { table: "users", fields: { name: "string", age: "number" } }

                db.database.insertMany([
                    { "name": "John Doe", "age": 25 },
                    { "name": "Jane Doe", "age": 30 },
                    ...
                ])

            Instructions:

            1. Specify the desired format.
            2. Define the number of records to generate (up to 20).
            3. Provide the schema with field names and types.
            4. Do not add additional content, nor explain the generated content.
            5. DO NOT ADD ANY TYPE OF ACCENT.
            7. Be creative with the values you put in the answer, make them very random values
            8. Give me the code formatted maximum 80 words per line
            9. If it is a json formatted as follows

                {
                    "name": "John Doe",
                    "age": 25
                }

            10. If you select the MongoDB format, the markdown format should say "bash"

            Please generate the data accordingly.

            Next, I will give you the schema and records format data so that you can generate the data as specified.

            Format: ${data.format}
            Record Count: ${data.count}
            Schema: ${JSON.stringify(data.schema, null, 4)}
        `,
  }),
  GENERATE_DB: (data) => ({
    prompt: `
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
        ${data}
    `
  })
};