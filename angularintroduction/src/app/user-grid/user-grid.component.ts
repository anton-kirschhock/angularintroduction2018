import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-grid',
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.css']
})
export class UserGridComponent implements OnInit {
  @Input() dataSource: User[];
  public readonly displayedColumns = ['id', 'fullName', 'email', 'dob'];
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.dataSource = this.userService.getAll();
  }

  navigate(id: number) {
    this.router.navigate(['/', 'users', id.toString()]);
  }
}
