import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { MatTableDataSource } from '@angular/material';

import { User, GitHubService } from '../git-hub.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  githubSearching: Observable<Boolean>;
  dataSource = new MatTableDataSource<User>();
  results = 0;

  constructor(gitHub: GitHubService) {
    this.githubSearching = gitHub.searchingSubject.asObservable();

    gitHub.searchResultsSubject.subscribe((users) => {
      this.results = users.length;
      this.dataSource.data = users;
    });
  }

  ngOnInit() {
  }
}
