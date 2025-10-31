import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `
  type Cat {
    id: ID!
    name: String
    origin: String
    description: String
  }

  type Student {
    id: ID!
    firstName: String
    lastName: String
    age: Int
    email: String
  }

  type Query {
    cat(id: ID!): Cat
    students: [Student]
  }
`;

const cats = [
  { id: "1", name: "Persian", origin: "Iran", description: "Fluffy cat" },
  { id: "2", name: "Siamese", origin: "Thailand", description: "Blue eyes" }
];

const students = [
  { id: "1", firstName: "Ana", lastName: "García", age: 20, email: "ana@mail.com" },
  { id: "2", firstName: "Luis", lastName: "Pérez", age: 22, email: "luis@mail.com" }
];

const resolvers = {
  Query: {
    cat: (_, { id }) => cats.find(c => c.id === id),
    students: () => students,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

// Escuchar en Render (usa PORT si está definida)
const { url } = await startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 },
  context: async () => ({}),
});

console.log(`🚀 Servidor GraphQL listo en: ${url}`);
