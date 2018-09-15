import { Injectable } from '@angular/core';
import { User } from './git-hub.service';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favorites: User[] = [];
  public favoriteListSubject = new BehaviorSubject<User[]>([]);

  constructor() { }

  add(user: User) {
    if (this.favorites.filter((favorite) => user.login === favorite.login).length === 0) {
      this.favorites.push(user);
      this.favoriteListSubject.next(JSON.parse(JSON.stringify(this.favorites)));
    }
  }

  remove(user: User) {
    const index = this.favorites.findIndex((favorite) => user.login === favorite.login);

    if (index >= 0) {
      this.favorites.splice(index, 1);
      this.favoriteListSubject.next(JSON.parse(JSON.stringify(this.favorites)));
    }
  }

  isFavorite(user: User) {
    if (this.favorites.filter((favorite) => user.login === favorite.login).length === 0) {
      return false;
    }
    return true;
  }
}
