import mongoose from "mongoose";
import { config } from "./config/constants";

class MongoConnection {
  public async Connect(): Promise<void> {
    try {
      await mongoose.connect(config.API_CONECTION_STRING);
      console.log("Acessando server")
    } catch (error) {
      console.log(error);
      process.exit(1)
    }
  }
}

export default new MongoConnection;
