import { Routes } from '@angular/router';

import { DetailResolver } from './detail.resolver';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserGridComponent } from './user-grid/user-grid.component';

export const appRouting: Routes = [
  {
    path: 'users',
    component: UserGridComponent
  },
  {
    path: 'users/:id',
    component: UserDetailComponent,
    resolve: { model: DetailResolver }
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'users'
  }
];
