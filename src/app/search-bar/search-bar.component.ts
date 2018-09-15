import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  showSearchBar = false;
  title = '';
  query = '';
  actualRoute: string;
  sub: any;

  @Output() doSearch = new EventEmitter();

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title) { }

  ngOnInit() {
    this.sub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }))
      .pipe(filter((route) => route.outlet === 'primary'))
      .pipe(mergeMap((route) => route.data))
      .subscribe((event) => {
        this.actualRoute = this.router.url.slice(1);
        this.title = event['title'];
        this.titleService.setTitle(event['title']);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  doShowSearchBar() {
    this.query = '';
    this.showSearchBar = true;
  }

  doHideSearchBar() {
    this.showSearchBar = false;
  }

  onKeydown(event) {
    switch (event.key) {
      case 'Enter':
        this.doSearch.emit(this.query);
        this.router.navigate(['results']);
        this.doHideSearchBar();
        break;
      case 'Escape':
        this.doHideSearchBar();
        break;
    }
  }

}
