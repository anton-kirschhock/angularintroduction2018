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

Let's start by creating a loading indicator for our grid view.

1. in the user-grid.component.html add the following on the bottom of the file:

```html
<ng-template #loading> <section>Loading users...</section> </ng-template>
```

This is the template we want to show when we are loading the items.

2. Now surround the table with the following:

```html
<ng-container *ngIf="(dataSource$ | async); let data; else: loading">
  <table mat-table [dataSource]="data" class="full-width">
    REST OF TABLE COMES HERE
  </table>
</ng-container>
```

Let's dysect the syntax

- (dataSource$| async) -> dataSource$ is a Observable, Subscribe to it.
- let data; -> The result of which dataSource\$ gives, should be named data
- else: loading -> When !data (when data is undefined), render the loading template instead.

This can be used to much more than just a loading indicator, ofcourse.
To see it better, I've added a delay of 1s to the user service:

```ts
import { delay } from 'rxjs/operators'
...
  public getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl, {}).pipe(delay(1000));
  }
```

Now let's take a better look at bindings.
Bindings between components are mostly used in Angular.
Let's create a component to edit the email address of a user.

1. Generate the component:

```sh
ng g c emailEditor
```

2. Replace the part of the detail form for the email with the email-editor tag:

```html
<app-email-editor></app-email-editor>
```

3. Add the email form to the new component:

```html
<mat-form-field class="full-width">
  <mat-label>Email</mat-label>
  <input matInput placeholder="Email" type="email" />
</mat-form-field>
```

Now we see an empty email field. We need to add a binding to make it editable:

4. In the email-editor.component.ts add an input binding. We also will make use of a FormControl element, from the **ReactiveFormModule**. Import it in the app.module.ts. Now we can also add a Validator to validate the email.

```ts
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-editor',
  templateUrl: './email-editor.component.html',
  styleUrls: ['./email-editor.component.css']
})
export class EmailEditorComponent implements OnInit {
  @Input() public email: string;

  public emailControl: FormControl;

  constructor() {}

  ngOnInit() {
    this.emailControl = new FormControl(this.email, Validators.email);
  }
}
```

In the HTML add the [formControl] attribute to the input field:

```html
<input matInput placeholder="Email" type="email" [formControl]="emailControl" />
```

Also add the one way binding for the email property in the user-detail.component.html.

The last thing we need to do is to change the property back. In the email-editor.component.ts add the following:

```ts
export class EmailEditorComponent implements OnInit {
  @Input() public email: string;
  @Output() public emailChange: EventEmitter<string> = new EventEmitter<
    string
  >();

  public emailControl: FormControl;

  constructor() {}

  ngOnInit() {
    this.emailControl = new FormControl(this.email, Validators.email);
    this.emailControl.valueChanges.subscribe(value =>
      this.emailChange.next(value)
    );
  }
```

Now we push all changes via an EventEmitter (see it as a C# Event) which we now can subscribe to in a two-way binding, using the banana in a box.

```html
<app-email-editor [(email)]="user.email"></app-email-editor>
```

It is important to name the output variable the same as the input, suffixing it with Change. This is by convention.

Only issue: we update all the changes! so each input of the text field will be pushed. Now we can add a debounce of 400ms to reduce the ammount of updates. In the email-editor.component.ts add the following for the valueChanges observable:

```ts
this.emailControl.valueChanges
  .pipe(debounceTime(400))
  .subscribe(value => this.emailChange.next(value));
```
