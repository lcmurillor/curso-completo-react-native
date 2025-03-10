const { ApolloServer } = require("apollo-server");
const typeDefs = require("./db/schema");
const resolvers = require("./db/resolver");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers["authorization"] || "";
    if (token) {
      try { 
        const usuario = jwt.verify(token.replace('Bearer ', ''), process.env.SECRETA);
         console.log(usuario);
        return {usuario}
      } catch (error) {
        console.log(error);
      }
    }
  },
});

const conectarDB = require(`./config/db`);

//Conectar a la base de datos
conectarDB();
server
  .listen()
  .then(({ url }) => {
    console.log(`Server on: ${url}`);
  })
  .catch((err) => {
    console.log(`Server error: ${err}`);
  });
