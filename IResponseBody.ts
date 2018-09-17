import User from "./user";

export default interface IResponseBody {
  status?:string;
  message?:string;
  users?:Array<User>;
}
