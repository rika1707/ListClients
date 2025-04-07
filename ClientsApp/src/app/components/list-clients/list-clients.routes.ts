import { ListClientsComponent } from './list-clients.component';
import { Routes } from '@angular/router';

export const clientsRoutes: Routes = [
  {
    path: '',
    component: ListClientsComponent,
  }
];
