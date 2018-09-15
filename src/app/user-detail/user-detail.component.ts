import { Component, OnInit, OnDestroy } from '@angular/core';

import { FavoriteService } from './../favorite.service';
import { User, GitHubService } from '../git-hub.service';
import { ActivatedRoute } from '@angular/router';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, OnDestroy {
  user: Observable<User>;
  private sub: any;

  constructor(private favorite: FavoriteService, private github: GitHubService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.user = this.github.getUser(params['login']);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
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

  locationUrl(user: User) {
    return 'https://www.google.com/maps/search/?api=1&query=' + escape(user.location);
  }

  getRepos(user: User) {
    return this.github.getRepos(user);
  }

}
