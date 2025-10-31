import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { gql } from "graphql-tag";

// Definición del esquema GraphQL
const typeDefs = gql`
  type Student {
    id: ID!
    firstName: String
    lastName: String
    age: Int
    email: String
  }

  type CatBreed {
    id: ID!
    name: String
    origin: String
    description: String
  }

  type Query {
    students: [Student]
    catBreed(id: ID!): CatBreed
  }
`;

// Datos simulados (mock)
const students = [
  { id: "1", firstName: "Laura", lastName: "Pérez", age: 21, email: "laura@example.com" },
  { id: "2", firstName: "Carlos", lastName: "Ramírez", age: 23, email: "carlos@example.com" },
  { id: "3", firstName: "Andrés", lastName: "López", age: 20, email: "andres@example.com" },
];

const catBreeds = [
  { id: "1", name: "Siamés", origin: "Tailandia", description: "Elegante y vocal." },
  { id: "2", name: "Persa", origin: "Irán", description: "Pelaje largo y calmado." },
  { id: "3", name: "Bengalí", origin: "EE.UU.", description: "Manchado y muy activo." },
];

// Resolvers
const resolvers = {
  Query: {
    students: () => students,
    catBreed: (_, { id }) => catBreeds.find((b) => b.id === id),
  },
};

// Servidor Apollo
const server = new ApolloServer({ typeDefs, resolvers });

// Puerto dinámico (necesario para Render)
const PORT = process.env.PORT || 4000;

// Iniciar servidor
const { url } = await startStandaloneServer(server, {
  listen: { port: PORT },
});

console.log(`🚀 Servidor GraphQL corriendo en: ${url}`);
