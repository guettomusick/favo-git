import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from '../git-hub.service';
import { FavoriteService } from '../favorite.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  githubFavorites: Observable<User[]>;
  selectedColumns = ['avatar', 'userName', 'name', 'followers', 'createdOn', 'favorite'];

  constructor(private favorite: FavoriteService, private router: Router) {
    this.githubFavorites = favorite.favoriteListSubject.asObservable();
  }

  ngOnInit() {
  }

  removeFavorite(user: User) {
    this.favorite.remove(user);
  }

  detail(user: User) {
    this.router.navigate(['detail', user.login]);
  }
}
