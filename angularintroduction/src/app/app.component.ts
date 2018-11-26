import { Component, OnInit } from '@angular/core';

import { User } from './models/user';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public userList: User[];
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userList = this.userService.getAll();
  }
}
