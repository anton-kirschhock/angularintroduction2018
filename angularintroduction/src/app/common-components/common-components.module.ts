import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatInputModule, MatListModule, MatTableModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatIconModule
  ],
  exports: [
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatIconModule
  ],
  declarations: []
})
export class CommonComponentsModule {}
