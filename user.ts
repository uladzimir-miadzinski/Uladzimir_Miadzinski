export default class User {
  id: number;
  name: string;
  password: string;
  birthday: Date = new Date();
  firstLogin: Date = new Date();
  nextNotify: Date = new Date();
  info: string;
  [key: string]: string|Date|number;
  
  constructor(id: number,
              name: string,
              password: string,
              birthday: string,
              firstLogin: string,
              nextNotify: string,
              info: string) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.birthdayDate = birthday;
    this.firstLoginDate = firstLogin;
    this.nextNotifyDate = nextNotify;
    this.info = info;
  }
  
  set birthdayDate(value: string|Date) {
    this.birthday = (value instanceof Date) ? value : new Date(value);
  }
  
  set firstLoginDate(value: string|Date) {
    this.firstLogin = (value instanceof Date) ? value : new Date(value);
  }
  
  set nextNotifyDate(value: string|Date) {
    this.nextNotify = (value instanceof Date) ? value : new Date(value);
  }
  
  get birthdayDate() {
    return this.birthday;
  }
  
  get firstLoginDate() {
    return this.firstLogin;
  }
  
  get nextNotifyDate() {
    return this.nextNotify;
  }
}