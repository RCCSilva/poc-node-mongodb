import { MongoMemoryReplSet } from "mongodb-memory-server";
import * as dotenv from 'dotenv' 
dotenv.config()

let mongod: MongoMemoryReplSet

export const setup = async () => {
  mongod = await MongoMemoryReplSet.create({
    binary: {
      version: '6.0.4',
    },
    replSet: {
      count: 1,
      storageEngine: 'wiredTiger'
    },
    instanceOpts: [
      {
        port: 30001
      }
    ]
  })
}

export const teardown = async () => {
  await mongod.stop();
}
