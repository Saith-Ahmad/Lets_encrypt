import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    image : {
        type: String,
        required: false,
    },
    email: { type: String, required: true, lowercase: true , unique : true},
    name: {
      type: String,
      required: true,
      trim: true,
    },
    bio:{
      type: String,
      required: false,
       trim: true,
    }
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export default User;
