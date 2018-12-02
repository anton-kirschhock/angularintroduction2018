# Introduction to Angular (late 2018 edition)

Livedemo content from my 2018 Introduction to Angular.

## How to use this repository

Each live demo is linked to a certain branch. You can see the branch name in the top right corner of the slide. Each branch is the finalized product of that slide.

Branch items:

- **starter**: the start template where everything begins
- **first_steps**: introduces Angular CLI, using Yarn as a package manager, serving the angular app, creating a new component and using 1 way binding to pass through data. We also create a simple grid to display a list of users using a Service.
- **router**: introduces routes, navigation, resolving data from a service for a Detail page, Template driven forms.
- **rxjs**: introduces HTTP client and Handling and using Observables.
- **extra_sweetness**: Introduces twoway binding between components, Using templates and containers, ngIf and observables and else-templates,
- **redux**: introduces ngxs to angular, some basics and and example
- **Master**: this is the final product, when everything is done.

## Steps in this part

https://ngxs.gitbook.io/ngxs/getting-started

Let's start with creating a UserStateModel. This will define how the state of the users looks like.

```ts
export interface UserStateModel {
  users: User[];
  selectedUser: User;
}
```

Below the state model, add the state definition:

```ts
@State<UserStateModel>({
  name: 'users',
  defaults: {
    selectedUser: undefined,
    users: []
  }
})
export class UserState {}
```

Import the ngsx module and register the userstate for Root.

```ts
NgxsModule.forRoot([UserState]);
```

Also add some Logging in the app.module:

```ts
NgxsLoggerPluginModule.forRoot(), NgxsReduxDevtoolsPluginModule.forRoot();
```

You want to disable these plugins when in production. But for development, this is great!
Now Create a user.actions.ts with the following actions:

```ts
import { User } from '../models/user';

export class FetchUsers {
  type = 'users.fetch.start';
  constructor() {}
}

export class FetchUsersFinished {
  type = 'users.fetch.end';
  constructor(public payload: User[]) {}
}
```

Now Start implementing these actions:

```ts
export class UserState {
  constructor(private userService: UserService) {}

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

```

By making an action cancelUncompleted, We tell ngsx that there is an observable involved.

Now create a Selector within the user.state.ts

```ts

  @Selector()
  public static selectUsers(state: UserStateModel) {
    return state.users;
  }
```

Now the magic becomes real! in the user-grid.component.ts, remove the old datesource binding and replace the property with folliowing metadata:

```ts
  @Select(UserState.selectUsers) dataSource$: Observable<User[]>;
```

Nothing happens... We need to invoke the action fetchusers... In the nginit of the grid:

```ts
  constructor(private store: Store, private router: Router) {}

  ngOnInit() {
    this.store.dispatch(new FetchUsers());
  }

```

You could save the state of which user is selected. But it would be similar as we've done before.
