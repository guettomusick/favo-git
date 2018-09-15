import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { MatTableDataSource } from '@angular/material';

import { User, GitHubService } from '../git-hub.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  githubSearching: Observable<Boolean>;
  dataSource = new MatTableDataSource<User>();
  results = 0;
  sub: any;

  constructor(private gitHub: GitHubService) {
  }

  ngOnInit() {
    this.githubSearching = this.gitHub.searchingSubject.asObservable();

    this.sub = this.gitHub.searchResultsSubject.subscribe((users) => {
      this.results = users.length;
      this.dataSource.data = users;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
