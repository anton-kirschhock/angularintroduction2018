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

1. We start of by creating a app.routing.ts file in the app folder. This will be the root-router definition of the application. Create a const property which is exported:

```ts
import { Routes } from '@angular/router';

export const appRouting: Routes = [];
```

2. Create a route definition for the overview screen in the Routes array. (fyi, routes is a type defintion of Route[]):

```ts
  {
    path: 'users',
    component: UserGridComponent
  }
```

3. Now we need to add a failover to always navigate to the overview for when we don't know the route:

```ts
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'users'
  }
```

4. Next we need to Show angular where the components have to be loaded into (router outlet). Change the App.Component.html to the following:

```html
<section class="container"><router-outlet></router-outlet></section>
```

5. Before testing, we need to add the router module (RouterModule from the @angular/router namespace) into the app module Import list:

```ts
import { RouterModule } from '@angular/router';
import { appRouting } from './app.routing';
...
@NgModule({
  declarations: [...],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRouting),
    ...
  ],
  providers: [],
  bootstrap: [...]
})
export class AppModule {}
```

Now App.Component behaves like a master page from Asp.Net webforms. You can add menu's, headers, footers which are common over the whole app in here.

6. Now create the detail component using angular CLI:

```sh
ng g c userDetail
```

We add some HTML to make a detail/edit page:

```html
<mat-card class="mat-elevation-z8">
  <mat-card-header>
    <h1>User detail <small>{{ user.id }}</small></h1>
  </mat-card-header>
  <mat-card-content>
    <form #userForm="ngForm">
      <mat-form-field class="full-width">
        <mat-label>First name</mat-label>
        <input
          matInput
          placeholder="First name"
          [(ngModel)]="user.firstName"
          name="firsName"
        />
      </mat-form-field>
      <mat-form-field class="full-width">
        <mat-label>Last name</mat-label>
        <input
          matInput
          placeholder="Last name"
          [(ngModel)]="user.name"
          name="name"
        />
      </mat-form-field>
      <mat-form-field class="full-width">
        <mat-label>Email</mat-label>
        <input
          matInput
          placeholder="Email"
          type="email"
          [(ngModel)]="user.email"
          name="email"
        />
      </mat-form-field>
      <mat-form-field class="full-width">
        <mat-label>DOB</mat-label>
        <input
          matInput
          placeholder="DOB"
          [(ngModel)]="user.dateOfBirth"
          name="dateOfBirth"
        />
      </mat-form-field>
    </form>
  </mat-card-content>
</mat-card>
```

To keep things easier, we don't use a Datepicker. If you want you can use Angular Material datepicker: https://material.angular.io/components/datepicker/overview
Also don't forget to import FormsModule in the AppModule to make usage of the ngModel attribute.

The 'Banana in a box' `[(ngModel)]` is a two-way binding.

When taking a look at he app, we see an empty grid. We need to pass through the data from the service. In app.component.ts we add the service in the constructor and set the datasource property.

Another way is using a resolver. This is what we'll be using for the detail.
Before we can do this, we need to add an action to navigate to the detail page using the grid.
Add in user-grid.component.ts the following core items:

```ts
  constructor(..., private router: Router) {}
  ...
  navigate(id: number) {
    this.router.navigate(['/', 'users', id.toString()]);
  }
```

Add in the tr element for the row items the following:

```html
<tr
  (click)="navigate(row.id)"
  mat-row
  *matRowDef="let row; columns: displayedColumns"
></tr>
```

7. Now add the route for the detail:

```ts
  {
    path: 'users/:id',
    component: UserDetailComponent,
    resolve: { model: DetailResolver }
  }
```

Important to add it below the users route and before the wildcard route.
:id has the same function as {id} in .Net API's

8. Add a new file 'detail.resolver.ts'. Add the following content:

```ts
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';

import { User } from './models/user';
import { UserService } from './services/user.service';

@Injectable()
export class DetailResolver implements Resolve<User> {
  constructor(private userService: UserService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User {
    const id = +route.params['id'];
    if (isNaN(id)) {
      this.router.navigate(['/']);
      return undefined;
    }

    return this.userService.getById(id);
  }
}
```

In JS, +'123' will change the type from a string to a number. When it is not a number, we navigate back.
Register it in app.module.ts under Providers, as it is a Injectable 'service'.

We are almost there. Add the following in the user-detail.component.ts:

```ts
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.user = this.activatedRoute.snapshot.data['model'];
  }
```

Now to finalize things, we want to navigate back to the grid. Add the following into the bottom part of the mat-card block:

```html
<mat-card-footer>
  <a mat-button [routerLink]="['/']">
    <mat-icon>arrow_back</mat-icon> Back to overview
  </a>
</mat-card-footer>
```
