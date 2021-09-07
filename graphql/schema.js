const graphql = require('graphql')
const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLSchema} = graphql

const Movie = require('../movie/model')

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        url: {type: GraphQLString},
        date: {type: GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        status: {
            type: GraphQLString,
            resolve(parent, args) {
                return 'Welcome to GraphQL'
            }
        },
        movie: {
            type: new GraphQLList(MovieType),
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                if (!args.id) return Movie.find({datetime: {$gte: Date.now()}}).sort({datetime: 1})
                return Movie.find({'_id': args.id})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})