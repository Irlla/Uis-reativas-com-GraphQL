const { ApolloServer, gql } = require('apollo-server');


const typeDefs = gql`

  type Book {
    id: ID
    title: String
    author: String
    ano: Int
  }
  type Query {
    books: [Book]
    livro(id: ID!): Book
  }
  type Mutation {
      addLivro(title: String!, author: String!, ano: Int): Book
  }
`;
const books = [
    {
      id:0,
      title: 'Harry Potter and the Chamber of Secrets',
      author: 'J.K. Rowling',
      ano: 2010
    },
    {
       id:1,
       title: 'Wonder',
       author: 'R.J. Palacio',
       ano: 2013
      },
    {
      id:2,
      title: 'Jurassic Park',
      author: 'Michael Crichton',
      ano: 2019
    },
  ];

const resolvers = {
    Query: {
      books: () => {
          return books;
      },
      livro: (parent, args, context, info) => {
          const resultado =  books.filter((book) => books.id == args.id);
          return resultado [0];
        }
      },
    Mutation:{
        addLivro: (parent, args, context, info) => {
            const livro = {
            id: books.length,
            title: args.title,
            author:args.author,
            ano: args.ano ? args.ano: 2019,
            }
        console.log(livro);
        return books[0];
        }
    }
  };
 
const server = new ApolloServer({ typeDefs, resolvers });


server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});