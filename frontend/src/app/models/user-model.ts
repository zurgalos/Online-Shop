export class UserModel {
    public constructor(
        public _id?: string,
        public firstName?: string,
        public lastName?: string,
        public password?: string,
        public isAdmin?: boolean,
        public city?: string,
        public street?: string,
        public identityNumber?: string,
        public email?: string,
    ) { }
  }
  