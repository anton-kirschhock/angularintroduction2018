import { User } from '../models/user';

export class FetchUsers {
  static readonly type = 'users.fetch.start';
  constructor() {}
}

export class FetchUsersFinished {
  static readonly type = 'users.fetch.end';
  constructor(public payload: User[]) {}
}
