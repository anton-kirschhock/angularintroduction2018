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

### Before starting

I've attached a .Net Core API (in a Docker Container). It wil return a User list (100 items) or 1 user (By ID).
To deploy into your local Docker environment:

```sh
docker build . -t angularintro-api
docker run -d -p 8080:80 --name angularintroApi angularintro-api
```

To remove it use:

```sh
docker rm angularintroApi -f
```

Now lets begin

1. We need to modify the User service to use the HTTP Client. Firstly we need to add the HTTPClient Module in the app.module.ts

```ts
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [...],
  imports: [
    ...,
    HttpClientModule,
    ...
```

One Small sidenote, there is another module, by Selenium, which is similar.

2. Now we need to tell Angular the location of the API. In most cases, environments.ts is used. See it as a "web.config". You can create multiple environment files as needed. For more information take a look at https://github.com/angular/angular-cli/wiki/stories-application-environments

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080'
};
```

3. Now we need to update the service to use the HttpClient:

```ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = `${environment.apiUrl}/api/users`;

  constructor(private httpClient: HttpClient) {}

  public getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl, {});
  }

  getById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/${id}`, {});
  }
}
```

We now return the type "Observable<User[]>". This is an implementation of the Observable pattern.
It allows us to use Async data.
To listen to the result, we need to subscribe to the service in the user-grid component:

```ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = `${environment.apiUrl}/api/users`;

  constructor(private httpClient: HttpClient) {}

  public getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl, {});
  }

  getById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/${id}`, {});
  }
}
```

When we now run the application we get the following error:

```
ERROR in src/app/detail.resolver.ts(17,5): error TS2322: Type 'Observable<User>' is not assignable to type 'User'.
  Property 'id' is missing in type 'Observable<User>'.
```

We need to make the Resolver, from the previous part, be able to use the observable. The angular team did resolve it in a clever way:

```ts
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User>
```

Take a look at the return type of the resolve method. We simply pass through the observable. Angular is capable of subscribing to it and complete the data retrieval.

Now, subscribing an observables can become complex and can lead to memory leaks.
We need to unsubscribe when we are done with the subscribed observable.
The RXJS team was smart enough to introduce multiple Observable types.
One of them, used by the HTTP Client, terminates it's self when it is done. When we would unsubscribe the observable from the http client, we would cancel the request. This can be used in certain situations, like making a new filter call.

But in anycase, we don't like the dirty work and we'll let Angular do the job.
Open the user-grid.component.ts and remove the subscription:

```ts
  dataSource$: Observable<User[]>;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.dataSource$ = this.userService.getAll();
  }
```

It is by convention to name property which are observables to use the \$ suffix.
Now the awesome part. In the user-grid.component.html where we define our data set:

```html
<mat-card class="mat-elevation-z8">
  <mat-card-header> <h1>Users</h1> </mat-card-header>
  <mat-card-content>
    <table mat-table [dataSource]="dataSource$ | async" class="full-width">
      ...
    </table></mat-card-content
  ></mat-card
>
```

The Async pipe wil do the job, and we have 1 less observable to manage
RxJS allows to modify the data which flows through the Observable by using pipes.
Let's assume we want only the users which start with an A:

```ts
this.dataSource$ = this.userService
  .getAll()
  .pipe(map(users => users.filter(u => u.name.toLowerCase().startsWith('a'))));
```

We use the map operator to modify the data, which we filter that we only see names beginning with a.
There are allot of operators for many things. So you can chain multiple observables, debounce a certain time, ...
You can read more on https://rxjs-dev.firebaseapp.com/guide/overview.
