import { Component, Input, OnInit } from '@angular/core';

import { User } from '../models/user';

@Component({
  selector: 'app-user-grid',
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.css']
})
export class UserGridComponent implements OnInit {
  @Input() dataSource: User[];

  constructor() {}

  ngOnInit() {}
}
