import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { FetchUsers, FetchUsersFinished } from './user.actions';

export interface UserStateModel {
  users: User[];
  selectedUser: User;
}

@State<UserStateModel>({
  name: 'users',
  defaults: {
    selectedUser: undefined,
    users: []
  }
})
export class UserState {
  constructor(private userService: UserService) {}

  @Selector()
  public static selectUsers(state: UserStateModel) {
    return state.users;
  }

  @Action(FetchUsers, { cancelUncompleted: true })
  fetchUsers({ dispatch }: StateContext<UserStateModel>, action: FetchUsers) {
    return this.userService
      .getAll()
      .pipe(tap(users => dispatch(new FetchUsersFinished(users))));
  }

  @Action(FetchUsersFinished)
  fetchUsersFinished(
    { patchState }: StateContext<UserStateModel>,
    action: FetchUsersFinished
  ) {
    patchState({
      users: action.payload,
      selectedUser: undefined
    });
  }
}
