const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');

const typeDefs = gql`
    type Student {
        id: ID!
        firstName: String!
        lastName: String!
    }

    type Query {
        students: [Student!]!
        student(id: ID!): Student
    }

    type Mutation {
        createStudent(firstName: String!, lastName: String!): Student!
        updateStudent(id: ID!, firstName: String!, lastName: String!): Student!
        deleteStudent(id: ID!): Student
    }
`;

let students = [
    { id: '1', firstName: 'Jack', lastName: 'Black'},
    { id: '2', firstName: 'Joe', lastName: 'Moe'}
];

const resolvers = {
    Query: {
        students: () => students,
        student: (parent, { id }) => students.find(student => student.id === id)
    },
    Mutation: {
        createStudent: (_, { firstName, lastName }) => {
            const newStudent = {id: String(students.length + 1), firstName, lastName};
            students.push(newStudent);
            return newStudent;
        },
        updateStudent: (_, { id, firstName, lastName }) => {
            const index = students.findIndex(student => student.id === id);
            if (index !== -1) {
                students[index] = { id, firstName, lastName };
                return students[index];
            }
            throw new Error('Student not found');
        },
        deleteStudent: (_, { id }) => {
            const index = students.findIndex(student => student.id === id);
            if (index !== -1) {
                const deletedStudent = students.splice(index, 1);
                return deletedStudent[0];
            }
            throw new Error('Student not found');
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
    await server.start();
    const app = express();
    app.use(cors());
    server.applyMiddleware({ app, path: '/graphql' });

    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}

startServer()
    .then(() => console.log('Apollo Server started'))
    .catch((error) => console.error('Error starting server:', error));
