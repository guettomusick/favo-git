import { Component, OnInit, Input } from '@angular/core';
import { Repo } from '../../git-hub.service';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'repos-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class ReposTableComponent implements OnInit {
  @Input() repos: Observable<Repo[]>;
  dataSource = new MatTableDataSource<Repo>([]);

  readonly selectedColumns = ['name', 'fullName' , 'createdOn'];

  constructor() { }

  ngOnInit() {
    this.repos.subscribe((repos: Repo[]) => {
      this.dataSource.data = repos;
    });
  }

  goto(data) {
    window.open(data.html_url, '_blank');
  }

}
