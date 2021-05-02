const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
              const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
          
              return userData;
            }
          
            throw new AuthenticationError('Not logged in');
          },
        // place this inside of the `Query` nested object right after `books` 
        // books: async (parent, { bookId }) => {
        //     return Book.findOne({ bookId });
        // },
        // get all users
        users : async () =>{
            return User.find()
                .select('-__v -password')
                // .populate('books')
                
        },
        // get a user by username
        users: async (parent, { username }) => {
            return User.findOne({ username })
            .select('-__v -password')
            // .populate('books')
            
        },
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);  
            return user;
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
          
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
          
            const correctPw = await user.isCorrectPassword(password);
          
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
          
            const token = signToken(user);
            return { token, user };
          }
          
      }         
    
  };

  module.exports = resolvers;

 