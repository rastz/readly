import graphql from "graphql";
import _ from "lodash";
import console from "console";

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema,
	GraphQLID,
	GraphQLList,
} = graphql;

//dummy data / later on mongoDB / firebabase "Cloud Firestore"
const books = [
	{ name: "Name of the Wind", genre: "Fantasy", id: "1", authorId: "1" },
	{ name: "The Final Empire", genre: "Fantasy", id: "2", authorId: "2" },
	{ name: "The Long Earth", genre: "Sci-Fi", id: "3", authorId: "3" },

	{ name: "The Hero of Ages", genre: "Fantasy", id: "4", authorId: "2" },
	{ name: "The Colour of Magic", genre: "Fantasy", id: "5", authorId: "3" },
	{ name: "The Light Fantastic", genre: "Fantasy", id: "6", authorId: "3" },
];

const authors = [
	{ name: "Patrick Rothfuss", age: 44, id: "1" },
	{ name: "Brandon Sanderson", age: 42, id: "2" },
	{ name: "Terry Pratchett", age: 66, id: "3" },
];

const BookType = new GraphQLObjectType({
	name: "Book",
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve(parent, _args) {
				console.log(parent);
				return _.find(authors, { id: parent.authorId });
			},
		},
	}),
});

const AuthorType = new GraphQLObjectType({
	name: "Author",
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, _args) {
				return _.filter(books, { authorId: parent.id });
			},
		},
	}),
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		book: {
			type: BookType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				//code to get data from db / other cource

				return _.find(books, { id: args.id });
			},
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID }, name: { type: GraphQLString } },
			resolve(parent, args) {
				//code to get data from db / other cource
				return _.find(authors, { id: args.id });
			},
		},
		books: {
			type: new GraphQLList(BookType),
			resolve: (_parent, _args) => books,
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve: (_parent, _args) => authors,
		},
	},
});

const schema = new GraphQLSchema({
	query: RootQuery,
});

export default schema;
