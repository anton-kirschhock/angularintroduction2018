import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-grid',
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.css']
})
export class UserGridComponent implements OnInit {
  @Input() data: any[];

  constructor() {}

  ngOnInit() {}
}
