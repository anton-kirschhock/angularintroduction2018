import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-email-editor',
  templateUrl: './email-editor.component.html',
  styleUrls: ['./email-editor.component.css']
})
export class EmailEditorComponent implements OnInit {
  @Input() public email: string;
  @Output() public emailChange: EventEmitter<string> = new EventEmitter<
    string
  >();

  public emailControl: FormControl;

  constructor() {}

  ngOnInit() {
    this.emailControl = new FormControl(this.email, Validators.email);
    this.emailControl.valueChanges
      .pipe(debounceTime(400))
      .subscribe(value => this.emailChange.next(value));
  }
}
