import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatIconModule, MatToolbarModule, MatInputModule,
          MatButtonModule, MatProgressSpinnerModule, MatSortModule, MatCardModule, MatBadgeModule } from '@angular/material';

import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { FocusDirective } from './focus.directive';

import { RoutingModule } from './app.routing';
import { ClickStopPropagationDirective } from './click-stop-propagation.directive';
import { SearchResultsTableComponent } from './search-results/table/table.component';
import { ReposTableComponent } from './user-detail/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    SearchResultsComponent,
    FavoritesComponent,
    UserDetailComponent,
    FocusDirective,
    ClickStopPropagationDirective,
    SearchResultsTableComponent,
    ReposTableComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SlimLoadingBarModule,
    MatTableModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatCardModule,
    MatBadgeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
