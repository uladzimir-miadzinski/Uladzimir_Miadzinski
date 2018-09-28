import User from "./user";

export default interface ResponseBody {
  status?:string;
  message?:string;
  users?:Array<User>;
}
