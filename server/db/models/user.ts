import { Schema, model } from "mongoose";

export interface credentialsType {
  emailAdress: string;
  userName: string;
  password: string;
}

const schema = new Schema<credentialsType>({
  emailAdress: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = model<credentialsType>("users", schema);

export default UserModel;
