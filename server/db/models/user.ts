import { Schema, model } from "mongoose";
import { QuizType } from "./quizes";

export interface credentialsType {
  emailAdress: string;
  userName: string;
  password: string;
  quizes: Array<QuizType>
}

const schema = new Schema<credentialsType>({
  emailAdress: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  quizes: { type: [Object], required: true },
});

const UserModel = model<credentialsType>("users", schema);

export default UserModel;
