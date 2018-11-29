import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { appRouting } from './app.routing';
import { CommonComponentsModule } from './common-components/common-components.module';
import { DetailResolver } from './detail.resolver';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserGridComponent } from './user-grid/user-grid.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, UserGridComponent, UserDetailComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRouting),
    BrowserModule,
    BrowserAnimationsModule,
    CommonComponentsModule
  ],
  providers: [DetailResolver],
  bootstrap: [AppComponent]
})
export class AppModule {}
