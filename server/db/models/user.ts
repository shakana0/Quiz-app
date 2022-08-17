import { Schema, model } from "mongoose";
import { QuizType } from "./quizes";

export interface credentialsType {
  emailAdress: string;
  userName: string;
  password: string;
  // refreshToken: string
  quizes: Array<QuizType>
}

const schema = new Schema<credentialsType>({
  emailAdress: { type: String, required: true, unique: true, lowercase: true },
  userName: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  // refreshToken: { type: String, required: true },
  quizes: { type: [Object], required: false },
});

const UserModel = model<credentialsType>("users", schema);

export default UserModel;
