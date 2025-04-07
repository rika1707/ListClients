import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'list-clients', pathMatch: 'full' },
  { path: 'details/:id', loadChildren: () => import('./components/details-clients/details-clients.routes').then(m => m.detailsClientsRoutes) },
  { path: 'list-clients', loadChildren: () => import('./components/list-clients/list-clients.routes').then(m => m.clientsRoutes) },
  { path: '**', component: PageNotFoundComponent }
];
