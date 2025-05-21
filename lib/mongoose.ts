import mongoose, { Mongoose } from "mongoose";

const MongoDB_URI = process.env.MONGODB_URI as String;

if (!MongoDB_URI) {
  throw new Error("MONGODB_URI is not defined");
}

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  var mongoose: MongooseCache;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async (): Promise<Mongoose> => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MongoDB_URI as string, {
        dbName: "Cluster0",
      })
      .then((result) => {
        console.log("MongoDB Connected");
        return result;
      })
      .catch((error) => {
        console.error("Error connecting to MongoDBB", error);
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default dbConnect;
