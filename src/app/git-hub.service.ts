import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { forkJoin, BehaviorSubject, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';

 interface UserSearch {
  total_count: number;
  incomplete_results: boolean;
  items: [{
    login: string;
  }];
}

export interface User {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  bio: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  repos_url: string;
}

export interface Repo {
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  created_at: string;
}

const accessToken = null;

@Injectable({
  providedIn: 'root'
})
export class GitHubService {
  readonly gihubUrl = 'https://api.github.com';
  readonly githubUsersUrl = 'https://api.github.com/users/';
  private last = {
    query: '',
    sort: '',
    order: ''
  };

  public searchResultsSubject = new BehaviorSubject<User[]>([]);
  public searchingSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.allUsers();
  }

  search(query: string, sort: string = '', order: string = '', page: number = 0) {
    if (!query) {
      return this.allUsers(page);
    }

    this.searchingSubject.next(true);

    let params = new HttpParams()
      .set('q', `${query} in:fullname in:login`)
      .set('per_page', '20')
      .set('page', page.toString());

    if (accessToken) {
      params = params.set('access_token', accessToken);
    }

    if (sort && sort.match(/followers|repositories|joined/)) {
      params = params.set('sort', sort);
    }

    if (order && order.match(/asc|desc/)) {
      params = params.set('order', order);
    }

    this.last.query = query;
    this.last.sort = sort;
    this.last.order = order;

    this.http.get<UserSearch>(this.gihubUrl + '/search/users', { params })
      .pipe(flatMap((result: UserSearch) => {
        if (result.total_count === 0) {
          return of([]);
        }
        return forkJoin(
          result.items.map((item) => this.getUser(item.login))
        );
      }))
      .subscribe((users: User[]) => {
        this.searchingSubject.next(false);
        this.searchResultsSubject.next(users);
      }, () => {
        this.searchingSubject.next(false);
        this.searchResultsSubject.next([]);
      });
  }

  allUsers(page: number = 0) {
    this.searchingSubject.next(true);

    let params = new HttpParams()
        .set('per_page', '20')
        .set('page', page.toString());

    if (accessToken) {
      params = params.set('access_token', accessToken);
    }

    this.http.get<User[]>(this.gihubUrl + '/users', {params})
      .pipe(flatMap((results: User[]) => {
        return forkJoin(
          results.map((item) => this.getUser(item.login))
        );
      }))
      .subscribe((users: User[]) => {
        this.searchingSubject.next(false);
        this.searchResultsSubject.next(users);
      });
  }

  setPage(page: number) {
    this.search(this.last.query, this.last.sort, this.last.order, page);
  }

  getUser(username: string) {
    let params;

    if (accessToken) {
      params = new HttpParams().set('access_token', accessToken);
    }

    return this.http.get<User>(this.githubUsersUrl + username, { params });
  }

  getRepos(user: User) {
    let params;

    if (accessToken) {
      params = new HttpParams().set('access_token', accessToken);
    }
    return this.http.get<Repo[]>(user.repos_url, { params });
  }
}
