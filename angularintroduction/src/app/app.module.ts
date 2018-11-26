import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CommonComponentsModule } from './common-components/common-components.module';
import { UserGridComponent } from './user-grid/user-grid.component';

@NgModule({
  declarations: [AppComponent, UserGridComponent],
  imports: [BrowserModule, BrowserAnimationsModule, CommonComponentsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
