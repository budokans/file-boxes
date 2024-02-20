"use server";

import { type Collection, type Db, MongoClient } from "mongodb";
import type { FileBoxRow } from "@/db/schemas";

const uri = process.env["MONGODB_URI"];

if (!uri) {
  throw new Error('Invalid or missing environment variable: "MONGODB_URI"');
}

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development, use a global variable to preserve the value
  // across module reloads caused by HMR.
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    globalWithMongo._mongoClientPromise = new MongoClient(uri).connect();
  }

  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production, it's best to not use a global variable.
  clientPromise = new MongoClient(uri).connect();
}

export const connect = async (): Promise<Db> => {
  const mongoClient = await clientPromise;
  return mongoClient.db("file-boxes");
};

export const fileBoxesCollection = async (): Promise<Collection<FileBoxRow>> =>
  (await connect()).collection("boxes");
