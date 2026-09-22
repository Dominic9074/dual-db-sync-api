import { Schema, model, Document } from "mongoose";

export interface UserDocument extends Document {
  email: string;
  password: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

const userSchema=new Schema<UserDocument>({
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        trim:true
    },
    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    }
},{timestamps:true})

export const UserModel = model<UserDocument>("User", userSchema);