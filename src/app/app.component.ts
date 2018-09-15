import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { GitHubService } from './git-hub.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FavoGit';
  githubSearching: Observable<Boolean>;
  query = '';

  constructor(private gitHub: GitHubService) {
    this.githubSearching = gitHub.searchingSubject.asObservable();
  }

  doSearch(event) {
    this.gitHub.search(event);
  }
}
