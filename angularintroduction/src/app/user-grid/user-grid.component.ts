import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { User } from '../models/user';
import { FetchUsers } from '../user-state/user.actions';
import { UserState } from '../user-state/user.state';

@Component({
  selector: 'app-user-grid',
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.css']
})
export class UserGridComponent implements OnInit {
  @Select(UserState.selectUsers) dataSource$: Observable<User[]>;

  public readonly displayedColumns = ['id', 'fullName', 'email', 'dob'];
  constructor(private store: Store, private router: Router) {}

  ngOnInit() {
    this.store.dispatch(new FetchUsers());
  }

  navigate(id: number) {
    this.router.navigate(['/', 'users', id.toString()]);
  }
}
