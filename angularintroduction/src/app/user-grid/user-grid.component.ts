import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-grid',
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.css']
})
export class UserGridComponent implements OnInit {
  dataSource$: Observable<User[]>;
  public readonly displayedColumns = ['id', 'fullName', 'email', 'dob'];
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.dataSource$ = this.userService.getAll();
    // .pipe(
    //   map(users => users.filter(u => u.name.toLowerCase().startsWith('a')))
    // );
  }

  navigate(id: number) {
    this.router.navigate(['/', 'users', id.toString()]);
  }
}
