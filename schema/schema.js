const graphql = require("graphql");
const _ = require("lodash");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const clothingItemSchema = new Schema({
  // id: Number
  name: String,
  type: String,
  colour: String
});

const ClothingItem = mongoose.model("ClothingItem", clothingItemSchema);
// module.exports = mongoose.model("Author", authorSchema);

const brandSchema = new Schema({
  // id: Number,
  name: String
});

const Brand = mongoose.model("Brand", brandSchema);

// dummy data

var clothingItems = [
  {
    id: "1",
    name: "Adidas trefoil top",
    type: "top",
    colour: "black",
    brandId: "1"
  },
  {
    id: "2",
    name: "Cami top",
    type: "top",
    colour: "yellow",
    brandId: "2"
  },
  {
    id: "3",
    name: "Cold shoulder top",
    type: "top",
    colour: "green",
    brandId: "3"
  },
  {
    id: "4",
    name: "Rainbow sun top",
    type: "top",
    colour: "white",
    brandId: "2"
  },
  {
    id: "5",
    name: "Frilly vest",
    type: "top",
    colour: "1"
  }
];

var brands = [
  {
    id: "1",
    name: "Adidas"
  },
  {
    id: "2",
    name: "Topshop"
  },
  {
    id: "3",
    name: "Nike"
  }
];

const ItemType = new GraphQLObjectType({
  name: "ClothingItem",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    colour: { type: GraphQLString },
    brand: {
      type: BrandType,
      resolve(parent, args) {
        // return Brand.findById(parent.brandId);
        return _.find(clothingItems, { id: args.id });
      }
    }
  })
});

const BrandType = new GraphQLObjectType({
  name: "Brand",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    clothing: {
      type: new GraphQLList(ItemType),
      resolve(parent, args) {
        return ClothingItem.find({
          brandId: parent.id
        });
      }
    }
  })
});

console.log("hello", _.find(brands, { id: 2 }));

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    clothingItem: {
      type: ItemType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other source
        console.log(args);
        return _.find(clothingItems, { id: args.id });
      }
    },
    brand: {
      type: BrandType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        console.log(args);
        return _.find(brands, { id: args.id });
      }
    },
    brands: {
      type: new GraphQLList(BrandType),
      resolve(parent, args) {
        return brands;
      }
    },
    clothingItems: {
      type: new GraphQLList(ItemType),
      resolve(parent, args) {
        return clothingItems;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
