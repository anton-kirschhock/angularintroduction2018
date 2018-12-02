import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../models/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.user = this.activatedRoute.snapshot.data['model'];
  }
}
