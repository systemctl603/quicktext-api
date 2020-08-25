const { ApolloServer, gql } = require("apollo-server");
const Paragraph = require("./models/Paragraph");

require("./db.conf");
require("dotenv").config();

const typeDefs = gql`
  type Paragraph {
    author: String!
    paragraphText: String!
  }

  type Mutation {
    deleteParagraph(id: String): String
    addParagraph(author: String!, paragraphText: String!): Paragraph
  }
  type Query {
    allParagraphs: String!
    paragraphByAuthor(author: String): String!
  }
`;

const resolvers = {
  Query: {
    allParagraphs: async () => {
      try {
        let res = await Paragraph.find();
        return JSON.stringify(res);
      } catch (e) {
        console.error(e);
        return e;
      }
    },
    paragraphByAuthor: async (_, { author }) => {
      try {
        let res = await Paragraph.find({ author });
        return JSON.stringify(res);
      } catch (e) {
        console.error(e);
        return e;
      }
    },
  },
  Mutation: {
    deleteParagraph: async (_, { id }) => {
      try {
        let res = await Paragraph.findByIdAndDelete(id);
        return "Deleted " + id;
      } catch (e) {
        return e;
      }
    },
    addParagraph: async (_, inputs) => {
      try {
        let response = new Paragraph({ ...inputs, upvotes: 0 });
        response.save((err) => console.error(err));
        return response;
      } catch (e) {
        console.log(e);
        return e;
      }
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => console.log(`Listening on ${url}`));
