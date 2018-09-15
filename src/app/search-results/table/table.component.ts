import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';

import { User } from '../../git-hub.service';
import { FavoriteService } from '../../favorite.service';
import { Router } from '@angular/router';

@Component({
  selector: 'search-results-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class SearchResultsTableComponent implements OnInit {
  @Input() dataSource: MatTableDataSource<User>;
  @ViewChild(MatSort) sort: MatSort;

  readonly selectedColumns = ['avatar', 'userName', 'name', 'followers', 'createdOn', 'favorite'];

  constructor(private favorite: FavoriteService, private router: Router) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  isFavorite(user: User) {
    return this.favorite.isFavorite(user);
  }

  addFavorite(user: User) {
    this.favorite.add(user);
  }

  removeFavorite(user: User) {
    this.favorite.remove(user);
  }

  detail(user: User) {
    this.router.navigate(['detail', user.login]);
  }

}
