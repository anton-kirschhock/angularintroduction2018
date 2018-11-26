# Introduction to Angular (late 2018 edition)

Livedemo content from my 2018 Introduction to Angular.

## How to use this repository

Each live demo is linked to a certain branch. You can see the branch name in the top right corner of the slide. Each branch is the finalized product of that slide.

Branch items:

- **starter**: the start template where everything begins
- **first_steps**: introduces Angular CLI, usage of Yarn, serving the angular app, creating a new component and using 1 way binding to pass through data.
- **router**: introduces routes, navigation, resolving data and guards
- **rxjs**: introduces HTTP client, Services & DI, and Handling and using Observables
- **extra_sweetness**: Introduces twoway binding between components, Using templates and containers, ngIf and observables and else-templates,
- **redux**: introduces ngxs to angular, some basics and and example
- **Master**: this is the final product, when everything is done.

## Steps in this part

1. Generate the component files using Angular CLI:

```sh
ng generate component userGrid
```

2. Create a interface to define the model => models/user.ts

```ts
export interface User {
  id: number;
  name: string;
  firstName: string;
  email: string;
  dateOfBirth: string;
}
```

3. Create user.service.ts service:

```ts
@Injectable({ providedIn: 'root' })
export class UserService {
  public getAll(): User[] {
    return this.getUserList();
  }

  private getUserList(): User[] {
    return [...];
  }
}
```

4. Add @Input() to user-grid.component.ts

```ts
  @Input() dataSource: User[];
```

5. Add the property userList to app.component and inject the service

```ts
export class AppComponent implements OnInit {
  public userList: User[];
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userList = this.userService.getAll();
  }
}
```

6. Add the component to the app.component.html and one way binding:

```html
<app-user-grid [dataSource]="userList"></app-user-grid>
```

7. Add the HTML to the user-grid:

```html
<table>
  <thead>
    <tr>
      <th>#</th>
      <th>Full name</th>
      <th>Email</th>
      <th>DOB</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let user of dataSource">
      <td>{{ user.id }}</td>
      <td>{{ user.firstName }} {{ user.name }}</td>
      <td>{{ user.email }}</td>
      <td>{{ user.dateOfBirth }}</td>
    </tr>
  </tbody>
</table>
```
