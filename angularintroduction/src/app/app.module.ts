import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { appRouting } from './app.routing';
import { CommonComponentsModule } from './common-components/common-components.module';
import { DetailResolver } from './detail.resolver';
import { EmailEditorComponent } from './email-editor/email-editor.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserGridComponent } from './user-grid/user-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    UserGridComponent,
    UserDetailComponent,
    EmailEditorComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRouting),
    BrowserModule,
    BrowserAnimationsModule,
    CommonComponentsModule
  ],
  providers: [DetailResolver],
  bootstrap: [AppComponent]
})
export class AppModule {}
