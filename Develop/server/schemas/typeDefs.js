// import the gql tagged template function
const { gql } = require('apollo-server-express');


const typeDefs = gql`
    type Book {
        bookId:ID
        authors:String
        description:String
        image:String
        link:String
        title:String
    }

    type User{
        _id: ID
        username:String
        email:String
        password:String
        savedBooks:[Book]
        bookCount:Int
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
    }

`



// export the typeDefs
module.exports = typeDefs;
