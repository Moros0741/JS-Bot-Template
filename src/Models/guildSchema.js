import mongoose, { Schema } from "mongoose";

export default mongoose.model(
  "Guilds",
  new Schema({
    guildId: { type: String, unique: true, required: true },
  })
);
