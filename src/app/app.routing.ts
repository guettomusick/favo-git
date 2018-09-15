import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { SearchResultsComponent } from './search-results/search-results.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
  { path: 'results', component: SearchResultsComponent, data: { title: 'Usuarios' }  },
  { path: 'favorites', component: FavoritesComponent, data: { title: 'Favoritos' }  },
  { path: 'detail/:login', component: UserDetailComponent, data: { title: 'Detalle' }  },
  { path: '',  redirectTo: '/results', pathMatch: 'full' }
];

export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);
